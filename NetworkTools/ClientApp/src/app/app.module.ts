import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { LoginComponent } from './components/login/login.component';
import { GlobalToolbarComponent } from './components/global-toolbar/global-toolbar.component';
import { AppState } from './state/appState';
import { CustomHttpInterceptor } from './services/httpInterceptor';
import { AuthenticationService } from './services/authentication.service';
import { TorrentManagerComponent } from './components/torrent-manager/torrent-manager.component';
import { ActionToolbarComponent } from './components/action-toolbar/action-toolbar.component';
import { SettingsComponent } from './components/settings/settings.component';
import { SeedboxToolsComponent } from './components/seedbox-tools/seedbox-tools.component';
import { WidgetComponent } from './sub-components/widget.component';

@NgModule({
  declarations: [
    AppComponent,
    GlobalToolbarComponent,
    HomeComponent,
    FileUploadComponent,
    LoginComponent,
    TorrentManagerComponent,
    ActionToolbarComponent,
    SettingsComponent,
    SeedboxToolsComponent,
    WidgetComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: SeedboxToolsComponent, pathMatch: 'full' },
      { path: 'home', component: HomeComponent, pathMatch: 'full'},
      { path: 'login', component: LoginComponent, pathMatch: 'full'},
      { path: 'torrent-manager', component: TorrentManagerComponent, pathMatch: 'full' },
      { path: 'settings', component: SettingsComponent, pathMatch: 'full' },
      { path: 'seedbox-tools', component: SeedboxToolsComponent, pathMatch: 'full'},
      { path: 'widget', component: WidgetComponent, pathMatch: 'full'},
    ])
  ],
  providers: [
    AppState,
    {
     provide: HTTP_INTERCEPTORS,
     useClass: CustomHttpInterceptor,
     multi: true
    },
    AuthenticationService
],
  bootstrap: [AppComponent]
})
export class AppModule { }
