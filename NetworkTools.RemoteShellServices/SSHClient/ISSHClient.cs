using System;
using System.Collections.Generic;
using System.Text;

namespace NetworkTools.RemoteShellServices.SSHClient
{
    public interface ISSHClient
    {
        string ExecuteCommand(string command);
    }
}
