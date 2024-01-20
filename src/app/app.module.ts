import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CharacterListComponent } from './components/character-list/character-list.component';
import { CharacterDetailComponent } from './components/character-detail/character-detail.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { RouterModule, Routes } from '@angular/router';
import { NgxsModule } from '@ngxs/store';
import { CharacterState } from './redux/state/character.state';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BlockUIModule } from 'ng-block-ui';
import { LoadingInterceptor } from './interceptor/loading.interceptor';

const routes: Routes = [
  { path: '', component: CharacterListComponent },
  { path: 'characters/:id', component: CharacterDetailComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    CharacterListComponent,
    CharacterDetailComponent,
    SidenavComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    NgxsModule.forRoot([
      CharacterState
    ]),
    BlockUIModule.forRoot(),
    ToastrModule.forRoot({
      toastClass: 'toast ngx-toastr',
      closeButton: true,
      autoDismiss: true,
      progressBar: true,
      timeOut: 2500,
      onActivateTick: true
    }),
  ],
  providers: [  
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },      
],
  bootstrap: [AppComponent]
})
export class AppModule { }
