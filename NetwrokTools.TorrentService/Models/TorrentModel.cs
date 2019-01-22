using Microsoft.AspNetCore.Http;
using NetworkTools.Utility.Converters;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace NetwrokTools.TorrentService.Models
{
    public class TorrentModel
    {
        [JsonIgnore]
        public IFormFile TorrentFile { get; set; }

        [JsonProperty(PropertyName = "name")]
        public string Name { get; set; }

        [JsonProperty(PropertyName = "progress")]
        public float Progress { get; set; }

        private string _totalSize;

        [JsonProperty(PropertyName = "size")]
        public string TotalSize
        {
            get { return _totalSize; }
            set
            {
               _totalSize = ByteConverter.SizeSuffix(long.Parse(value));
            }
        }

        private string _sizeLeft;

        [JsonProperty(PropertyName = "amount_left")]
        public string SizeLeft
        {
            get { return _sizeLeft; }
            set
            {
                _sizeLeft = ByteConverter.SizeSuffix(long.Parse(value));
            }
        }

        [JsonProperty(PropertyName = "uploaded")]
        public string Uploaded { get; set; }

        [JsonProperty(PropertyName = "hash")]
        public string HASH { get; set; }

        [JsonProperty(PropertyName = "added_on")]
        public string AddedRaw { get; set; }

        public DateTimeOffset AddedDate { get { return DateTimeOffset.FromUnixTimeSeconds(long.Parse(AddedRaw)); } }

        [JsonProperty(PropertyName = "state")]
        public string CurrentState { get; set; }
    }
}
