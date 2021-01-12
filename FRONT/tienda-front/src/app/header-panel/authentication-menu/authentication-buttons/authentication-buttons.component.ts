import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../../auth/auth.service';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';
import { LogoutDialogComponent } from '../logout-dialog/logout-dialog.component';
import { RegisterDialogComponent } from '../register-dialog/register-dialog.component';

@Component({
  selector: 'app-authentication-buttons',
  templateUrl: './authentication-buttons.component.html',
  styleUrls: ['./authentication-buttons.component.scss']
})
export class AuthenticationButtonsComponent implements OnInit {
  userLogged: boolean = false;

  constructor(public dialog: MatDialog, private auth: AuthService) { }

  ngOnInit(): void {
    this.auth.user$.subscribe((user) => {
      this.userLogged = !!user;
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
