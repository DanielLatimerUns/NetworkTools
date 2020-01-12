import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SeedboxService {
    constructor(private http: HttpClient) {}

    public getDirectories(): Observable<any[]> {
        return this.http.get<any>('/api/seedbox/storage');
      }
}
