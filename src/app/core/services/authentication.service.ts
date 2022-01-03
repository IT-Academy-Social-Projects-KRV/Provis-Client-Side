import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserForRegister } from '../models/userForRegister';
import { map, Observable } from 'rxjs';
import { UserForLogin } from '../models/userForLogin';
import { loginUrl, logoutUrl, refreshTokenUrl, registerUrl, twoStepVerificationUrl } from 'src/app/configs/api-endpoints';
import { AuthResponse } from '../models/authResponse';
import { UserInfo } from '../models/userInfo';
import { TwoFactorDTO } from '../models/twoFactorDTO';
import { Router } from '@angular/router';

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
  private readonly twoStepLoginUrl = twoStepVerificationUrl;

  public currentUser: UserInfo;

  constructor(private http: HttpClient, private router: Router) {
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

    return this.http.post<AuthResponse>(this.loginUrl, user).pipe(map((tokens: AuthResponse) => {

      if(tokens.is2StepVerificationRequired && tokens.provider){
        this.router.navigate(["twoStepVerification"], {
          queryParams: {
            provider: tokens.provider,
            email: user.Email
          }
        });

        localStorage.setItem('isTwoFactor', String(tokens.is2StepVerificationRequired));
        localStorage.setItem('provider', tokens.provider);

        return;
      }

      this.setTokensInLocalStorage(tokens);
    }));
  }

  public twoStepLogin(twoFactor: TwoFactorDTO): Observable<void> {

    return this.http.post<AuthResponse>(this.twoStepLoginUrl, twoFactor).pipe(map((tokens: AuthResponse) => {

      this.setTokensInLocalStorage(tokens);
    }));
  }

  private setTokensInLocalStorage(tokens: AuthResponse){

    if(tokens.token && tokens.refreshToken) {
      const decodedToken = this.jwtHelperService.decodeToken(tokens.token);

      this.currentUser.Id = decodedToken[this.userId];
      this.currentUser.Username = decodedToken[this.userName];
      this.currentUser.Role = decodedToken[this.userRole];

      localStorage.setItem('token', tokens.token);
      localStorage.setItem('refreshToken', tokens.refreshToken);
      localStorage.setItem('user', JSON.stringify(this.currentUser));

      this.router.navigate(['user/workspaces']);
    }
  }

  public async isAuthenticated(): Promise<boolean> {
    const token: any  = localStorage.getItem('token');
    const refreshToken: any = localStorage.getItem('refreshToken');

    return token && refreshToken;
  }

  public async isTwoFactorAuthentucation(): Promise<boolean>{
    const isTwoFacotr: any = localStorage.getItem('isTwoFactor');
    const provider: any = localStorage.getItem('provider');

    return Boolean(isTwoFacotr) && provider;
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

  public RefreshToken(): Observable<AuthResponse> {

    let tokens: AuthResponse = new AuthResponse();
    tokens.token = localStorage.getItem('token')?.toString();
    tokens.refreshToken = localStorage.getItem('refreshToken')?.toString();

    return this.http.post<AuthResponse>(this.refreshTokenUrl, tokens).pipe(map((tokens: AuthResponse) => {

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

    let tokens: AuthResponse = new AuthResponse();
    tokens.token = localStorage.getItem('token')?.toString();
    tokens.refreshToken = localStorage.getItem('refreshToken')?.toString();

    return this.http.post<AuthResponse>(this.logoutUrl, tokens).pipe(map(() => {
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      this.currentUser = new UserInfo();
    }));
  }
}
