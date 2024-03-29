import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, take } from "rxjs/operators";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor{
    
    constructor(private auth: AuthService) { }
    
    intercept(req:HttpRequest<any>, next: HttpHandler){
        return this.auth.user$.pipe(
            take(1),
            exhaustMap(user => {
                if(!user){
                    return next.handle(req);
                }
                
                const modifiedReq = req.clone({
                    setHeaders: {
                        'Content-Type' : 'application/json; charset=utf-8',
                        'Accept'       : 'application/json',
                        'Authorization': `Bearer ${user.token}`,
                    },
                    });
                return next.handle(modifiedReq);
            })
        )
    }
}