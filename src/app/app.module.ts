import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule , ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material';
import { HomeComponent } from './home/home.component';
import { HomeService } from './home/home.service';
import { FavoritesComponent } from './favorites/favorites.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FavoritesComponent
  ],
  imports: [
    BrowserModule, FormsModule,HttpClientModule,ReactiveFormsModule,
    AppRoutingModule,BrowserAnimationsModule,MaterialModule],
  providers: [HomeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
