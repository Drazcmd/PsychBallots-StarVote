using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web;
using System.Windows.Forms;
using BarcodeLib;
using PdfSharp.Pdf;
using PdfSharp.Pdf.Annotations;
using PdfSharp.Pdf.IO;
using ZXing;
using ZXing.Common;

namespace STARAuditServer
{
    static class Program
    {
        // Maps ballot trackers to the html strings of the ballots that are sent when the ballot is "cast" 
        public static Dictionary<string, Ballot> Ballots;

        private static ServerUI view;

        /// <summary>
        /// The main entry point for the application.
        /// </summary>
       
        [STAThread]
        static void Main()
        {

            Ballots = new Dictionary<string, Ballot>();

            // TODO Make this configurable
            WebServer ws = new WebServer(SendResponse, "http://localhost:8080/test/");
            ws.Run();

            Console.WriteLine("Printing");

            

            Application.EnableVisualStyles();
            Application.SetCompatibleTextRenderingDefault(false);

            view = new ServerUI();
            Application.Run(view);

            view.Dispose();
        }

        public static string SendResponse(HttpListenerRequest request)
        {
            Console.Write(request.Headers);
            string data = GetRequestPostData(request);

            NameValueCollection qscoll = HttpUtility.ParseQueryString(data);

            string trackerNum = qscoll["tNum"];
            string ballotID = qscoll["ballotID"];
            string htmlData = qscoll["data"];

            Console.WriteLine("Tracker number: " + qscoll["tNum"]);
           

            Console.WriteLine("Finished parsing input");
            // TODO Figure out how to handle challenged versus cast

            view.AddCastBallot(trackerNum);

            Ballots.Add(trackerNum, new Ballot(trackerNum, ballotID, htmlData));

            return "HTTP/1.1 200 OK\r\nDate:" + DateTime.Now + " \r\nContent-Length: 0\r\n\r\n";
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

        public static void PrintBallotPDF(string trackerNum)
        {
            StreamWriter writer = new StreamWriter(trackerNum + ".html");

            string htmlData = Ballots[trackerNum].htmlData;
            string ballotID = Ballots[trackerNum].ballotID;
            writer.Write(htmlData);

            writer.Close();

            Console.WriteLine("Wrote the file" + trackerNum + ".html");

            GenerateBarcode(ballotID);

            var princeProcess = new System.Diagnostics.Process();
            var princeStartInfo = new System.Diagnostics.ProcessStartInfo
            {
                WindowStyle = System.Diagnostics.ProcessWindowStyle.Hidden,
                FileName = "C:\\Program Files (x86)\\Prince\\Engine\\bin\\prince.exe",
                Arguments = "-o " + trackerNum + ".pdf " + trackerNum + ".html"
            };
            princeProcess.StartInfo = princeStartInfo;
            princeProcess.Start();

            princeProcess.WaitForExit();


            Console.WriteLine("Removing the water mark!");
            PdfDocument printout = PdfReader.Open(trackerNum + ".pdf");

            foreach (var pdfItem in printout.Pages[0].Annotations)
            {
                var annot = (PdfAnnotation) pdfItem;

                if (annot.Subject.Contains("Prince"))
                    printout.Pages[0].Annotations.Remove(annot);
            }

            printout.Save(trackerNum + ".pdf");



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

    internal class Ballot
    {
        public readonly string ballotID;

        public string trackerNum;

        public readonly string htmlData;

        public Ballot(string trackerNum, string ballotID, string htmlData)
        {
            this.trackerNum = trackerNum;
            this.ballotID = ballotID;
            this.htmlData = htmlData;
        }

    }
}
