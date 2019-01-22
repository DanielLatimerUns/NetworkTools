import { Component } from '@angular/core';
import { TorrentService } from '../../services/torrent.service';

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
}
