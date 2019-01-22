using System;
using System.Collections.Generic;
using System.IO;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using NetwrokTools.TorrentService.Models;

namespace NetwrokTools.TorrentService.Intergrations
{
    public class QBittorrent : IntergrationBase , IBittorrent
    {

        public QBittorrent(string intergrationURl) : base(intergrationURl)
        {

        }

        public async Task AddNewTorrent(string torrentLocation)
        {
            if (File.Exists(torrentLocation))
            {
                var fileInfo = new FileInfo(torrentLocation);

                var torrentByteArray = File.ReadAllBytes(torrentLocation);
               
                var byteArrayContent = new ByteArrayContent(torrentByteArray);
                byteArrayContent.Headers.ContentType = MediaTypeHeaderValue.Parse("application/x-bittorrent");


                var form = new MultipartFormDataContent();
                form.Add(byteArrayContent, "torrents", fileInfo.Name);

                using(var client = new HttpClient())
                {
                    client.DefaultRequestHeaders.Accept.Clear();
                    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("multipart/form-data"));

                    
                 var response = await client.PostAsync(IntergrationURL+"/api/v2/torrents/add", form);

                    if (response.IsSuccessStatusCode)
                    {
                        return;
                    }
                    else
                    {
                        throw new Exception($"Request failed with error code :{response.StatusCode}");
                    }
                }
            }
        }

        public async Task<List<TorrentModel>> GetTorrents()
        {
            using(var client = new HttpClient())
            {
                var response = await client.GetAsync(IntergrationURL + @"/query/torrents");
                if (response.IsSuccessStatusCode)
                {
                    var parsedResponse = await response.Content.ReadAsAsync<List<TorrentModel>>();

                    return parsedResponse;
                }
                else
                {
                    throw new Exception($"Request faled with error code:{response.StatusCode}");
                }
            }
        }
    }
}
