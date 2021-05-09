import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/shared/auth/auth.service';

@Component({
  selector: 'app-logout-dialog',
  templateUrl: './logout-dialog.component.html',
  styleUrls: ['./logout-dialog.component.scss']
})
export class LogoutDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<LogoutDialogComponent>, private auth: AuthService) { }

  ngOnInit(): void {
  }

  logout(){
    this.auth.logout();
    this.close();
  }

  close(){
    this.dialogRef.close()
  }
}
