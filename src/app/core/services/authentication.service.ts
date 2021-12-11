import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { IUserForRegister } from '../models/userForRegister';
import { map, Observable } from 'rxjs';
import { IUserForAuth } from '../models/userForAuth';
import { loginUrl, registerUrl } from 'src/app/configs/api-endpoints';
import { ITokens } from '../models/tokens';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private jwtHelperService = new JwtHelperService();
  private readonly registerUrl = registerUrl;
  private readonly loginUrl = loginUrl;

  constructor(private http: HttpClient) { }

  public register(user: IUserForRegister): Observable<void> {

    return this.http.post<void>(this.registerUrl, user);
  }

  public login(user: IUserForAuth): Observable<void> {

    return this.http.post<ITokens>(this.loginUrl, user).pipe(map((tokens: ITokens) => {
      
      if(tokens.token) {
        localStorage.setItem('token', tokens.token);   
      }
    }));
  }

  public isAuthenticated(): boolean {
    const token: any  = localStorage.getItem('token');
    return !this.jwtHelperService.isTokenExpired(token);
  }    
}
