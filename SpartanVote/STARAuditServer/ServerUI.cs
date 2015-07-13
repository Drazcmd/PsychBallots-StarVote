using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.UI.WebControls;
using System.Windows.Forms;
using BorderStyle = System.Windows.Forms.BorderStyle;
using Button = System.Windows.Forms.Button;
using Label = System.Windows.Forms.Label;
using TextBox = System.Windows.Forms.TextBox;

namespace STARAuditServer
{
    public partial class ServerUI : Form
    {


        
        private static Color back = Color.FromArgb(255, 32, 32, 32);
        private static Color fore = Color.FromArgb(255, 224, 224, 224);

        public ServerUI()
        {
            InitializeComponent();
        
        

        }

        private void ServerUI_Load(object sender, EventArgs e)
        {
            timer1.Start();

            Random rand = new Random();

            for (int i = 0; i < 2; i++)
            {
                string input = "BCDFGHJKMNPQRTVWXY2346789";

                StringBuilder builder = new StringBuilder();
                char ch;
                for (int j = 0; j < 20; j++)
                {
                    ch = input[rand.Next(0, input.Length)];
                    builder.Append(ch);
                }

                Console.WriteLine(builder.ToString());
                AddCastBallot(builder.ToString());
            }

        }

        
        private void listView1_SelectedIndexChanged(object sender, EventArgs e)
        {

        }

        private void ElectionInfoLabel_Click(object sender, EventArgs e)
        {

        }

        private void ElectionInfoLabel_Click_1(object sender, EventArgs e)
        {

        }

        private void TimeLabel_Click(object sender, EventArgs e)
        {

        }

        private void timer1_Tick(object sender, EventArgs e)
        {
            TimeLabel.Text = "Current Time: " + DateTime.Now.ToLongTimeString() + DateTime.Now.ToLongDateString();
        }

        private void ChallengedBallotView_DocumentCompleted(object sender, WebBrowserDocumentCompletedEventArgs e)
        {

        }

        private void ElectionInfoLabel_Click_2(object sender, EventArgs e)
        {

        }

        private void ServerInfoPanel_Paint(object sender, PaintEventArgs e)
        {

        }

        private void CastBallotPanelLabel_Click(object sender, EventArgs e)
        {

        }

        private void ChallengedBallotsPanelLabel_Click(object sender, EventArgs e)
        {

        }

        private void CastBallotList_AfterSelect(object sender, TreeViewEventArgs e)
        {

        }

        /// <summary>
        ///     A method that adds a ballot's data to the panel
        /// </summary>
        /// <param name="trackerNum">
        ///     The tracking number of the ballot
        /// </param>
        /// 
        /// TODO Add ballot hashes?
        public void AddCastBallot(string trackerNum)
        {

            Console.WriteLine("Adding a label!");

            if (CastBallotLabelTable.InvokeRequired)
            {
                CastBallotLabelTable.Invoke(new MethodInvoker(delegate { TableAddDelegate(trackerNum); }));
            }
            else
            {
                TableAddDelegate(trackerNum);
            }

            Application.DoEvents();
        }

        private void TableAddDelegate(string trackerNum)
        {

            CastBallotLabelTable.GrowStyle = TableLayoutPanelGrowStyle.AddRows;

            Label row = new Label();
            row.Dock = DockStyle.Top;

            TableLayoutPanel panel = new TableLayoutPanel();
            panel.RowCount = 1;
            panel.ColumnCount = 2;
            panel.GrowStyle = TableLayoutPanelGrowStyle.FixedSize;
            panel.Dock = DockStyle.Fill;


            Label tracker = new Label();

            //tracker.Text = "<" + trackerNum.Substring(0, 20) + "...>";
            tracker.Text = trackerNum;

            Console.WriteLine(tracker.Text);

            //tracker.Dock = DockStyle.Fill;
            tracker.Font = new System.Drawing.Font("Univers LT Std 45 Light", 10F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));

            tracker.ForeColor = Color.White;
            tracker.AutoSize = true;

            tracker.Anchor = AnchorStyles.Left;

            Label time = new Label();

            time.Text = "<" + DateTime.Now.ToShortTimeString() + " " + DateTime.Now.ToShortDateString() + ">";

            //time.Dock = DockStyle.Fill;
            time.Font = new System.Drawing.Font("Univers LT Std 45 Light", 10F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));

            time.ForeColor = Color.White;
            time.AutoSize = true;

            time.Anchor = AnchorStyles.Right;

            panel.Controls.Add(tracker, 0, 0);
            panel.Controls.Add(time, 1, 0);

            panel.Click += CastClick;
            time.Click += CastClick;
            tracker.Click += CastClick;

            row.Controls.Add(panel);

            Console.WriteLine("The starting height is {0}", panel.Height);


            //row.Click += CastClick;
            CastBallotLabelTable.Controls.Add(row);

