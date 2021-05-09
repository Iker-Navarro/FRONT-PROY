import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { StoreComponent } from './components/store/store.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginDialogComponent } from './components/navbar/dialogs/login-dialog/login-dialog.component';
import { LogoutDialogComponent } from './components/navbar/dialogs/logout-dialog/logout-dialog.component';
import { RegisterDialogComponent } from './components/navbar/dialogs/register-dialog/register-dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Material

import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';  
import { MatIconModule } from '@angular/material/icon';  
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { AuthInterceptorService } from './shared/auth/auth-interceptor.service';
import { FooterComponent } from './components/footer/footer.component';
import { BookComponent } from './components/store/book/book.component';
import { CartComponent } from './components/store/cart/cart.component';
import { PurchasesComponent } from './components/store/purchases/purchases.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    AboutComponent,
    StoreComponent,
    LoginDialogComponent,
    LogoutDialogComponent,
    RegisterDialogComponent,
    FooterComponent,
    BookComponent,
    CartComponent,
    PurchasesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatDialogModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule
  ],
  providers:  [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
