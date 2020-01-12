using NetworkTools.RemoteShellServices.Models;
using NetworkTools.RemoteShellServices.SSHClient;
using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;

namespace NetworkTools.RemoteShellServices.FileSystemServices
{
    public class StorageService : IStorageService
    {
        private readonly ISSHClient _client;
        public StorageService(ISSHClient cleint)
        {
            _client = cleint;
        }

        public List<DirectoryInfor> GetSpaceUsedByDirectory()
        {
            const string command = " du -sh {0}";
            // lets move this to the DB at some point :)
            var directories = new string[] { "/downloads/tv", "/downloads/movies" };

            List<DirectoryInfor> results = new List<DirectoryInfor>();

            foreach (var directory in directories)
            {
                var lastSlash = directory.LastIndexOf('/') + 1;
                var dirName = directory.Substring(lastSlash, directory.Length - lastSlash);

                var result = _client.ExecuteCommand(string.Format(command, directory));
                var formatedResult = result.Substring(0, result.LastIndexOf('\t'));

                var builtDirectory = new DirectoryInfor
                {
                    Name = dirName.ToUpper(),
                    Directory = directory,
                    SpaceUsed = formatedResult
                };

                results.Add(builtDirectory);
            }

            return results;
        }
    }
}
