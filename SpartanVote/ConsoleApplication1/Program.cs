using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Net;
using System.Threading;
using System.Linq;
using System.Net.Http;
using System.ServiceProcess;
using System.Text;
using System.Web;
using System.Windows.Media.Imaging;
using System.Xml;
using HtmlAgilityPack;
using PdfSharp.Pdf;
using PdfSharp.Pdf.Annotations;
using PdfSharp.Pdf.IO;
using ZXing;
using ZXing.Common;
using ZXing.OneD;

namespace SpartanServer
{

    internal class Program
    {
        private static WebServer ws;

        #region Nested classes to support running as service
        public const string ServiceName = "STARPrintService";

        public class Service : ServiceBase
        {
            public Service()
            {
                ServiceName = Program.ServiceName;
            }

            protected override void OnStart(string[] args)
            {
                Program.Start(args);
            }

            protected override void OnStop()
            {
                Program.Stop();
            }
        }
        #endregion

        static void Main(string[] args)
        {
            if (!Environment.UserInteractive)
                // running as service
                using (var service = new Service())
                    ServiceBase.Run(service);
            else
            {
                // running as console app
                Start(args);

                Console.WriteLine("Press any key to stop...");
                Console.ReadKey(true);

                Stop();
            }
        }


        private static void Start(string[] args)
        {
            ws = new WebServer(SendResponse, "http://localhost:8080/print/");
            ws.Run();
            Console.WriteLine("Star webserver. Type 'quit' at any time to quit.");

            while (Console.ReadLine() != "quit") ;

        }

        private static void Stop()
        {
            ws.Stop();
            
        }

        public static string SendResponse(HttpListenerRequest request)
        {
            Console.Write(request.Headers);
            string data = GetRequestPostData(request);

            Console.WriteLine(data);

            NameValueCollection qscoll = HttpUtility.ParseQueryString(data);

            string trackerNum = qscoll["tNum"];
            string ballotId = qscoll["ballotID"];
            string htmlData = qscoll["data"];


            Console.Write(htmlData);
            Console.WriteLine();
            Console.WriteLine("Ballot ID: " + ballotId);

            StreamWriter writer = new StreamWriter("ballot.html");
            writer.Write(htmlData);

            writer.Close();

            Console.WriteLine("Wrote the file.");

            // BARCODE CREATION
            GenerateBarcode(ballotId);

            Console.WriteLine("Wrote the barcode file.");

            var princeProcess = new System.Diagnostics.Process();
            var princeStartInfo = new System.Diagnostics.ProcessStartInfo
            {
                WindowStyle = System.Diagnostics.ProcessWindowStyle.Hidden,
                FileName = "C:\\Program Files (x86)\\Prince\\Engine\\bin\\prince.exe",
                Arguments = "-o ballot.pdf ballot.html"
            };
            princeProcess.StartInfo = princeStartInfo;
            princeProcess.Start();

            princeProcess.WaitForExit();

            Console.WriteLine("Converting to PDF.");

            var foxitProcess = new System.Diagnostics.Process();
            var foxitStartInfo = new System.Diagnostics.ProcessStartInfo
            {
                WindowStyle = System.Diagnostics.ProcessWindowStyle.Hidden,
                FileName = "C:\\Program Files (x86)\\Foxit Software\\Foxit Reader\\FoxitReader.exe",
                Arguments = "/p ballot.pdf"
            };
            foxitProcess.StartInfo = foxitStartInfo;
            foxitProcess.Start();

            foxitProcess.WaitForExit();

            Console.WriteLine("Removing the water mark!");
            PdfDocument printout = PdfReader.Open("ballot.pdf");

            foreach (var pdfItem in printout.Pages[0].Annotations)
            {
                var annot = (PdfAnnotation)pdfItem;

                if (annot.Subject.Contains("Prince"))
                    printout.Pages[0].Annotations.Remove(annot);
            }

            printout.Save("ballot.pdf");

            Console.WriteLine("Sending to the printer.");

            Console.WriteLine("Printing Tracker!");

            PrintBallotTracker(trackerNum);

            return "HTTP/1.1 200 OK\r\nDate:" + DateTime.Now + " \r\nContent-Length: 0\r\n\r\n";
        }

