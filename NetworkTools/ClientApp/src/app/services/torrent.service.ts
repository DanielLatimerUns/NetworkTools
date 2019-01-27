import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class TorrentService {
    constructor(private http: HttpClient) {}

    public addTorrent(torrentFile: any): Observable<any> {
      return this.http.post<any>('/api/torrents', torrentFile);
    }

    public getTorrents(): Observable<TorrentModel[]> {
      return this.http.get<TorrentModel[]>('/api/torrents');
    }

    public removeTorrent(hash: string, permDelete: boolean): Observable<any> {
      return this.http.delete(`/api/torrents/${hash}/${permDelete}`);
    }

    public startTorrent(hash: string): Observable<any> {
      return this.http.get(`/api/torrents/start/${hash}`);
    }

    public stopTorrent(hash: string): Observable<any> {
      return this.http.get(`/api/torrents/stop/${hash}`);
    }
}
