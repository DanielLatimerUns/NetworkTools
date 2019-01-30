import { Component, ViewChild } from '@angular/core';
import { TorrentService } from '../../services/torrent.service';
import { FileUploadComponent } from '../file-upload/file-upload.component';
import { variable } from '@angular/compiler/src/output/output_ast';
import { removeSummaryDuplicates } from '@angular/compiler';

@Component({
    selector: 'app-torrent-manager',
    templateUrl: './torrent-manager.component.html',
    styleUrls: ['./torrent-manager.component.css'],
    providers: [ TorrentService ]
})
export class TorrentManagerComponent {
    constructor(private torrentService: TorrentService) {
    //  setInterval(() => this.loadTorrents(), 1000);

    this.loadTorrents();
    }

    torrents: TorrentModel[];
    showNewTorrentWindow = false;
    showTorrentDeleteWindow = false;
    permaDeleteTorrent = false;
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
        this.torrentService.addTorrent(this.fileUploader.torrentFormFile)
        .subscribe(
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

    public startStopTorrent(hash: string) {
      this.torrents.forEach((torrent) => {
        if (torrent.hash === hash) {
          if (torrent.currentState.includes('paused')) {
            this.torrentService.startTorrent(hash)
            .subscribe(
              (result) => console.log(hash + 'Paused'),
              error => console.error(error)
            );
          } else {
            this.torrentService.stopTorrent(hash)
            .subscribe(
              (result) => console.log(hash + 'Started'),
              error => console.error(error)
            );
          }
        }
      });
    }

    public permaDelete(hash: string) {
      this.permaDeleteTorrent = document.getElementById('permaDelete').checked;
      this.removeTorrent(hash, this.permaDeleteTorrent)
    }

    public removeTorrent(hash: string, permaDeleteTorrent) {
      this.torrentService.removeTorrent(hash, this.permaDeleteTorrent)
      .subscribe(
        result => console.log(hash + 'removed'),
        error => console.error(error)
      );
    }

    public closeNewTorrentWindow() {
      this.showNewTorrentWindow = false;
    }

    public openNewTorrentWindow() {
      this.showNewTorrentWindow = true;
    }

    public closeTorrentDeleteWindow() {
      this.showTorrentDeleteWindow = false;
    }

    public openTorrentDeleteWindow() {
      this.showTorrentDeleteWindow = true;
    }

    public calculateProgress(progress: number) {
      return  `${Math.round((progress / 1) * 100)}%`;
    }
}
