export class SessionModel {

  public sessionStart: Date;
  public lastActive: Date;
  public sessionLength: number;

  constructor () {
    this.sessionStart = null;
    this.lastActive = null;
    this.sessionLength = 30;
  }
}
