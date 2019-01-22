using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NetworkTools.Authentication
{
    public class KeyFactory
    {
        public static SymmetricSecurityKey GetKey()
        {
            var keyString = "0S62MriW5tDWqJBHXSVfld8x9f4Gq4Nt";

            return new SymmetricSecurityKey(Encoding.ASCII.GetBytes(keyString));
        }
    }
}
