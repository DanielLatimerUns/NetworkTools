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

        private string _dlspeed;

        [JsonProperty(PropertyName = "dlspeed")]
        public string Dlspeed 
        { 
            get { return _dlspeed;}
            set
            {
                _dlspeed = ByteConverter.SizeSuffix(long.Parse(value));
            } 
        }

        private string _upspeed;

        [JsonProperty(PropertyName = "upspeed")]
        public string Upspeed
        { 
            get{ return _upspeed;}
            set
            {
                _upspeed = ByteConverter.SizeSuffix(long.Parse(value));
            }
        }

        [JsonProperty(PropertyName = "num_seeds")]
        public int Num_seeds { get; set; }

        [JsonProperty(PropertyName = "num_complete")]
        public int Num_complete { get; set; }

        [JsonProperty(PropertyName = "num_leechs")]
        public int Num_leechs { get; set; }

        [JsonProperty(PropertyName = "num_incomplete")]
        public int Num_incomplete { get; set; }

        [JsonProperty(PropertyName = "ratio")]
        public float Ratio { get; set; }

        private string _eta;

        [JsonProperty(PropertyName = "eta")]
        public string Eta {

            get { return _eta; }
            set
            {
                _eta = SecondsConverter.TimeSuffix(long.Parse(value));
            }
        }

    }
}
