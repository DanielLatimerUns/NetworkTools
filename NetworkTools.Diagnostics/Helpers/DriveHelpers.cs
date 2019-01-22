using NetworkTools.DiagnosticsService.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace NetworkTools.DiagnosticsService.Helpers
{
    public static class DriveHelpers
    {
        public static IEnumerable<HardDriveModel> GetCurrentDrives()
        {          
            var drives = DriveInfo.GetDrives();

            if (drives != null)
            {
                foreach (var drive in drives)
                {
                    if (drive.IsReady && drive.DriveType == DriveType.Fixed)
                    {
                        yield return new HardDriveModel
                        {
                            DriveLetter = drive.Name,
                            Name = drive.VolumeLabel,
                            FreeSpace = drive.TotalFreeSpace,
                            TotalSize = drive.TotalSize,
                            UsedSpace = drive.TotalSize - drive.TotalFreeSpace
                        };
                    }
                }
            }
        }
    }
}
