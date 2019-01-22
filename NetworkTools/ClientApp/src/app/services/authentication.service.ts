import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders } from '@angular/common/http';
import { LoginModel } from '../models/loginModel';
import { UserModel } from '../models/userModel';
import { Router } from '@angular/router';
import { AppState } from '../state/appState';


@Injectable()
export class AuthenticationService {
    constructor(private http: HttpClient, private router: Router, private state: AppState) {

    }

    login(loginVm: LoginModel): Observable<JTWToken> {
      return this.http.post<JTWToken>('/api/auth', loginVm);
    }

    logout() {
      this.state.clearState();
      this.router.navigate(['login']);
    }

    isLoggedIn(): boolean {
         if (!this.state.session) {return false; }
      if (!this.state.session.sessionStart) { return false; }

      const sessionTImeCheck: Date = new Date(this.state.session.lastActive.getTime() + this.state.session.sessionLength * 60000 );
      const currentDatetime: Date = new Date();

      if (this.state.token != null && sessionTImeCheck > currentDatetime) {

        this.state.session.lastActive = new Date();
        this.state.cacheState();

        return true;
        }

      this.state.clearState();

      return false;
    }

  submitNewUser(userVm: UserModel): Observable<boolean> {
      return this.http.post<boolean>('/api/auth/addNewUser', userVm);
  }
}
