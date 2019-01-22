import { UserModel } from '../models/userModel';
import { Injectable } from '@angular/core';
import { SessionModel } from '../models/sessionModel';

@Injectable()
export class AppState {

  public token: JTWToken;
  public user: UserModel;
  public session: SessionModel;

  /**
   *
   */
  constructor() {
    this.session = new SessionModel();
  }

  public cacheState(useLocalStroage: boolean = true) {

    if (useLocalStroage) {
      localStorage.setItem('APP_STATE', JSON.stringify(this));
    }
  }

  public getState() {
    const stateObject = JSON.parse(localStorage.getItem('APP_STATE')) as AppState;

    if (stateObject) {
    this.token = stateObject.token;
    this.user = stateObject.user;
    this.session.sessionStart = new Date(stateObject.session.sessionStart);
    this.session.lastActive = new Date(stateObject.session.lastActive);
    this.session.sessionLength = stateObject.session.sessionLength;
    }

  }
  public clearState() {
    localStorage.removeItem('APP_STATE');

    this.token = null;
    this.user = new UserModel();
    this.session = new SessionModel();
  }

}
