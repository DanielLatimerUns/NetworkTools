using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NetworkTools.Authentication
{
    public class JTWResponseToken
    {
        public string ID { get; set; }
        public string Auth_Token { get; set; }
        public int Expires_In { get; set; }
    }
}
