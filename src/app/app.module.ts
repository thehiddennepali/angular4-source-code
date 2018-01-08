import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LayoutsComponent } from './_layouts/layouts.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { FarmComponent } from './farm/farm.component';
import { ClientComponent } from './client/client.component';
import { ContactComponent } from './contact/contact.component';
import { BannerComponent } from './banner/banner.component';
import { CartComponent } from './cart/cart.component';

import { HttpModule } from '@angular/http';

import { routing } from './app.routing';

import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LayoutsComponent,
    HomeComponent,
    AboutComponent,
    FarmComponent,
    ClientComponent,
    ContactComponent,
    BannerComponent,
    CartComponent,
    
    
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    routing,
    HttpModule,
    Ng2SearchPipeModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
