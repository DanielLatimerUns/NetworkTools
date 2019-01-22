using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using NetworkTools.DiagnosticsService.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace NetworkTools.Web.Controllers.Diagnostics
{
    [Route("api/diagnostics/hdd")]
    public class HardDriveController : Controller
    {
        private IDiagnosticsService _diagnosticsService;

        public HardDriveController(IDiagnosticsService diagnosticsService)
        {
            _diagnosticsService = diagnosticsService;
        }

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                return Ok(_diagnosticsService.GetDriveInfo());
            }
            catch(Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}
