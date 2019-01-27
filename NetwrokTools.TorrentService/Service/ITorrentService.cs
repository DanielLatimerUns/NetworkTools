using NetwrokTools.TorrentService.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace NetwrokTools.TorrentService.Service
{
    public interface ITorrentService
    {
        Task AddTorrent(TorrentModel torrent);
        Task RemoveTorrent(string hash, bool deleteFile);
        Task StartTorrent(string hash);
        Task StopTorrent(string hash);
        Task<List<TorrentModel>> GetTorrentsAsync();
    }
}
