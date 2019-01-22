using NetworkTools.DiagnosticsService.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace NetworkTools.DiagnosticsService.Services
{
    public interface IDiagnosticsService
    {
        List<HardDriveModel> GetDriveInfo();
    }
}
