import { Component } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
    selector: 'app-global-toolbar',
    templateUrl: './global-toolbar.component.html',
    styleUrls: ['./global-toolbar.component.css'],
    providers:[AuthenticationService]
})

export class GlobalToolbarComponent {

    constructor(private authService: AuthenticationService) {

    }

    logout() {
      this.authService.logout();
    }
}
