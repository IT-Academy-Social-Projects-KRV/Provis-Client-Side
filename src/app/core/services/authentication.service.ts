import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserRegister } from '../models/user/userRegister';
import { map, Observable, of } from 'rxjs';
import { UserLogin } from '../models/user/userLogin';
import { loginUrl,
  logoutUrl,
  refreshTokenUrl,
  registrationUrl,
  twoStepVerificationUrl,
  forgotPasswordUrl,
  resetPasswordUrl } from 'src/app/configs/api-endpoints';
import { UserAuthResponse } from '../models/user/userAuthResponse';
import { UserInfo } from '../models/user/userInfo';
import { UserTwoFactor } from '../models/user/userTwoFactor';
import { Router } from '@angular/router';
import { ForgotPassword } from '../models/user/forgotPassword';
import { ResetPassword } from '../models/user/resetPassword';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private readonly userId: string = 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier';
  private readonly userName: string = 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name';
  private readonly userRole: string = 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role';

  private jwtHelperService = new JwtHelperService();
  private readonly registrationUrl = registrationUrl;
  private readonly loginUrl = loginUrl;
  private readonly refreshTokenUrl = refreshTokenUrl;
  private readonly logoutUrl = logoutUrl;
  private readonly twoStepVerificationUrl = twoStepVerificationUrl;
  private readonly forgotPasswordUrl = forgotPasswordUrl;
  private readonly resetPasswordUrl = resetPasswordUrl;

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


  public register(user: UserRegister): Observable<void> {

    return this.http.post<void>(this.registrationUrl, user);
  }

  public login(user: UserLogin): Observable<void> {

    return this.http.post<UserAuthResponse>(this.loginUrl, user).pipe(map((tokens: UserAuthResponse) => {

      if(tokens.is2StepVerificationRequired && tokens.provider){
        this.router.navigate(["twoStepVerification"], {
          queryParams: {
            provider: tokens.provider,
            email: user.email
          }
        });

        return;
      }

      this.setTokensInLocalStorage(tokens);
    }));
  }

  public twoStepLogin(twoFactor: UserTwoFactor): Observable<void> {
    return this.http.post<UserAuthResponse>(this.twoStepVerificationUrl, twoFactor).pipe(map((tokens: UserAuthResponse) => {

      this.setTokensInLocalStorage(tokens);
    }));
  }

  private setTokensInLocalStorage(tokens: UserAuthResponse){

    if(tokens.token && tokens.refreshToken) {
      const decodedToken = this.jwtHelperService.decodeToken(tokens.token);

      this.currentUser.id = decodedToken[this.userId];
      this.currentUser.username = decodedToken[this.userName];
      this.currentUser.role = decodedToken[this.userRole];

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

  public RefreshToken(): Observable<UserAuthResponse> {

    let tokens: UserAuthResponse = new UserAuthResponse();
    tokens.token = localStorage.getItem('token')?.toString();
    tokens.refreshToken = localStorage.getItem('refreshToken')?.toString();

    return this.http.post<UserAuthResponse>(this.refreshTokenUrl, tokens).pipe(map((tokens: UserAuthResponse) => {

      if(tokens.token && tokens.refreshToken) {
        const decodedToken = this.jwtHelperService.decodeToken(tokens.token);

        this.currentUser.id = decodedToken[this.userId];
        this.currentUser.username = decodedToken[this.userName];
        this.currentUser.role = decodedToken[this.userRole];

        localStorage.setItem('token', tokens.token);
        localStorage.setItem('refreshToken', tokens.refreshToken);
        localStorage.setItem('user', JSON.stringify(this.currentUser));
      }

      return tokens;
    }));
  }

  public Logout(): Observable<void> {

    let tokens: UserAuthResponse = new UserAuthResponse();
    tokens.token = localStorage.getItem('token')?.toString();
    tokens.refreshToken = localStorage.getItem('refreshToken')?.toString();

    return this.http.post<UserAuthResponse>(this.logoutUrl, tokens).pipe(map(() => {
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      this.currentUser = new UserInfo();
    }));
  }

  sendResetPasswordToken(forgotPassword: ForgotPassword): Observable<void>{
    return this.http.get<void>(this.forgotPasswordUrl + forgotPassword.email);
  }

  resetPassword(resetPassword: ResetPassword): Observable<void>{
    return this.http.post<void>(this.resetPasswordUrl, resetPassword);
  }
  
}
