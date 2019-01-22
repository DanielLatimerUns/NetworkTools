import { Component } from '@angular/core';
import { LoginModel } from '../../models/loginModel';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { AppState } from '../../state/appState';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
/** login component*/
export class LoginComponent {
    /** login ctor */

    public loginModel: LoginModel = new LoginModel();
    public ui: UIConfig;

    constructor(private authService: AuthenticationService, private router: Router, private state: AppState) {
      this.setupUI();
    }

    private setupUI() {
      this.ui = {
      loginButtonPlaceholder: 'Login',
      passwordPlaceholder: 'Password',
      usernamePlaceholder: 'Username',
      errorMessage: ''
      };
    }

    login () {
      if (this.loginModel.username === '') {
         this.ui.errorMessage = 'Please enter a Username';
         return;
        }
      if (this.loginModel.password === '') {
        this.ui.errorMessage = 'Please enter a Password';
        return;
      }

      const loginRequest = this.authService.login(this.loginModel);

      loginRequest.subscribe(
        response => {
          this.state.token = response;
          this.state.session.sessionStart = new Date();
          this.state.session.lastActive = new Date();
          this.state.cacheState();
          this.router.navigate(['']);
        },
        error => {
          this.ui.errorMessage = 'Username and Password Combination Incorrect';
          console.error(error);
          this.loginModel = new LoginModel(); }
      );
    }
}

interface UIConfig {
  usernamePlaceholder: string;
  passwordPlaceholder: string;
  loginButtonPlaceholder: string;
  errorMessage: string;
}
