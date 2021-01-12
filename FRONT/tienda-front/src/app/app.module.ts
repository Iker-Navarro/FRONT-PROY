import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderPanelComponent } from './header-panel/header-panel.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { CategoryMenuComponent } from './header-panel/cateogory-menu/category-menu.component';
import { MainPanelComponent } from './main-panel/main-panel.component';
import { BookCardComponent } from './main-panel/book-card/book-card.component';
import { CommonModule } from '@angular/common';
import { SingleBookPanelComponent } from './single-book-panel/single-book-panel.component';
import { AuthorPanelComponent } from './author-panel/author-panel.component';
import { AuthenticationButtonsComponent } from './header-panel/authentication-menu/authentication-buttons/authentication-buttons.component';
import { LoginDialogComponent } from './header-panel/authentication-menu/login-dialog/login-dialog.component';
import { RegisterDialogComponent } from './header-panel/authentication-menu/register-dialog/register-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';  
import { MatIconModule } from '@angular/material/icon';  
import { FormsModule } from '@angular/forms';
import { LogoutDialogComponent } from './header-panel/authentication-menu/logout-dialog/logout-dialog.component';
import { AuthInterceptorService } from './auth/auth-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderPanelComponent,
    CategoryMenuComponent,
    MainPanelComponent,
    BookCardComponent,
    SingleBookPanelComponent,
    AuthorPanelComponent,
    AuthenticationButtonsComponent,
    LoginDialogComponent,
    RegisterDialogComponent,
    LogoutDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatButtonModule,
    HttpClientModule,
    CommonModule,
    MatDialogModule,
    MatInputModule,
    MatIconModule,
    FormsModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
