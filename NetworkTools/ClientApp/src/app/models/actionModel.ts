export class ActionModel {

  /**
   *
   */
  constructor(actionId, actionName, action) {
    this.ActionName = actionName;
    this.ActionId = actionId;
    this.Action = action;
  }

  public ActionName: string;

  public Action: Function;

  public ActionId: Number;

  public Icon: String;
}
