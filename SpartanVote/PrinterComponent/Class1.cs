using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Drawing;
using Windows.Data.Pdf;
using Windows.System;

namespace PrinterComponent
{
    public sealed class Printer
    {
        public static string GetAnswer()
        {
            return "The answer is 42.";
        }

        public int SampleProperty { get; set; }

        public static Boolean Print(string filename)
        {
            // Path to the file in the app package to launch
            string exeFile = @"C:\Program Files (x86)\Foxit Software\Foxit Reader\FoxitReader.exe";


            var file = Windows.Storage.StorageFile.GetFileFromPathAsync(exeFile).GetResults();

            if (file != null)
            {
                // Set the option to show the picker
                var options = new Windows.System.LauncherOptions();
                options.DisplayApplicationPicker = true;

                // Launch the retrieved file
                bool success = Windows.System.Launcher.LaunchFileAsync(file, options).GetResults();
                if (success)
                {
                    // File launched
                    return true;

                }
                
            }
            // File launch failed
            return false;


        }

     
    }
}
