import { Component } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-global-toolbar',
    templateUrl: './global-toolbar.component.html',
    styleUrls: ['./global-toolbar.component.css'],
    providers: [AuthenticationService]
})

export class GlobalToolbarComponent {

  constructor(private authService: AuthenticationService, private router: Router) {
    }

    logout() {
      this.authService.logout();
    }

    loadHome() {
        this.router.navigate(['home']);
    }

    loadTorrent() {
        this.router.navigate(['torrent-manager']);
   }

    loadsettings() {
      this.router.navigate(['settings']);
    }

    loadSeedbox() {
      this.router.navigate(['seedbox-tools']);
    }
  
}
