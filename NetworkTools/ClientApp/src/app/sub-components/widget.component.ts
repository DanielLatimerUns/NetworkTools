import { Component, ViewChild, Input } from '@angular/core';

@Component({
    selector: 'app-widget',
    styleUrls: ['./widget.component.css'],
    template:
   `
        <div class="widget">
            <div class="widget-toolbar">
                <h2>{{widgetName}}</h2>
            </div>
            <ng-content *ngIf="!isLoading"></ng-content>
            <div class="widget-loading" *ngIf="isLoading">
                <h2>Loading...</h2>
            </div>
        </div>
    `
})


export class WidgetComponent {
    @Input() widgetName: string ;

    @Input() isLoading: boolean;
}

