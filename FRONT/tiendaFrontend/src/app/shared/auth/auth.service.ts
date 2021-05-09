import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$ = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) { }

  register(user: any){
    return this.http
    .post(environment.api + '/auth/register', user)
    .pipe(
      tap(resData => {
        //console.log(resData)
      })
    )
  }

  login(username: string, password: string){
    return this.http
    .post(environment.api + '/auth/login', {
      username: username,
      password: password,
    })
  }

  logout(){
    this.user$.next(null);
  }
} 
