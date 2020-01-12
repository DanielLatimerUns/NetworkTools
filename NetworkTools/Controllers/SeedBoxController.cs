using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NetworkTools.RemoteShellServices.FileSystemServices;
using NetworkTools.Web.ViewModels;
using NetwrokTools.TorrentService.Models;
using NetwrokTools.TorrentService.Service;

namespace NetworkTools.Web.Controllers
{
    [Route("api/seedbox")]
    public class SeedBoxController : ControllerBase
    {
        private readonly IStorageService _storageService;

        public SeedBoxController(IStorageService storageService)
        {
            _storageService = storageService;
        }

        [HttpGet("storage")]
        [Authorize]
        public async Task<IActionResult> GetStorageInfo()
        {
            return Ok(_storageService.GetSpaceUsedByDirectory());
        }
    }
}