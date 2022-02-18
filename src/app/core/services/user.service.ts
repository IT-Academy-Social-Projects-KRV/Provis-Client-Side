import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { inviteUrl,
         invitesUrl,
         infoUrl,
         confirmEmailUrl,
         twoFactorVerificationUrl,
         twoFactorCodeUrl,
         imageUrl,
         activeInviteUrl,
         userpasswordUrl} from 'src/app/configs/api-endpoints';
import { Observable} from 'rxjs';
import { UserInvite } from '../models/user/userInvite';
import { UserInfoActiveInvites} from '../models/user/userInfoActiveInvites';
import { UserProfile } from '../models/user/userProfile';
import { ConfirmEmailCode } from '../models/user/confirmEmailCode';
import { UserChangeProfile } from '../models/user/userChangeProfile';
import { UserChangeTwoFactor } from '../models/user/userChangeTwoFactor';
import { SetPassword } from '../models/user/setPassword';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly invitesUrl = invitesUrl;
  private readonly inviteUrl = inviteUrl;
  private readonly infoUrl = infoUrl;
  private readonly activeInviteUrl = activeInviteUrl;
  private readonly confirmEmailUrl = confirmEmailUrl;
  private readonly twoFactorVerificationUrl = twoFactorVerificationUrl;
  private readonly twoFactorCodeUrl = twoFactorCodeUrl;
  private readonly imageUrl = imageUrl;
  private readonly userpasswordUrl = userpasswordUrl;

  private httpOption = {
    headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.getToken()
    })
  };

  constructor(private http: HttpClient) { }

  getUserProfile(): Observable<UserProfile>{
    return this.http.get<UserProfile>(this.infoUrl, this.httpOption);
  }

  getActiveInvites():Observable<UserInfoActiveInvites>{
    return this.http.get<UserInfoActiveInvites>(this.activeInviteUrl,this.httpOption);
  }

  private getToken(): any{
    return localStorage.getItem('token')?.toString();
  }

  getUserInvite(): Observable<UserInvite[]>{
    return this.http.get<UserInvite[]>(this.invitesUrl, this.httpOption);
  }

  denyUserInvite(inviteId:number):Observable<void>{
    return this.http.put<void>(this.inviteUrl + "/" + inviteId + "/deny", {}, this.httpOption);
  }

  acceptUserInvite(inviteId:number):Observable<void>{
    return this.http.put<void>(this.inviteUrl + "/" + inviteId + "/accept", {}, this.httpOption);
  }

  sendConfirmEmail(){
    return this.http.get<void>(this.confirmEmailUrl, this.httpOption);
  }

  confirmEmail(confirmationCode: ConfirmEmailCode):Observable<void>{
    return this.http.post<void>(this.confirmEmailUrl, confirmationCode, this.httpOption);
  }

  updateUserInfo(changeUserInfo: UserChangeProfile):Observable<void>{
    return this.http.put<void>(this.infoUrl, changeUserInfo, this.httpOption);
  }

  changeTwoFactorVerification(status: UserChangeTwoFactor): Observable<void>{
    return this.http.post<void>(this.twoFactorVerificationUrl, status, this.httpOption);
  }

  checkIsTwoFactorVerification(): Observable<boolean>{
    return this.http.get<boolean>(this.twoFactorVerificationUrl, this.httpOption);
  }

  sendTwoFactorCode(): Observable<void>{
    return this.http.get<void>(this.twoFactorCodeUrl, this.httpOption);
  }

  getUserImage(): Observable<File>{

    const options = {
      headers: this.httpOption.headers,
      responseType: 'Blob' as 'json'
    }

    return this.http.get<File>(this.imageUrl, options);
  }

  updateUserImage(image: File): Observable<void>{

    const formData = new FormData();
    formData.append('image', image, image.name);

    return this.http.put<void>(this.imageUrl, formData, this.httpOption);
  }

  setPassword(setPassword: SetPassword): Observable<void>{
    return this.http.post<void>(this.userpasswordUrl, setPassword, this.httpOption);
  }

  checkPassword(): Observable<boolean>{
    return this.http.get<boolean>(this.userpasswordUrl + "/check", this.httpOption);
  }
}
