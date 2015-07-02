using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.IO;
using System.Net;
using System.Threading;
using System.Linq;
using System.ServiceProcess;
using System.Text;
using System.Web;

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

            Console.Write(data);
            Console.WriteLine();

            StreamWriter writer = new StreamWriter("temp.html");
            writer.Write(data);

            writer.Close();

            Console.WriteLine("Wrote the file.");

            var princeProcess = new System.Diagnostics.Process();
            var princeStartInfo = new System.Diagnostics.ProcessStartInfo
            {
                WindowStyle = System.Diagnostics.ProcessWindowStyle.Hidden,
                FileName = "C:\\Program Files (x86)\\Prince\\Engine\\bin\\prince.exe",
                Arguments = "-o ballot.pdf temp.html"
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

            Console.WriteLine("Sending to the printer.");

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
    }
}