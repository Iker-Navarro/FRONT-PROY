import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/shared/auth/auth.service';
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
          // console.log(data);
          this.auth.user$.next(data);
          this.close();
        },
        (error) => {
          // console.log(error);
          if(error.status == 401){
            this.error = "Usuario o contraseña incorrectos";
          }else{
            this.error = error.message;
          }
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




const myfuncion = (res) => {
  console.log(res)
}
function x(res){
  console.log(res)
}