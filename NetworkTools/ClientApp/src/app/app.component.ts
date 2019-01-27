import { Component } from '@angular/core';
import { AppState } from './state/appState';
import { AuthenticationService } from './services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'app';
  contentPadding = 0;

  public showToolbar: boolean;
  constructor(public state: AppState, public authService: AuthenticationService, private router: Router) {
    state.getState();
    this.setupToolbar();
    router.events.subscribe((event) => {
      this.setupToolbar();
    });
  }

  setupToolbar() {
    this.showToolbar = this.authService.isLoggedIn();
  }
}
