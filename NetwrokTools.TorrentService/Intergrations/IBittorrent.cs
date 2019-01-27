using NetwrokTools.TorrentService.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace NetwrokTools.TorrentService.Intergrations
{
    interface IBittorrent
    {
        Task AddNewTorrent(string TorrentLocation);
        Task RemoveTorrent(string Hash,bool deleteFile);
        Task StartTorrent(string Hash);
        Task StopTorrent(string Hash);
        Task<List<TorrentModel>> GetTorrents();
    }
}
