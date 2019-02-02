import { Component } from '@angular/core';
import { ActionModel } from '../../models/actionModel';
import { AppState } from '../../state/appState';
import { Router } from '@angular/router';


@Component({
    selector: 'app-action-toolbar',
    templateUrl: './action-toolbar.component.html',
    styleUrls: ['./action-toolbar.component.css']
})
/** action-toolbar component*/
export class ActionToolbarComponent {
    /** action-toolbar ctor */
    constructor(private state: AppState , private router: Router) {
      this.router.events.subscribe(
        (event) => this.actions = state.actionBarActions
      );
    }

    public actions: ActionModel[] = [];

    public actionButtonClick(actionId: Number) {
      for (const action of this.actions) {
        if (action.ActionId === actionId) {
          action.Action();
        }
      }
    }
}
