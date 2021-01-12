import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/shared/models/User';
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
  user = {username: ""};

  constructor(public dialog: MatDialog, private auth: AuthService) { }

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
