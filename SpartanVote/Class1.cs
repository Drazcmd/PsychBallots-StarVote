using System;

public class Class1
{
	public Class1()
	{

        public static void Main()
	    {
	        PdfDocument printout = new PdfDocument("test.pdf");

            foreach (var pdfItem in printout.Pages[0].Annotations)
            {
                var annot = (PdfAnnotation) pdfItem;

                if (annot.Subject.Contains("Prince"))
                    printout.Pages[0].Annotations.Remove(annot);
            }

            printout.Save("test.pdf");

	    }
	}
}
