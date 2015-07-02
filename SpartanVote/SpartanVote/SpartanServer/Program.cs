using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.IO;
using System.Net;
using System.Threading;
using System.Linq;
using System.Text;
using System.Web;

namespace SpartanServer
{

    internal class Program
    {

        private static Dictionary<string, Dictionary<string, int>> _results;
 
        private static void Main(string[] args)
        {
            // TODO init the dictionary with a dictionary for every race
            _results = new Dictionary<string, Dictionary<string, int>>();
            WebServer ws = new WebServer(SendResponse, "http://localhost:8080/test/");
            ws.Run();
            Console.WriteLine("Star webserver. Press a key to quit.");
            Console.ReadKey();

            Teardown();

            Console.ReadKey();
            ws.Stop();
        }

        public static string SendResponse(HttpListenerRequest request)
        {
            Console.Write(request.Headers);
            string data = GetRequestPostData(request);

            NameValueCollection qscoll = HttpUtility.ParseQueryString(data);

            Console.WriteLine("Tracker number: " + qscoll["tNum"]);
            Console.WriteLine("Vote data: " + qscoll["votes"]);

            // Process vote data
  
            // Split the vote into its races
            var votes = qscoll["votes"].Split('\n');

            // Note the first element of "votes" will be the race identifier, a number
            foreach(var vote in votes)
            {
                var name = vote.Split(';')[1];
                if (_results.ContainsKey(vote.Substring(0, 1)))
                {
                    if (_results[vote.Substring(0, 1)].ContainsKey(name))
                    {
                        _results[vote.Substring(0, 1)][name]++;
                    }
                    else
                    {
                        _results[vote.Substring(0, 1)].Add(name, 1);
                    }

                }
                else
                {
                    _results.Add(vote.Substring(0, 1), new Dictionary<string, int>());
                    _results[vote.Substring(0, 1)].Add(name, 1);
                }
            }

            return "HTTP/1.1 200 OK\r\nDate:" + DateTime.Now + " \r\nContent-Length: 0\r\n\r\n";
        }

        private static void Teardown()
        {
            StreamWriter writer = new StreamWriter("election_results.csv");
            writer.WriteLine("Area,Name,Votes");
            
            Console.WriteLine("ELECTION RESULTS: ");
            foreach (var entry in _results)
            {
                Console.WriteLine("[RACE: {0}]", entry.Key);
                foreach (var inner in _results[entry.Key])
                {
                    Console.WriteLine("\t[{0} {1}]", inner.Key, inner.Value);
                    writer.WriteLine("{0},{1},{2}", entry.Key, inner.Key, inner.Value);
                }
            }

            writer.Close();
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