import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { BookStoreService } from 'src/app/shared/services/book-store.service';
import { LoginDialogComponent } from './dialogs/login-dialog/login-dialog.component';
import { LogoutDialogComponent } from './dialogs/logout-dialog/logout-dialog.component';
import { RegisterDialogComponent } from './dialogs/register-dialog/register-dialog.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user = null;

  constructor(
    public dialog: MatDialog, 
    private auth: AuthService, 
    ) { }

  ngOnInit(): void {
    this.auth.user$.subscribe((user) => {
      this.user = user;
    })
  }

  openLogin(){
    this.dialog.open(LoginDialogComponent);
  }
  
  openRegister(){
    this.dialog.open(RegisterDialogComponent);
  }

  openLogout(){
    this.dialog.open(LogoutDialogComponent);
  }

}
