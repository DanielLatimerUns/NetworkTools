import { Component } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { AppState } from '../../state/appState';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {

  constructor(private authService: AuthenticationService, private router: Router, private state: AppState) {
    const isLoggedIn = authService.isLoggedIn();
    if (!isLoggedIn) {
       router.navigate(['login']); }
  }
}
