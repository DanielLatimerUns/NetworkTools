using System;
using System.Collections.Generic;
using System.Text;
using NetworkTools.DiagnosticsService.Models;

namespace NetworkTools.DiagnosticsService.Services
{
    public class DiagnosticsService : IDiagnosticsService
    {
        public List<HardDriveModel> GetDriveInfo()
        {
            var drives = Helpers.DriveHelpers.GetCurrentDrives();

            return new List<HardDriveModel>(drives);
        }
    }
}
