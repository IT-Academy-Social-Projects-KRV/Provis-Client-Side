import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUserForRegister } from '../models/userForRegister';
import { map, Observable } from 'rxjs';
import { IUserForAuth } from '../models/userForAuth';
import { loginUrl, registerUrl } from 'src/app/configs/api-endpoints';
import { ITokens } from '../models/tokens';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  readonly registerUrl = registerUrl;
  readonly loginUrl = loginUrl;

  constructor(private http: HttpClient) { }

  register(user: IUserForRegister): Observable<void> {

    return this.http.post<void>(this.registerUrl, user);
  }

  login(user: IUserForAuth): Observable<void> {

    return this.http.post<ITokens>(this.loginUrl, user).pipe(map((tokens: ITokens) => {
      
      if(tokens.jwt && tokens.refreshToken)
      {
        localStorage.setItem("jwt", tokens.jwt);
        localStorage.setItem("refreshToken", tokens.refreshToken);
      }
    }));
  }
}
