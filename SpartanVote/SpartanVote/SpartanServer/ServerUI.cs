using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace StarServer
{
    public partial class ServerUI : Form
    {
        public ServerUI()
        {
            InitializeComponent();
        }

        private void ServerUI_Load(object sender, EventArgs e)
        {

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

        
    }
}
