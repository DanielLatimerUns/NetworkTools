using System.Collections.Generic;
using NetworkTools.RemoteShellServices.Models;

namespace NetworkTools.RemoteShellServices.FileSystemServices
{
    public interface IStorageService
    {
        List<DirectoryInfor> GetSpaceUsedByDirectory();
    }
}