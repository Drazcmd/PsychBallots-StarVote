namespace StarServer
{
    partial class ServerUI
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.components = new System.ComponentModel.Container();
            this.CastBallotPanel = new System.Windows.Forms.TableLayoutPanel();
            this.CastBallotPanelLabel = new System.Windows.Forms.Label();
            this.CastBallotList = new System.Windows.Forms.TreeView();
            this.ChallengedBallotPanel = new System.Windows.Forms.TableLayoutPanel();
            this.ChallengedBallotsPanelLabel = new System.Windows.Forms.Label();
            this.ChallengedBallotList = new System.Windows.Forms.ListView();
            this.ChallengedBallotView = new System.Windows.Forms.WebBrowser();
            this.ServerInfoPanel = new System.Windows.Forms.TableLayoutPanel();
            this.tableLayoutPanel1 = new System.Windows.Forms.TableLayoutPanel();
            this.ElectionInfoLabel = new System.Windows.Forms.Label();
            this.TimeLabel = new System.Windows.Forms.Label();
            this.timer1 = new System.Windows.Forms.Timer(this.components);
            this.CastBallotPanel.SuspendLayout();
            this.ChallengedBallotPanel.SuspendLayout();
            this.ServerInfoPanel.SuspendLayout();
            this.tableLayoutPanel1.SuspendLayout();
            this.SuspendLayout();
            // 
            // CastBallotPanel
            // 
            this.CastBallotPanel.ColumnCount = 1;
            this.CastBallotPanel.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 100F));
            this.CastBallotPanel.Controls.Add(this.CastBallotPanelLabel, 0, 0);
            this.CastBallotPanel.Controls.Add(this.CastBallotList, 0, 1);
            this.CastBallotPanel.Dock = System.Windows.Forms.DockStyle.Fill;
            this.CastBallotPanel.Location = new System.Drawing.Point(3, 78);
            this.CastBallotPanel.Name = "CastBallotPanel";
            this.CastBallotPanel.RowCount = 2;
            this.CastBallotPanel.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Absolute, 40F));
            this.CastBallotPanel.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Percent, 100F));
            this.CastBallotPanel.Size = new System.Drawing.Size(412, 673);
            this.CastBallotPanel.TabIndex = 1;
            // 
            // CastBallotPanelLabel
            // 
            this.CastBallotPanelLabel.AutoSize = true;
            this.CastBallotPanelLabel.Dock = System.Windows.Forms.DockStyle.Fill;
            this.CastBallotPanelLabel.Font = new System.Drawing.Font("Univers LT Std 45 Light", 15.75F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.CastBallotPanelLabel.Location = new System.Drawing.Point(3, 0);
            this.CastBallotPanelLabel.Name = "CastBallotPanelLabel";
            this.CastBallotPanelLabel.Size = new System.Drawing.Size(406, 40);
            this.CastBallotPanelLabel.TabIndex = 0;
            this.CastBallotPanelLabel.Text = "Cast Ballots";
            this.CastBallotPanelLabel.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            // 
            // CastBallotList
            // 
            this.CastBallotList.Dock = System.Windows.Forms.DockStyle.Fill;
            this.CastBallotList.Location = new System.Drawing.Point(3, 43);
            this.CastBallotList.Name = "CastBallotList";
            this.CastBallotList.Size = new System.Drawing.Size(406, 627);
            this.CastBallotList.TabIndex = 1;
            // 
            // ChallengedBallotPanel
            // 
            this.ChallengedBallotPanel.ColumnCount = 2;
            this.ChallengedBallotPanel.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 33.33333F));
            this.ChallengedBallotPanel.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 66.66667F));
            this.ChallengedBallotPanel.Controls.Add(this.ChallengedBallotsPanelLabel, 0, 0);
            this.ChallengedBallotPanel.Controls.Add(this.ChallengedBallotList, 0, 1);
            this.ChallengedBallotPanel.Controls.Add(this.ChallengedBallotView, 1, 1);
            this.ChallengedBallotPanel.Dock = System.Windows.Forms.DockStyle.Fill;
            this.ChallengedBallotPanel.Location = new System.Drawing.Point(421, 78);
            this.ChallengedBallotPanel.Name = "ChallengedBallotPanel";
            this.ChallengedBallotPanel.RowCount = 2;
            this.ChallengedBallotPanel.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Absolute, 40F));
            this.ChallengedBallotPanel.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Percent, 100F));
            this.ChallengedBallotPanel.Size = new System.Drawing.Size(833, 673);
            this.ChallengedBallotPanel.TabIndex = 0;
            // 
            // ChallengedBallotsPanelLabel
            // 
            this.ChallengedBallotsPanelLabel.AutoSize = true;
            this.ChallengedBallotPanel.SetColumnSpan(this.ChallengedBallotsPanelLabel, 2);
            this.ChallengedBallotsPanelLabel.Dock = System.Windows.Forms.DockStyle.Fill;
            this.ChallengedBallotsPanelLabel.Font = new System.Drawing.Font("Univers LT Std 45 Light", 15.75F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.ChallengedBallotsPanelLabel.Location = new System.Drawing.Point(3, 0);
            this.ChallengedBallotsPanelLabel.Name = "ChallengedBallotsPanelLabel";
            this.ChallengedBallotsPanelLabel.Size = new System.Drawing.Size(827, 40);
            this.ChallengedBallotsPanelLabel.TabIndex = 0;
            this.ChallengedBallotsPanelLabel.Text = "Challenged Ballots";
            this.ChallengedBallotsPanelLabel.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            // 
            // ChallengedBallotList
            // 
            this.ChallengedBallotList.Dock = System.Windows.Forms.DockStyle.Fill;
            this.ChallengedBallotList.Location = new System.Drawing.Point(3, 43);
            this.ChallengedBallotList.Name = "ChallengedBallotList";
            this.ChallengedBallotList.Size = new System.Drawing.Size(271, 627);
            this.ChallengedBallotList.TabIndex = 1;
            this.ChallengedBallotList.UseCompatibleStateImageBehavior = false;
            // 
            // ChallengedBallotView
            // 
            this.ChallengedBallotView.Dock = System.Windows.Forms.DockStyle.Fill;
            this.ChallengedBallotView.Location = new System.Drawing.Point(280, 43);
            this.ChallengedBallotView.MinimumSize = new System.Drawing.Size(20, 20);
            this.ChallengedBallotView.Name = "ChallengedBallotView";
            this.ChallengedBallotView.Size = new System.Drawing.Size(550, 627);
            this.ChallengedBallotView.TabIndex = 2;
            // 
            // ServerInfoPanel
            // 
            this.ServerInfoPanel.ColumnCount = 2;
            this.ServerInfoPanel.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 33.33333F));
            this.ServerInfoPanel.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 66.66667F));
            this.ServerInfoPanel.Controls.Add(this.ChallengedBallotPanel, 1, 1);
            this.ServerInfoPanel.Controls.Add(this.CastBallotPanel, 0, 1);
            this.ServerInfoPanel.Controls.Add(this.tableLayoutPanel1, 0, 0);
            this.ServerInfoPanel.Dock = System.Windows.Forms.DockStyle.Fill;
            this.ServerInfoPanel.Location = new System.Drawing.Point(0, 0);
            this.ServerInfoPanel.Name = "ServerInfoPanel";
            this.ServerInfoPanel.RowCount = 2;
            this.ServerInfoPanel.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Absolute, 75F));
            this.ServerInfoPanel.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Percent, 100F));
            this.ServerInfoPanel.Size = new System.Drawing.Size(1257, 754);
            this.ServerInfoPanel.TabIndex = 0;
            // 
            // tableLayoutPanel1
            // 
            this.tableLayoutPanel1.ColumnCount = 1;
            this.tableLayoutPanel1.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 100F));
            this.tableLayoutPanel1.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Absolute, 20F));
            this.tableLayoutPanel1.Controls.Add(this.ElectionInfoLabel, 0, 0);
            this.tableLayoutPanel1.Controls.Add(this.TimeLabel, 0, 1);
            this.tableLayoutPanel1.Dock = System.Windows.Forms.DockStyle.Fill;
            this.tableLayoutPanel1.Location = new System.Drawing.Point(3, 3);
            this.tableLayoutPanel1.Name = "tableLayoutPanel1";
            this.tableLayoutPanel1.RowCount = 2;
            this.tableLayoutPanel1.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Percent, 50F));
            this.tableLayoutPanel1.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Percent, 50F));
            this.tableLayoutPanel1.Size = new System.Drawing.Size(412, 69);
            this.tableLayoutPanel1.TabIndex = 2;
            // 
            // ElectionInfoLabel
            // 
            this.ElectionInfoLabel.AutoSize = true;
            this.ElectionInfoLabel.Dock = System.Windows.Forms.DockStyle.Fill;
            this.ElectionInfoLabel.Font = new System.Drawing.Font("Univers LT Std 55", 14.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.ElectionInfoLabel.Location = new System.Drawing.Point(3, 0);
            this.ElectionInfoLabel.Name = "ElectionInfoLabel";
            this.ElectionInfoLabel.Size = new System.Drawing.Size(406, 34);
            this.ElectionInfoLabel.TabIndex = 0;
            this.ElectionInfoLabel.Text = "Election Information";
            // 
            // TimeLabel
            // 
            this.TimeLabel.AutoSize = true;
            this.TimeLabel.Dock = System.Windows.Forms.DockStyle.Fill;
            this.TimeLabel.Font = new System.Drawing.Font("Univers LT Std 45 Light", 15.75F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.TimeLabel.Location = new System.Drawing.Point(3, 34);
            this.TimeLabel.Name = "TimeLabel";
            this.TimeLabel.Size = new System.Drawing.Size(406, 35);
            this.TimeLabel.TabIndex = 1;
            this.TimeLabel.Text = "Current Time:";
            this.TimeLabel.Click += new System.EventHandler(this.TimeLabel_Click);
            // 
            // timer1
            // 
            this.timer1.Tick += new System.EventHandler(this.timer1_Tick);
            // 
            // ServerUI
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(1257, 754);
            this.Controls.Add(this.ServerInfoPanel);
            this.Name = "ServerUI";
            this.Text = "STAR-Vote Audit Server";
            this.Load += new System.EventHandler(this.ServerUI_Load);
            this.CastBallotPanel.ResumeLayout(false);
            this.CastBallotPanel.PerformLayout();
            this.ChallengedBallotPanel.ResumeLayout(false);
            this.ChallengedBallotPanel.PerformLayout();
            this.ServerInfoPanel.ResumeLayout(false);
            this.tableLayoutPanel1.ResumeLayout(false);
            this.tableLayoutPanel1.PerformLayout();
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.TableLayoutPanel ServerInfoPanel;
        private System.Windows.Forms.TableLayoutPanel ChallengedBallotPanel;
        private System.Windows.Forms.Label ChallengedBallotsPanelLabel;
        private System.Windows.Forms.TableLayoutPanel CastBallotPanel;
        private System.Windows.Forms.Label CastBallotPanelLabel;
        private System.Windows.Forms.TableLayoutPanel tableLayoutPanel1;
        private System.Windows.Forms.Label ElectionInfoLabel;
        private System.Windows.Forms.TreeView CastBallotList;
        private System.Windows.Forms.ListView ChallengedBallotList;
        private System.Windows.Forms.WebBrowser ChallengedBallotView;
        private System.Windows.Forms.Label TimeLabel;
        private System.Windows.Forms.Timer timer1;


    }
}