using System;
using System.Collections.Generic;
using System.Text;

namespace NetworkTools.DiagnosticsService.Models
{
    public class HardDriveModel
    {
        public string Name { get; set; }
        
        public string DriveLetter { get; set; }

        public decimal FreeSpace { get; set; }

        public decimal UsedSpace { get; set; }

        public decimal TotalSize { get; set; }
    }
}
