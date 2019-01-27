using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NetworkTools.Web.ViewModels;
using NetwrokTools.TorrentService.Models;
using NetwrokTools.TorrentService.Service;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace NetworkTools.Web.Controllers
{
    [Route("api/torrents")]
    public class TorrentController : Controller
    {
        private ITorrentService _torrentService;
        private IMapper _mapper;

        public TorrentController(ITorrentService torrentService,IMapper mapper)
        {
            _torrentService = torrentService;
            _mapper = mapper;
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Post(IFormFile torrent)
        {
            try
            {
                if (torrent != null)
                {
                    TorrentModel model = new TorrentModel
                    {
                        TorrentFile = torrent
                    };

                   await _torrentService.AddTorrent(model);

                   return Ok();
                }
                return BadRequest("No torrent file");
            }
            catch(Exception ex)
            {
                return StatusCode(500, ex);
            }
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> get()
        {
            try
            {
                var response = await _torrentService.GetTorrentsAsync();
                return Ok(_mapper.Map<List<TorrentViewModel>>(response));
            }
            catch(Exception ex)
            {
                return StatusCode(500, ex);
            }
        }

        [HttpGet("start/{hash}")]
        [Authorize]
        public async Task<IActionResult> start(string hash)
        {
            await _torrentService.StartTorrent(hash);
            return Ok();
        }

        [HttpGet("stop/{hash}")]
        [Authorize]
        public async Task<IActionResult> stop(string hash)
        {
            await _torrentService.StopTorrent(hash);
            return Ok();
        }

        [HttpDelete("{hash}/{perm}")]
        [Authorize]
        public async Task<IActionResult> delete(string hash,bool perm)
        {
            await _torrentService.RemoveTorrent(hash, perm);
            return Ok();
        }
    }
}
