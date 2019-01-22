

using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using NetworkTools.Authentication;
using NetworkTools.Authentication.DataAccess;
using NetworkTools.Web.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
namespace NetworkTools.Web.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private UserManager<User> _userManager { get; set; }

        private IJwtFactory _jwtFactory;
        private JwtIssuerOptions _jwtOptions;

        public AuthController(UserManager<User> userManager, IJwtFactory jwtFactory, IOptions<JwtIssuerOptions> jwtOptions)
        {
            _userManager = userManager;
            _jwtFactory = jwtFactory;
            _jwtOptions = jwtOptions.Value;
        }

        [HttpPost]
        public async Task<IActionResult> Login([FromBody]LoginViewModel credentials)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var identity = await GetClaimsIdentity(credentials.Username, credentials.Password);
            if (identity == null)
            {
                return BadRequest("login_failure" + "Invalid username  or password.");
            }

            var jwt = JTWToken.GenerateToken(identity, _jwtFactory, credentials.Username, _jwtOptions);


            return Ok(jwt.Result);
        }

        [HttpPost("AddNewUser")]
        public async Task<IActionResult> AddNewUser([FromBody] UserViewModel userViewModel)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var user = new User { UserName = userViewModel.UserName, Email = userViewModel.Email };

                    var result = await _userManager.CreateAsync(user, userViewModel.Password);

                    if (result.Succeeded)
                    {
                        //Now create ApplicationUserRecord

                        return Ok("Account Created");
                    }
                    else { return BadRequest(result); }
                }
                else
                {
                    return BadRequest(ModelState);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.InnerException);
            }
        }

        private async Task<ClaimsIdentity> GetClaimsIdentity(string userName, string password)
        {
            if (string.IsNullOrEmpty(userName) || string.IsNullOrEmpty(password))
                return await Task.FromResult<ClaimsIdentity>(null);

            // get the user to verifty
            var userToVerify = await _userManager.FindByNameAsync(userName);

            if (userToVerify == null) return await Task.FromResult<ClaimsIdentity>(null);

            // check the credentials
            if (await _userManager.CheckPasswordAsync(userToVerify, password))
            {
                return await Task.FromResult(_jwtFactory.GenerateClaimsIdentity(userName, userToVerify.Id.ToString()));
            }

            // Credentials are invalid, or account doesn't exist
            return await Task.FromResult<ClaimsIdentity>(null);
        }
    }
}