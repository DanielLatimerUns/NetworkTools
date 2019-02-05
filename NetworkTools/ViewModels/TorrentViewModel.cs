using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NetworkTools.Web.ViewModels
{
    public class TorrentViewModel
    {
        public string Name { get; set; }

        public float Progress { get; set; }

        public string TotalSize { get; set; }

        public string SizeLeft { get; set; }

        public string Uploaded { get; set; }

        public string HASH { get; set; }

        public string AddedRaw { get; set; }

        public string CurrentState { get; set; }

        public string Dl_speed { get; set; }

        public string Up_speed { get; set; }

        public int Num_seeds { get; set; }

        public int Num_complete { get; set; }

        public int Num_leechs { get; set; }

        public int Num_incomplete { get; set; }

        public float Ratio { get; set; }

        public string Eta { get; set; }
    }
}
