using System;
using System.Collections.Generic;
using System.Text;

namespace NetwrokTools.TorrentService.Intergrations
{
    public abstract class IntergrationBase
    {

        public IntergrationBase(string integrationURL)
        {
            IntergrationURL = integrationURL;
        }

        public string IntergrationURL { get; set; } = "";
    }
}
