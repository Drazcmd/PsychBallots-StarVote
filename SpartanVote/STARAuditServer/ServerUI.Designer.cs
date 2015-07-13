namespace STARAuditServer
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
            this.CastBallotPanelLabel = new System.Windows.Forms.Label();
            this.ServerInfoPanel = new System.Windows.Forms.TableLayoutPanel();
            this.CastBallotPanel = new System.Windows.Forms.Panel();
            this.CastBallotTablePanel = new System.Windows.Forms.TableLayoutPanel();
            this.CastBallotLabelTable = new System.Windows.Forms.TableLayoutPanel();
            this.ChallengedBallotPanel = new System.Windows.Forms.Panel();
            this.ChallengedBallotTablePanel = new System.Windows.Forms.TableLayoutPanel();
            this.ChallengedBallotsPanelLabel = new System.Windows.Forms.Label();
            this.ChallengedBallotLabelTable = new System.Windows.Forms.TableLayoutPanel();
            this.ChallengedBallotViewer = new System.Windows.Forms.WebBrowser();
            this.ElectionInfoPanel = new System.Windows.Forms.Panel();
            this.ElectionInfoTablePanel = new System.Windows.Forms.TableLayoutPanel();
            this.ElectionInfoLabel = new System.Windows.Forms.Label();
            this.TimeLabel = new System.Windows.Forms.Label();
            this.ChallengeButton = new System.Windows.Forms.Button();
            this.timer1 = new System.Windows.Forms.Timer(this.components);
            this.ServerInfoPanel.SuspendLayout();
            this.CastBallotPanel.SuspendLayout();
            this.CastBallotTablePanel.SuspendLayout();
            this.ChallengedBallotPanel.SuspendLayout();
            this.ChallengedBallotTablePanel.SuspendLayout();
            this.ElectionInfoPanel.SuspendLayout();
            this.ElectionInfoTablePanel.SuspendLayout();
            this.SuspendLayout();
            // 
            // CastBallotPanelLabel
            // 
            this.CastBallotPanelLabel.AutoSize = true;
            this.CastBallotPanelLabel.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(32)))), ((int)(((byte)(32)))), ((int)(((byte)(32)))));
            this.CastBallotPanelLabel.Dock = System.Windows.Forms.DockStyle.Fill;
            this.CastBallotPanelLabel.Font = new System.Drawing.Font("Univers LT Std 45 Light", 15.75F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.CastBallotPanelLabel.Location = new System.Drawing.Point(3, 0);
            this.CastBallotPanelLabel.Name = "CastBallotPanelLabel";
            this.CastBallotPanelLabel.Size = new System.Drawing.Size(486, 40);
            this.CastBallotPanelLabel.TabIndex = 0;
            this.CastBallotPanelLabel.Text = "Cast Ballots";
            this.CastBallotPanelLabel.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            this.CastBallotPanelLabel.Click += new System.EventHandler(this.CastBallotPanelLabel_Click);
            // 
            // ServerInfoPanel
            // 
            this.ServerInfoPanel.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(32)))), ((int)(((byte)(32)))), ((int)(((byte)(32)))));
            this.ServerInfoPanel.ColumnCount = 2;
            this.ServerInfoPanel.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 40F));
            this.ServerInfoPanel.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 60F));
            this.ServerInfoPanel.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Absolute, 20F));
            this.ServerInfoPanel.Controls.Add(this.CastBallotPanel, 0, 1);
            this.ServerInfoPanel.Controls.Add(this.ChallengedBallotPanel, 1, 1);
            this.ServerInfoPanel.Controls.Add(this.ElectionInfoPanel, 0, 0);
            this.ServerInfoPanel.Dock = System.Windows.Forms.DockStyle.Fill;
            this.ServerInfoPanel.Location = new System.Drawing.Point(0, 0);
            this.ServerInfoPanel.Name = "ServerInfoPanel";
            this.ServerInfoPanel.RowCount = 2;
            this.ServerInfoPanel.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Absolute, 75F));
            this.ServerInfoPanel.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Percent, 100F));
            this.ServerInfoPanel.Size = new System.Drawing.Size(1257, 754);
            this.ServerInfoPanel.TabIndex = 0;
            this.ServerInfoPanel.Paint += new System.Windows.Forms.PaintEventHandler(this.ServerInfoPanel_Paint);
            // 
            // CastBallotPanel
            // 
            this.CastBallotPanel.BorderStyle = System.Windows.Forms.BorderStyle.Fixed3D;
            this.CastBallotPanel.Controls.Add(this.CastBallotTablePanel);
            this.CastBallotPanel.Dock = System.Windows.Forms.DockStyle.Fill;
            this.CastBallotPanel.Location = new System.Drawing.Point(3, 78);
            this.CastBallotPanel.Name = "CastBallotPanel";
            this.CastBallotPanel.Size = new System.Drawing.Size(496, 673);
            this.CastBallotPanel.TabIndex = 3;
            // 
            // CastBallotTablePanel
            // 
            this.CastBallotTablePanel.AutoSize = true;
            this.CastBallotTablePanel.ColumnCount = 1;
            this.CastBallotTablePanel.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 100F));
            this.CastBallotTablePanel.Controls.Add(this.CastBallotLabelTable, 0, 1);
            this.CastBallotTablePanel.Controls.Add(this.CastBallotPanelLabel, 0, 0);
            this.CastBallotTablePanel.Dock = System.Windows.Forms.DockStyle.Fill;
            this.CastBallotTablePanel.Location = new System.Drawing.Point(0, 0);
            this.CastBallotTablePanel.Name = "CastBallotTablePanel";
            this.CastBallotTablePanel.RowCount = 2;
            this.CastBallotTablePanel.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Absolute, 40F));
            this.CastBallotTablePanel.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Percent, 100F));
            this.CastBallotTablePanel.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Absolute, 20F));
            this.CastBallotTablePanel.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Absolute, 20F));
            this.CastBallotTablePanel.Size = new System.Drawing.Size(492, 669);
            this.CastBallotTablePanel.TabIndex = 0;
            // 
            // CastBallotLabelTable
            // 
            this.CastBallotLabelTable.AutoScroll = true;
            this.CastBallotLabelTable.AutoSize = true;
            this.CastBallotLabelTable.CellBorderStyle = System.Windows.Forms.TableLayoutPanelCellBorderStyle.Single;
            this.CastBallotLabelTable.ColumnCount = 1;
            this.CastBallotLabelTable.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 100F));
            this.CastBallotLabelTable.Dock = System.Windows.Forms.DockStyle.Fill;
            this.CastBallotLabelTable.Location = new System.Drawing.Point(3, 43);
            this.CastBallotLabelTable.Name = "CastBallotLabelTable";
            this.CastBallotLabelTable.RowCount = 1;
            this.CastBallotLabelTable.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Absolute, 622F));
            this.CastBallotLabelTable.Size = new System.Drawing.Size(486, 623);
            this.CastBallotLabelTable.TabIndex = 1;
            // 
            // ChallengedBallotPanel
            // 
            this.ChallengedBallotPanel.BorderStyle = System.Windows.Forms.BorderStyle.Fixed3D;
            this.ChallengedBallotPanel.Controls.Add(this.ChallengedBallotTablePanel);
            this.ChallengedBallotPanel.Dock = System.Windows.Forms.DockStyle.Fill;
            this.ChallengedBallotPanel.Location = new System.Drawing.Point(505, 78);
            this.ChallengedBallotPanel.Name = "ChallengedBallotPanel";
            this.ChallengedBallotPanel.Size = new System.Drawing.Size(749, 673);
            this.ChallengedBallotPanel.TabIndex = 4;
            // 
            // ChallengedBallotTablePanel
            // 
            this.ChallengedBallotTablePanel.ColumnCount = 2;
            this.ChallengedBallotTablePanel.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 28.36676F));
            this.ChallengedBallotTablePanel.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 71.63324F));
            this.ChallengedBallotTablePanel.Controls.Add(this.ChallengedBallotsPanelLabel, 0, 0);
            this.ChallengedBallotTablePanel.Controls.Add(this.ChallengedBallotLabelTable, 0, 1);
            this.ChallengedBallotTablePanel.Controls.Add(this.ChallengedBallotViewer, 1, 1);
            this.ChallengedBallotTablePanel.Dock = System.Windows.Forms.DockStyle.Fill;
            this.ChallengedBallotTablePanel.Location = new System.Drawing.Point(0, 0);
            this.ChallengedBallotTablePanel.Name = "ChallengedBallotTablePanel";
            this.ChallengedBallotTablePanel.RowCount = 2;
            this.ChallengedBallotTablePanel.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Absolute, 40F));
            this.ChallengedBallotTablePanel.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Percent, 100F));
            this.ChallengedBallotTablePanel.Size = new System.Drawing.Size(745, 669);
            this.ChallengedBallotTablePanel.TabIndex = 0;
            // 
            // ChallengedBallotsPanelLabel
            // 
            this.ChallengedBallotsPanelLabel.AutoSize = true;
            this.ChallengedBallotsPanelLabel.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(32)))), ((int)(((byte)(32)))), ((int)(((byte)(32)))));
            this.ChallengedBallotTablePanel.SetColumnSpan(this.ChallengedBallotsPanelLabel, 2);
            this.ChallengedBallotsPanelLabel.Dock = System.Windows.Forms.DockStyle.Fill;
            this.ChallengedBallotsPanelLabel.Font = new System.Drawing.Font("Univers LT Std 45 Light", 15.75F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.ChallengedBallotsPanelLabel.Location = new System.Drawing.Point(3, 0);
            this.ChallengedBallotsPanelLabel.Name = "ChallengedBallotsPanelLabel";
            this.ChallengedBallotsPanelLabel.Size = new System.Drawing.Size(739, 40);
            this.ChallengedBallotsPanelLabel.TabIndex = 0;
            this.ChallengedBallotsPanelLabel.Text = "Challenged Ballots";
            this.ChallengedBallotsPanelLabel.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            this.ChallengedBallotsPanelLabel.Click += new System.EventHandler(this.ChallengedBallotsPanelLabel_Click);
            // 
            // ChallengedBallotLabelTable
            // 
            this.ChallengedBallotLabelTable.AutoScroll = true;
            this.ChallengedBallotLabelTable.AutoSize = true;
            this.ChallengedBallotLabelTable.CellBorderStyle = System.Windows.Forms.TableLayoutPanelCellBorderStyle.Single;
            this.ChallengedBallotLabelTable.ColumnCount = 1;
            this.ChallengedBallotLabelTable.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 50F));
            this.ChallengedBallotLabelTable.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 50F));
            this.ChallengedBallotLabelTable.Dock = System.Windows.Forms.DockStyle.Top;
            this.ChallengedBallotLabelTable.Location = new System.Drawing.Point(3, 43);
            this.ChallengedBallotLabelTable.MinimumSize = new System.Drawing.Size(0, 20);
            this.ChallengedBallotLabelTable.Name = "ChallengedBallotLabelTable";
            this.ChallengedBallotLabelTable.RowCount = 1;
            this.ChallengedBallotLabelTable.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Percent, 50F));
            this.ChallengedBallotLabelTable.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Percent, 50F));
            this.ChallengedBallotLabelTable.Size = new System.Drawing.Size(205, 20);
            this.ChallengedBallotLabelTable.TabIndex = 3;
            // 
            // ChallengedBallotViewer
            // 
            this.ChallengedBallotViewer.AllowWebBrowserDrop = false;
            this.ChallengedBallotViewer.Dock = System.Windows.Forms.DockStyle.Fill;
            this.ChallengedBallotViewer.IsWebBrowserContextMenuEnabled = false;
            this.ChallengedBallotViewer.Location = new System.Drawing.Point(214, 43);
            this.ChallengedBallotViewer.MinimumSize = new System.Drawing.Size(20, 20);
            this.ChallengedBallotViewer.Name = "ChallengedBallotViewer";
            this.ChallengedBallotViewer.ScrollBarsEnabled = false;
            this.ChallengedBallotViewer.Size = new System.Drawing.Size(528, 623);
            this.ChallengedBallotViewer.TabIndex = 4;
            this.ChallengedBallotViewer.WebBrowserShortcutsEnabled = false;
            // 
            // ElectionInfoPanel
            // 
            this.ElectionInfoPanel.BorderStyle = System.Windows.Forms.BorderStyle.Fixed3D;
            this.ServerInfoPanel.SetColumnSpan(this.ElectionInfoPanel, 2);
            this.ElectionInfoPanel.Controls.Add(this.ElectionInfoTablePanel);
            this.ElectionInfoPanel.Dock = System.Windows.Forms.DockStyle.Fill;
            this.ElectionInfoPanel.Location = new System.Drawing.Point(3, 3);
            this.ElectionInfoPanel.Name = "ElectionInfoPanel";
            this.ElectionInfoPanel.Size = new System.Drawing.Size(1251, 69);
            this.ElectionInfoPanel.TabIndex = 5;
            // 
            // ElectionInfoTablePanel
            // 
            this.ElectionInfoTablePanel.ColumnCount = 2;
            this.ElectionInfoTablePanel.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 100F));
            this.ElectionInfoTablePanel.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Absolute, 231F));
            this.ElectionInfoTablePanel.Controls.Add(this.ElectionInfoLabel, 0, 0);
            this.ElectionInfoTablePanel.Controls.Add(this.TimeLabel, 0, 1);
            this.ElectionInfoTablePanel.Controls.Add(this.ChallengeButton, 1, 0);
            this.ElectionInfoTablePanel.Dock = System.Windows.Forms.DockStyle.Fill;
            this.ElectionInfoTablePanel.Location = new System.Drawing.Point(0, 0);
            this.ElectionInfoTablePanel.Name = "ElectionInfoTablePanel";
            this.ElectionInfoTablePanel.RowCount = 2;
            this.ElectionInfoTablePanel.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Percent, 50F));
            this.ElectionInfoTablePanel.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Percent, 50F));
            this.ElectionInfoTablePanel.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Absolute, 20F));
            this.ElectionInfoTablePanel.Size = new System.Drawing.Size(1247, 65);
            this.ElectionInfoTablePanel.TabIndex = 2;
            // 
            // ElectionInfoLabel
            // 
            this.ElectionInfoLabel.AutoSize = true;
            this.ElectionInfoLabel.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(32)))), ((int)(((byte)(32)))), ((int)(((byte)(32)))));
            this.ElectionInfoLabel.Dock = System.Windows.Forms.DockStyle.Fill;
            this.ElectionInfoLabel.Font = new System.Drawing.Font("Univers LT Std 55", 14.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.ElectionInfoLabel.Location = new System.Drawing.Point(3, 0);
            this.ElectionInfoLabel.Name = "ElectionInfoLabel";
            this.ElectionInfoLabel.Size = new System.Drawing.Size(1010, 32);
            this.ElectionInfoLabel.TabIndex = 0;
            this.ElectionInfoLabel.Text = "Election Information";
            this.ElectionInfoLabel.Click += new System.EventHandler(this.ElectionInfoLabel_Click_2);
            // 
            // TimeLabel
            // 
            this.TimeLabel.AutoSize = true;
            this.TimeLabel.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(32)))), ((int)(((byte)(32)))), ((int)(((byte)(32)))));
            this.TimeLabel.Dock = System.Windows.Forms.DockStyle.Fill;
            this.TimeLabel.Font = new System.Drawing.Font("Univers LT Std 45 Light", 15.75F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.TimeLabel.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(224)))), ((int)(((byte)(224)))), ((int)(((byte)(224)))));
            this.TimeLabel.Location = new System.Drawing.Point(3, 32);
            this.TimeLabel.Name = "TimeLabel";
            this.TimeLabel.Size = new System.Drawing.Size(1010, 33);
            this.TimeLabel.TabIndex = 1;
            this.TimeLabel.Text = "Current Time:";
            this.TimeLabel.Click += new System.EventHandler(this.TimeLabel_Click);
            // 
            // ChallengeButton
            // 
            this.ChallengeButton.AutoSize = true;
            this.ChallengeButton.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(32)))), ((int)(((byte)(32)))), ((int)(((byte)(32)))));
            this.ChallengeButton.DialogResult = System.Windows.Forms.DialogResult.OK;
            this.ChallengeButton.Dock = System.Windows.Forms.DockStyle.Fill;
            this.ChallengeButton.FlatAppearance.BorderColor = System.Drawing.Color.FromArgb(((int)(((byte)(224)))), ((int)(((byte)(224)))), ((int)(((byte)(224)))));
            this.ChallengeButton.FlatAppearance.BorderSize = 0;
            this.ChallengeButton.FlatAppearance.MouseDownBackColor = System.Drawing.Color.FromArgb(((int)(((byte)(64)))), ((int)(((byte)(64)))), ((int)(((byte)(64)))));
            this.ChallengeButton.FlatAppearance.MouseOverBackColor = System.Drawing.Color.FromArgb(((int)(((byte)(32)))), ((int)(((byte)(32)))), ((int)(((byte)(32)))));
            this.ChallengeButton.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.ChallengeButton.Font = new System.Drawing.Font("Univers LT Std 45 Light", 12F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.ChallengeButton.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(224)))), ((int)(((byte)(224)))), ((int)(((byte)(224)))));
            this.ChallengeButton.Location = new System.Drawing.Point(1019, 3);
            this.ChallengeButton.Name = "ChallengeButton";
            this.ElectionInfoTablePanel.SetRowSpan(this.ChallengeButton, 2);
            this.ChallengeButton.Size = new System.Drawing.Size(225, 59);
            this.ChallengeButton.TabIndex = 2;
            this.ChallengeButton.Text = "Challenge a Ballot";
            this.ChallengeButton.UseVisualStyleBackColor = false;
            this.ChallengeButton.Click += new System.EventHandler(this.ChallengeButton_Click);
            // 
            // timer1
            // 
            this.timer1.Tick += new System.EventHandler(this.timer1_Tick);
            // 
            // ServerUI
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(32)))), ((int)(((byte)(32)))), ((int)(((byte)(32)))));
            this.ClientSize = new System.Drawing.Size(1257, 754);
            this.Controls.Add(this.ServerInfoPanel);
            this.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(224)))), ((int)(((byte)(224)))), ((int)(((byte)(224)))));
            this.Name = "ServerUI";
            this.Text = "STAR-Vote Audit Server";
            this.Load += new System.EventHandler(this.ServerUI_Load);
            this.ServerInfoPanel.ResumeLayout(false);
            this.CastBallotPanel.ResumeLayout(false);
            this.CastBallotPanel.PerformLayout();
            this.CastBallotTablePanel.ResumeLayout(false);
            this.CastBallotTablePanel.PerformLayout();
            this.ChallengedBallotPanel.ResumeLayout(false);
            this.ChallengedBallotTablePanel.ResumeLayout(false);
            this.ChallengedBallotTablePanel.PerformLayout();
            this.ElectionInfoPanel.ResumeLayout(false);
            this.ElectionInfoTablePanel.ResumeLayout(false);
            this.ElectionInfoTablePanel.PerformLayout();
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.TableLayoutPanel ServerInfoPanel;
        private System.Windows.Forms.Label CastBallotPanelLabel;
        private System.Windows.Forms.Label ElectionInfoLabel;
        private System.Windows.Forms.Timer timer1;
        private System.Windows.Forms.Label ChallengedBallotsPanelLabel;
        private System.Windows.Forms.TableLayoutPanel CastBallotTablePanel;
        private System.Windows.Forms.Panel ChallengedBallotPanel;
        private System.Windows.Forms.TableLayoutPanel ChallengedBallotTablePanel;
        private System.Windows.Forms.TableLayoutPanel ElectionInfoTablePanel;
        private System.Windows.Forms.Label TimeLabel;
        private System.Windows.Forms.Panel ElectionInfoPanel;
        private System.Windows.Forms.Panel CastBallotPanel;
        private System.Windows.Forms.TableLayoutPanel CastBallotLabelTable;
        private System.Windows.Forms.Button ChallengeButton;
        private System.Windows.Forms.TableLayoutPanel ChallengedBallotLabelTable;
        private System.Windows.Forms.WebBrowser ChallengedBallotViewer;


    }
}