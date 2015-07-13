using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using PdfSharp.Pdf;
using PdfSharp.Pdf.Annotations;
using PdfSharp.Pdf.IO;

namespace ConsoleApplication2
{
    class Program
    {
        static void Main(string[] args)
        {

            PdfDocument printout = PdfReader.Open("test.pdf");

            Console.WriteLine(printout.ToString());

            foreach (var pdfItem in printout.Pages[0].Annotations)
            {
                var annot = (PdfAnnotation)pdfItem;

                if (annot.Subject.Contains("Prince"))
                    printout.Pages[0].Annotations.Remove(annot);
            }

            printout.Save("testout.pdf");
        }
    }
}
