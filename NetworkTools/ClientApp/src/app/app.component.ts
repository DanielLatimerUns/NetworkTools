import { Component } from '@angular/core';
import { AppState } from './state/appState';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  public showToolbar: boolean;
  constructor(public state: AppState, public authService: AuthenticationService) {
    state.getState();
    this.showToolbar = authService.isLoggedIn();
  }
}
