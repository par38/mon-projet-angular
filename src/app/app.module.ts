import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { Routes, RouterModule } from '@angular/router'

import { AppComponent } from './app.component';
import { AppareilComponent } from './appareil/appareil.component';
import { AppareilService } from './services/appareil.service';
import { AuthComponent } from './auth/auth.component';
import { AuthService } from './services/auth.service'
import { AppareilViewComponent } from './appareil-view/appareil-view.component';
import { SingleAppareilComponent } from './single-appareil/single-appareil.component';
import { FourOhFourComponent } from './four-oh-four/four-oh-four.component'
import {AuthGuard} from './services/auth-guard.service'

const appRoutes: Routes = [
  // ++++++ attention : les routes sont regardées dans l'ordre ! mettre la wildcard en dernière 
  { path: '', component: AuthComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'appareils', canActivate: [AuthGuard],component: AppareilViewComponent },
  { path: 'appareils/:id', canActivate: [AuthGuard], component: SingleAppareilComponent },
  // { path: '', component: AppareilViewComponent },
  { path: 'not-found', component: FourOhFourComponent },

  // ++++++ REDIRECTION vers path: 'not-found'
  // ++++++ path: '**' tous le reste, A METTRE EN DERNIER !!
  {path:'**', redirectTo:'not-found'}
]

@NgModule({
  declarations: [
    AppComponent,
    AppareilComponent,
    AuthComponent,
    AppareilViewComponent,
    SingleAppareilComponent,
    FourOhFourComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    AppareilService,
    AuthService, 
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
