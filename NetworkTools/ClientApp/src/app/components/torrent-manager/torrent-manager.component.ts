import { Component, ViewChild } from '@angular/core';
import { TorrentService } from '../../services/torrent.service';
import { FileUploadComponent } from '../file-upload/file-upload.component';

@Component({
    selector: 'app-torrent-manager',
    templateUrl: './torrent-manager.component.html',
    styleUrls: ['./torrent-manager.component.css'],
    providers: [ TorrentService ]
})
export class TorrentManagerComponent {
    constructor(private torrentService: TorrentService) {
      this.loadTorrents();
    }

    torrents: TorrentModel[];
    showNewTorrentWindow = false;
    @ViewChild(FileUploadComponent)fileUploader: FileUploadComponent;

    loadTorrents() {
      this.torrentService.getTorrents().subscribe(
        response => {
          this.torrents = response;
        },
        error => {
          console.error(error);
        },
        () => {}
      );
    }

    public submitNewTorrent() {
      if (this.fileUploader.torrentFormFile) {
        this.torrentService.addTorrent(this.fileUploader.torrentFormFile).subscribe(
          (response) => {
            this.closeNewTorrentWindow();
            this.loadTorrents();
          },
          error => {
            console.error(error);
          }
        );
      }
    }

    public closeNewTorrentWindow() {
      this.showNewTorrentWindow = false;
    }

    public openNewTorrentWindow() {
      this.showNewTorrentWindow = true;
    }
}
