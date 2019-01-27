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
        Task RemoveTorrent(string TorrentID);
        Task StartTorrent(string TorrentID);
        Task StopTorrent(string TorrentID);
        Task<List<TorrentModel>> GetTorrents();
    }
}
