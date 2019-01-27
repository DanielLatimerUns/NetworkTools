using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using NetwrokTools.TorrentService.Intergrations;
using NetwrokTools.TorrentService.Models;

namespace NetwrokTools.TorrentService.Service
{
    public class TorrentService : ITorrentService
    {
        private IConfiguration _config;
        private IBittorrent _bittorrent;

        public TorrentService(IConfiguration config)
        {
            _config = config;
            ConfigureTorrentProvider();
        }

        public async Task AddTorrent(TorrentModel torrent)
        {
            if (torrent != null)
            {
                var fileInfo = new FileInfo(torrent.TorrentFile.FileName);
               // if(fileInfo.Extension != ".torrent") { throw new Exception("File is not a torrent file!"); }

                var path = Path.Combine(_config["ServerSettings:TorrentDir"], torrent.TorrentFile.FileName);
                using (var fileStream = new FileStream(path, FileMode.Create))
                {
                    torrent.TorrentFile.CopyTo(fileStream);
                };

                await _bittorrent.AddNewTorrent(path);
            }
                
        }

        public async Task<List<TorrentModel>> GetTorrentsAsync()
        {
            return await _bittorrent.GetTorrents();
        }

        public async Task RemoveTorrent(string hash, bool deleteFile)
        {
            await _bittorrent.RemoveTorrent(hash, deleteFile);
        }

        public async Task StartTorrent(string hash)
        {
            await _bittorrent.StartTorrent(hash);
        }

        public async Task StopTorrent(string hash)
        {
            await _bittorrent.StopTorrent(hash);
        }

        private void ConfigureTorrentProvider()
        {
            switch (_config["ServerSettings:BittorrentProvider"])
            {
                case "QTORRENT": _bittorrent = new QBittorrent(_config["ServerSettings:BittorrentURL"]);
                    break;
            }
        }
    }
}
