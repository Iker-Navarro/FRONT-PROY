import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/shared/auth/auth.service';

@Component({
  selector: 'app-register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.scss']
})
export class RegisterDialogComponent implements OnInit {
  @ViewChild('f') f: NgForm;
  
  registerOk: boolean = false;

  userValue: string = "";
  emailValue: string = "";
  addressValue: string = "";
  cityValue: string = "";
  zipValue: string = "";

  password_hidden: boolean = true;

  error: string;

  constructor(private auth: AuthService, private dialogRef: MatDialogRef<RegisterDialogComponent>) { }

  ngOnInit(): void {
  }

  onSubmit(){
    if(this.f.value.password === this.f.value.password2){
      const user = {
        username: this.f.value.username,
        password: this.f.value.password,
        email: this.f.value.email,
        address: this.f.value.address,
        city: this.f.value.city,
        zip_code: this.f.value.zip_code,
      };
      this.auth.register(user)
      .subscribe(
        (data) => {
          this.registerOk = true;
          setTimeout(() => this.close(), 1500);
        },
        (error) => {
          // console.log(error);
          if(error.status == 409){
            this.error = "El usuario ya existe, elije otro";
          }
          else{
            this.error = error.message;
          }
        }
      );
    }else{
      this.f.controls['password2'].setErrors({'incorrect': true});
    }
  }

  close(){
    this.dialogRef.close()
  }
}
