import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserForRegister } from '../models/userForRegister';
import { map, Observable } from 'rxjs';
import { UserForLogin } from '../models/userForLogin';
import { loginUrl, registerUrl } from 'src/app/configs/api-endpoints';
import { Tokens } from '../models/tokens';
import { UserInfo } from '../models/userInfo';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private readonly userId: string = 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier';
  private readonly userName: string = 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name';
  private readonly userRole: string = 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role';

  private jwtHelperService = new JwtHelperService();
  private readonly registerUrl = registerUrl;
  private readonly loginUrl = loginUrl;

  public currentUser: UserInfo = new UserInfo();

  constructor(private http: HttpClient) { }

  public register(user: UserForRegister): Observable<void> {

    return this.http.post<void>(this.registerUrl, user);
  }

  public login(user: UserForLogin): Observable<void> {

    return this.http.post<Tokens>(this.loginUrl, user).pipe(map((tokens: Tokens) => {
      
      if(tokens.token) {
        const decodedToken = this.jwtHelperService.decodeToken(tokens.token);

        this.currentUser.Id = decodedToken[this.userId];
        this.currentUser.Username = decodedToken[this.userName];
        this.currentUser.Role = decodedToken[this.userRole];

        localStorage.setItem('token', tokens.token);
        localStorage.setItem('user', JSON.stringify(this.currentUser));
      }
    }));
  }

  public isAuthenticated(): boolean {
    const token: any  = localStorage.getItem('token');
    return !this.jwtHelperService.isTokenExpired(token);
  }    
}
