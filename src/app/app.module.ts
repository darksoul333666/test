import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CharacterListComponent } from './components/character-list/character-list.component';
import { CharacterDetailComponent } from './components/character-detail/character-detail.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { RouterModule, Routes } from '@angular/router';
import { NgxsModule } from '@ngxs/store';
// import { CharacterState } from './redux/state/character.state';

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
    NgxsModule.forRoot([
      // CharacterState
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
