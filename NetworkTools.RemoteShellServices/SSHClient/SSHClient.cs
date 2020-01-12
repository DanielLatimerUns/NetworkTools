using Microsoft.Extensions.Configuration;
using Renci.SshNet;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Text;

namespace NetworkTools.RemoteShellServices.SSHClient
{
    public class SSHClient : ISSHClient
    {
        private string hostAddress;

        private int port;

        private string username;

        private string password;

        private IConfiguration _configuration;

        public SSHClient(IConfiguration configuration)
        {
            _configuration = configuration;

            this.Init();
        }
        public string ExecuteCommand(string command)
        {
            if (string.IsNullOrEmpty(command))
                throw new Exception("Command is not a valid Bash command");

            var result = "";

            using(var client = new SshClient(hostAddress, port, username, password))
            {
                client.Connect();

               var response = client.RunCommand(command);

                if (!string.IsNullOrEmpty(response.Error))
                    result = response.Error;

                result = response.Result;

                client.Disconnect();              
            }

            return result;
        }

        private void Init()
        {
            hostAddress = _configuration["SSH:HostAddress"];
            port = int.TryParse(_configuration["SSH:Port"], out var parsedPort) ?
                parsedPort : 22;

            username = _configuration["SSH:Username"];
            password = _configuration["SSH:Password"];

            if (string.IsNullOrEmpty(hostAddress))
                throw new Exception("No Host Address has been configured.");

            if (string.IsNullOrEmpty(username))
                throw new Exception("No Username has been configured.");

            if (string.IsNullOrEmpty(password))
                throw new Exception("No Password has been configured.");
        }
    }
}
