import { Component, ViewChild } from '@angular/core';
import { AppState } from '../../state/appState';
import { SeedboxService } from '../../services/seedbox.service';

@Component({
    selector: 'app-seedbox-tools',
    providers: [SeedboxService],
    styleUrls: ['./seedbox-tools.component.css'],
    template:
   `
        <div class="component-container">
            <app-widget widgetName="Directories" [isLoading]="loadingDirectories" class="directories-widget">
                <ul>
                    <li *ngFor="let dir of storageDirectories">
                        <div>
                            <h3>{{dir.name}}:</h3>
                            <h3>{{dir.spaceUsed}}</h3>
                        </div>
                            <p>{{dir.directory}}</p>
                    </li>
                </ul>
            </app-widget>
        </div>
    `
})

export class SeedboxToolsComponent {

    public storageDirectories: any[];
    public loadingDirectories = true;

    constructor(state: AppState, private service: SeedboxService) {
        this.loadComponent();
    }

    private async loadComponent() {
       this.loadingDirectories = true;
       this.storageDirectories = await this.service.getDirectories().toPromise();
       this.loadingDirectories = false;
    }
}

