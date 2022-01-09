import { userWorkspaceInfoUrl } from './../../configs/api-endpoints';
import { WorkspaceInfo } from '../models/workspace/workspaceInfo';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { answerInviteUserUrl,
         userInviteList,
         userProfileUrl,
         sendConfirmEmailUrl,
         confirmEmailUrl,
         changeUserInfoUrl,
         checkIsTwoFactorVerificationUrl,
         sendTwoFactorCodeUrl,
         change2fUrl,
         userImageUrl,
         activeInvitesUrl} from 'src/app/configs/api-endpoints';
import { Observable, pipe } from 'rxjs';
import { UserInvite } from '../models/user/userInvite';
import { UserInfoActiveInvites} from '../models/user/userInfoActiveInvites';
import { UserProfile } from '../models/user/userProfile';
import { ConfirmEmailCode } from '../models/user/confirmEmailCode';
import { UserChangeProfile } from '../models/user/userChangeProfile';
import { UserChangeTwoFactor } from '../models/user/userChangeTwoFactor';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly getUserInviteList = userInviteList;
  private readonly answerUserInvite = answerInviteUserUrl;
  private readonly userProfileUrl = userProfileUrl;
  private readonly activeInvitesUrl = activeInvitesUrl;
  private readonly sendConfirmEmailUrl = sendConfirmEmailUrl;
  private readonly confirmEmailUrl = confirmEmailUrl;
  private readonly changeUserInfoUrl = changeUserInfoUrl;
  private readonly checkIsTwoFactorVerificationUrl = checkIsTwoFactorVerificationUrl;
  private readonly changeTwoFacotrUrl = change2fUrl;
  private readonly sendTwoFactorCodeUrl = sendTwoFactorCodeUrl;
  private readonly userImageUrl = userImageUrl;
  private readonly userWorkspaceInfoUrl = userWorkspaceInfoUrl;

  private httpOption = {
    headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.getToken()
    })
  };

  constructor(private http: HttpClient) { }

  getUserProfile(): Observable<UserProfile>{
    return this.http.get<UserProfile>(this.userProfileUrl, this.httpOption);
  }

  getActiveInvites():Observable<UserInfoActiveInvites>{
    return this.http.get<UserInfoActiveInvites>(this.activeInvitesUrl,this.httpOption);
  }

  private getToken(): any{
    return localStorage.getItem('token')?.toString();
  }

  getUserInvite(): Observable<UserInvite[]>{
    return this.http.get<UserInvite[]>(this.getUserInviteList, this.httpOption);
  }

  denyUserInvite(inviteId:number):Observable<void>{
    return this.http.put<void>(this.answerUserInvite+"/"+inviteId+"/deny", {}, this.httpOption);
  }

  acceptUserInvite(inviteId:number):Observable<void>{
    return this.http.put<void>(this.answerUserInvite+"/"+inviteId+"/accept", {}, this.httpOption);
  }

  sendConfirmEmail(){
    return this.http.get<void>(this.sendConfirmEmailUrl, this.httpOption);
  }

  confirmEmail(confirmationCode: ConfirmEmailCode):Observable<void>{
    return this.http.post<void>(this.confirmEmailUrl, confirmationCode, this.httpOption);
  }

  updateUserInfo(changeUserInfo: UserChangeProfile):Observable<void>{
    return this.http.put<void>(this.changeUserInfoUrl, changeUserInfo, this.httpOption);
  }

  changeTwoFactorVerification(status: UserChangeTwoFactor): Observable<void>{
    return this.http.post<void>(this.changeTwoFacotrUrl, status, this.httpOption);
  }

  checkIsTwoFactorVerification(): Observable<boolean>{
    return this.http.get<boolean>(this.checkIsTwoFactorVerificationUrl, this.httpOption);
  }

  sendTwoFactorCode(): Observable<void>{
    return this.http.get<void>(this.sendTwoFactorCodeUrl, this.httpOption);
  }
  
  getUserImage(): Observable<File>{

    const options = {
      headers: this.httpOption.headers,
      responseType: 'Blob' as 'json'
    }

    return this.http.get<File>(this.userImageUrl, options);
  }

  updateUserImage(image: File): Observable<void>{

    const formData = new FormData();
    formData.append('image', image, image.name);

    return this.http.put<void>(this.userImageUrl, formData, this.httpOption);
  }
  
  userWorkspaceInfo(workspaceId:number) :Observable<WorkspaceInfo> {
    return this.http.get<WorkspaceInfo>(this.userWorkspaceInfoUrl + "/" + workspaceId + "/info", this.httpOption)
  }
}