            CastBallotLabelTable.RowStyles[0].Height = 23;

        }

        private void CastClick(object sender, EventArgs e)
        {
           

            var panel = sender as TableLayoutPanel;

            // This means it's not a layoutPanel
            if (panel == null)
            {
                var label = sender as Label;

                if (label == null)
                {
                    Console.WriteLine("CastClick: parent not a label or a panel");
                    return;
                }

                panel = label.Parent as TableLayoutPanel;

            }

            // Iterate over everyone else and make them not blue
            foreach (Label other in panel.Parent.Parent.Controls)
            {
                if (other.Controls[0] != panel)
                {
                    if (other.Controls[0].BackColor == Color.DodgerBlue)
                        other.Controls[0].Parent.Height = 23;

                    other.Controls[0].BackColor = Color.Transparent;
                }
            }

            Console.WriteLine("Cast: Is the panel blue? {0}", panel.BackColor == Color.DodgerBlue);
            // Allows for deselection
            panel.BackColor = panel.BackColor == Color.DodgerBlue ? Color.Transparent : Color.DodgerBlue;

            panel.Parent.Height = panel.Parent.Height == 30 ? 23 : 30;
        }

        private void ChallengeClick(object sender, EventArgs e)
        {


            var panel = sender as TableLayoutPanel;

            // This means it's not a layoutPanel
            if (panel == null)
            {
                var label = sender as Label;

                if (label == null)
                {
                    Console.WriteLine("ChallengeClick: parent not a label or a panel");
                    return;
                }

                panel = label.Parent as TableLayoutPanel;

            }

            // Iterate over everyone else and make them not blue
            foreach (Label other in panel.Parent.Parent.Controls)
            {
                if (other.Controls[0] != panel)
                {
                    if (other.Controls[0].BackColor == Color.DodgerBlue)
                        other.Controls[0].Parent.Height = 23;

                    other.Controls[0].BackColor = Color.Transparent;
                }
            }

            Console.WriteLine("Challenge: Is the panel blue? {0}", panel.BackColor == Color.DodgerBlue);

            // Allows for deselection
            panel.BackColor = panel.BackColor == Color.DodgerBlue ? Color.Transparent : Color.DodgerBlue;

            panel.Parent.Height = panel.Parent.Height == 30 ? 23 : 30;

            Console.WriteLine("Opening " + panel.Controls[0].Text + ".pdf in " + Directory.GetCurrentDirectory());

            // TODO Fix this hard coding
            ChallengedBallotViewer.Navigate("C:\\Users\\t-mattbe\\Source\\Repos\\Star\\SpartanVote\\STARAuditServer\\bin\\Debug\\" + panel.Controls[0].Text + ".pdf");

            Console.WriteLine("Current uri is {0}, type {1}", ChallengedBallotViewer.Url, ChallengedBallotViewer.DocumentType);

        }

        private void ChallengeButton_Click(object sender, EventArgs e)
        {
            var input = "Enter the Ballot Tracker Number...";
            DialogResult re = ShowInputDialog(ref input);

            Button cb = sender as Button;
            Label findMe = null;

            // Find the ballot in question
            foreach (Label l in CastBallotLabelTable.Controls)
            {
                Label label = l.Controls[0].Controls[0] as Label;
                if (label != null && label.Text == input)
                    findMe = l;
            }


            if (findMe != null)
            {
                // We found it, so remove it
                CastBallotLabelTable.Controls.Remove(findMe);

                // Move the ballot from "cast" to "challenge"
                ChallengedBallotLabelTable.Controls.Add(findMe);

                findMe.Click -= CastClick;
                findMe.Controls[0].Controls[0].Click -= CastClick;
                findMe.Controls[0].Controls[1].Click -= CastClick;

                findMe.Controls[0].Controls[0].Click += ChallengeClick;
                findMe.Controls[0].Controls[1].Click += ChallengeClick;
                findMe.Click += ChallengeClick;


                // generate a pdf based on its html
                Program.PrintBallotPDF(findMe.Controls[0].Controls[0].Text);

                // display the pdf? 
            }
            else
            {
                // If it is not found, throw up a dialog informing the user
                // and return
                MessageBox.Show("Ballot " + input + " not found!", "!");
            }
          

            Console.WriteLine(input);
        }

        private static DialogResult ShowInputDialog(ref string input)
        {
            System.Drawing.Size size = new System.Drawing.Size(400, 70);
            Form inputBox = new Form();

            inputBox.FormBorderStyle = System.Windows.Forms.FormBorderStyle.FixedDialog;
            inputBox.ClientSize = size;
            inputBox.Text = "Challenge a Ballot";
            inputBox.BackColor = back;

            System.Windows.Forms.TextBox textBox = new TextBox();
            textBox.Size = new System.Drawing.Size(size.Width - 10, 23);
            textBox.Location = new System.Drawing.Point(5, 5);
            textBox.Text = input;
            inputBox.Controls.Add(textBox);

            Button okButton = new Button();
            okButton.DialogResult = System.Windows.Forms.DialogResult.OK;
            okButton.Name = "okButton";
            okButton.Size = new System.Drawing.Size(75, 23);
            okButton.Text = "&OK";
            okButton.ForeColor = fore;
            okButton.FlatStyle = FlatStyle.Flat;
            okButton.Location = new System.Drawing.Point(size.Width - 80 - 80, 39);
            inputBox.Controls.Add(okButton);

            Button cancelButton = new Button();
            cancelButton.DialogResult = System.Windows.Forms.DialogResult.Cancel;
            cancelButton.Name = "cancelButton";
            cancelButton.Size = new System.Drawing.Size(75, 23);
            cancelButton.Text = "&Cancel";
            cancelButton.ForeColor = fore;
            cancelButton.FlatStyle = FlatStyle.Flat;
            cancelButton.Location = new System.Drawing.Point(size.Width - 80, 39);
            inputBox.Controls.Add(cancelButton);

            inputBox.AcceptButton = okButton;
            inputBox.CancelButton = cancelButton;

            inputBox.StartPosition = FormStartPosition.CenterParent;

            inputBox.AcceptButton = okButton;
            inputBox.CancelButton = cancelButton;

            DialogResult result = inputBox.ShowDialog();
            input = textBox.Text;
            return result;
        }

    
    }


}
