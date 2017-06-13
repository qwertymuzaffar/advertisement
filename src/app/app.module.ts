import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutes } from '../route/app.routes';
import { MaterialModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { UserComponent } from '../user/user.component';

import { AdvertService } from '../services/advert.service';
import { AuthService } from '../services/auth.service';
import { AuthToken } from '../services/auth.token.service';
import { UserService } from '../services/user.service';
import { AuthGuard } from '../guards/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutes,
    MaterialModule,
    BrowserAnimationsModule
  ],
  providers: [
    AdvertService,
    AuthService,
    AuthToken,
    UserService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
