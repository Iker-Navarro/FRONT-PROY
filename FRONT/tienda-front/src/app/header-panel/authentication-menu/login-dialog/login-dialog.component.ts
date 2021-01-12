import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../../auth/auth.service';
import { RegisterDialogComponent } from '../register-dialog/register-dialog.component';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss'],
})
export class LoginDialogComponent implements OnInit {
  @ViewChild('f') f: NgForm;

  userValue: string = "";
  error: string = "";

  password_hidden: boolean = true;

  constructor(private auth: AuthService, private dialog: MatDialog, private dialogRef: MatDialogRef<LoginDialogComponent>) {}

  ngOnInit(): void {}

  onSubmit() {
      this.auth.login(this.f.value.username, this.f.value.password)
      .subscribe(
        (data) => {
          this.close();
          console.log(data);
        },
        (error) => {
          console.log(error);
          this.error = error.message;
        }
      );
  }

  openRegister(){
    this.dialogRef.close();
    this.dialog.open(RegisterDialogComponent);
  }

  close(){
    this.dialogRef.close()
  }
}