        public static void PrintBallotTracker(string trackerNum)
        {
            // Change the tracker to reflect this ballot
            string changeMe = File.ReadAllText("rsrc/BallotTracker.html");
            changeMe = changeMe.Replace("BALLOT TRACKER NUMBER", trackerNum);
            changeMe = changeMe.Replace("TIME", System.DateTime.Now.ToLongTimeString());


            File.WriteAllText(trackerNum + "tracker.html", changeMe);


            var princeProcess = new System.Diagnostics.Process();
            var princeStartInfo = new System.Diagnostics.ProcessStartInfo
            {
                WindowStyle = System.Diagnostics.ProcessWindowStyle.Hidden,
                FileName = "C:\\Program Files (x86)\\Prince\\Engine\\bin\\prince.exe",
                Arguments = "-o " + trackerNum + "tracker.pdf " + trackerNum + "tracker.html"
            };
            princeProcess.StartInfo = princeStartInfo;
            princeProcess.Start();

            princeProcess.WaitForExit();

            Console.WriteLine("Converting to PDF.");

            var foxitProcess = new System.Diagnostics.Process();
            var foxitStartInfo = new System.Diagnostics.ProcessStartInfo
            {
                WindowStyle = System.Diagnostics.ProcessWindowStyle.Hidden,
                FileName = "C:\\Program Files (x86)\\Foxit Software\\Foxit Reader\\FoxitReader.exe",
                Arguments = "/p " + trackerNum + "tracker.pdf"
            };
            foxitProcess.StartInfo = foxitStartInfo;
            foxitProcess.Start();

            foxitProcess.WaitForExit();

            Console.WriteLine("Removing the water mark!");
            PdfDocument printout = PdfReader.Open(trackerNum + "tracker.pdf");

            foreach (var pdfItem in printout.Pages[0].Annotations)
            {
                var annot = (PdfAnnotation)pdfItem;

                if (annot.Subject.Contains("Prince"))
                    printout.Pages[0].Annotations.Remove(annot);
            }

            printout.Save(trackerNum + "tracker.pdf");

        }

        public static string GetRequestPostData(HttpListenerRequest request)
        {
            if (!request.HasEntityBody)
            {
                Console.WriteLine("Empty request!");
                return null;
            }
            using (System.IO.Stream body = request.InputStream) // here we have data
            {
                using (System.IO.StreamReader reader = new System.IO.StreamReader(body, request.ContentEncoding))
                {
                    return reader.ReadToEnd();
                }
            }
        }

        /// <summary>
        ///     Creates a barcode file barcode.png with the trackernumber 
        /// </summary>
        /// <param name="ballotId">
        ///     The barcode's value
        /// </param>
        private static void GenerateBarcode(string ballotId)
        {

            Console.WriteLine("Writing the barcode for " + ballotId);
            
            IBarcodeWriter writer = new BarcodeWriter
            {
                Format = BarcodeFormat.CODE_39,
                Options= new ZXing.Common.EncodingOptions
                {
                Height=25,
                Width = 275,
                Margin = 2
                }
            };

            BitMatrix matrix = writer.Encode(ballotId);

            int height = matrix.Height;
            int width = matrix.Width;
            Bitmap bmp = new Bitmap(width, height);

            for (int x = 0; x < width; x++){
                for (int y = 0; y < height; y++){
                    bmp.SetPixel(x, y, matrix[x,y] ? Color.Black : Color.White);
                }
            }

            bmp.Save("barcode.jpg", System.Drawing.Imaging.ImageFormat.Jpeg);
        }

    }
}