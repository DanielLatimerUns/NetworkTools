using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace NetworkTools.Authentication
{
    public class JTWToken
    {
        public async static Task<JTWResponseToken> GenerateToken(ClaimsIdentity claimsIdentity, IJwtFactory IJwtFactory, string userName, JwtIssuerOptions jwtIssuerOptions)
        {
            var reponse = new JTWResponseToken();

            reponse.ID = claimsIdentity.Claims.Single(c => c.Type == "id").Value;
            reponse.Auth_Token = await IJwtFactory.GenerateEncodedToken(userName, claimsIdentity);
            reponse.Expires_In = (int)jwtIssuerOptions.ValidFor.TotalSeconds;

            return reponse;
        }
    }
}
