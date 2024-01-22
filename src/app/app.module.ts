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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CharacterCardComponent } from './shared/character-card.component';
import { FilersComponent } from './components/filers/filers.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import { CarouselModule } from 'ngx-bootstrap/carousel';

const routes: Routes = [
  { path: 'home', component: CharacterListComponent },
  { path: 'characters/:id', component: CharacterDetailComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    CharacterListComponent,
    CharacterDetailComponent,
    CharacterCardComponent,
    SidenavComponent,
    FilersComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    FormsModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatGridListModule,
    MatDividerModule,
    MatButtonModule,
    HttpClientModule,
    CarouselModule.forRoot(),
    NgxsModule.forRoot([
      CharacterState
    ]),
    BlockUIModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 5000, // Duración de la notificación (en milisegundos)
      positionClass: 'toast-top-right', // Posición de la notificación
      preventDuplicates: true, // Evita mostrar duplicados
    }),
    BrowserAnimationsModule,
  ],
  providers: [  
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },      
],
  bootstrap: [AppComponent]
})
export class AppModule { }
