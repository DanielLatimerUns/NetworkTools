using AutoMapper;
using NetworkTools.Web.ViewModels;
using NetwrokTools.TorrentService.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NetworkTools.Web.Mapping
{
    public class MapProfile : Profile
    {
        public MapProfile()
        {
            CreateMap<TorrentModel, TorrentViewModel>();
            CreateMap<TorrentViewModel,TorrentModel>();
        }
    }
}
