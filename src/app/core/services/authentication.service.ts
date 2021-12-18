import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserForRegister } from '../models/userForRegister';
import { map, Observable } from 'rxjs';
import { UserForLogin } from '../models/userForLogin';
import { loginUrl, logoutUrl, refreshTokenUrl, registerUrl } from 'src/app/configs/api-endpoints';
import { Tokens } from '../models/tokens';
import { UserInfo } from '../models/userInfo';
import { BehaviorSubject} from 'rxjs';

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
  private readonly refreshTokenUrl = refreshTokenUrl;
  private readonly logoutUrl = logoutUrl;

   public currentUser: UserInfo;

  constructor(private http: HttpClient) {
    const user = localStorage.getItem('user');

    if(user) {
      this.currentUser = JSON.parse(user);
    }
    else {
      this.currentUser = new UserInfo();
    }

   }

 
  public register(user: UserForRegister): Observable<void> {

    return this.http.post<void>(this.registerUrl, user);
  }

  public login(user: UserForLogin): Observable<void> {

    return this.http.post<Tokens>(this.loginUrl, user).pipe(map((tokens: Tokens) => {
      
      if(tokens.token && tokens.refreshToken) {
        const decodedToken = this.jwtHelperService.decodeToken(tokens.token);

        this.currentUser.Id = decodedToken[this.userId];
        this.currentUser.Username = decodedToken[this.userName];
        this.currentUser.Role = decodedToken[this.userRole];
        
        localStorage.setItem('token', tokens.token);
        localStorage.setItem('refreshToken', tokens.refreshToken);
        localStorage.setItem('user', JSON.stringify(this.currentUser));
      }
    }));
  }

  public async isAuthenticated(): Promise<boolean> {
    const token: any  = localStorage.getItem('token');
    const refreshToken: any = localStorage.getItem('refreshToken');

    return token&& refreshToken;
  }
  public async isAuthenticatedWithRefreshToken(): Promise<boolean> {
    const token: any  = localStorage.getItem('token');
    const refreshToken: any = localStorage.getItem('refreshToken');

    if(!this.jwtHelperService.isTokenExpired(token) && refreshToken)
    return true;

    let result = false;
    if(token && refreshToken)
    {
      try{
        var res = await this.RefreshToken().toPromise();
        if(res?.token && res.refreshToken)
        result = true;
      } catch{
        result = false;
      }
    }
    
    return result;
  }

  public RefreshToken(): Observable<Tokens> {

    let tokens: Tokens = new Tokens();
    tokens.token = localStorage.getItem('token')?.toString();
    tokens.refreshToken = localStorage.getItem('refreshToken')?.toString();
    
    return this.http.post<Tokens>(this.refreshTokenUrl, tokens).pipe(map((tokens: Tokens) => {
      
      if(tokens.token && tokens.refreshToken) {
        const decodedToken = this.jwtHelperService.decodeToken(tokens.token);

        this.currentUser.Id = decodedToken[this.userId];
        this.currentUser.Username = decodedToken[this.userName];
        this.currentUser.Role = decodedToken[this.userRole];

        localStorage.setItem('token', tokens.token);
        localStorage.setItem('refreshToken', tokens.refreshToken);
        localStorage.setItem('user', JSON.stringify(this.currentUser));
      }

      return tokens;
    }));
  }

  public Logout(): Observable<void> {

    let tokens: Tokens = new Tokens();
    tokens.token = localStorage.getItem('token')?.toString();
    tokens.refreshToken = localStorage.getItem('refreshToken')?.toString();
    
    return this.http.post<Tokens>(this.logoutUrl, tokens).pipe(map(() => {
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      this.currentUser = new UserInfo();
    }));
  }
}
