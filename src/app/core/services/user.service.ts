import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, pipe } from 'rxjs';
import { answerInviteUserUrl, userInviteList, userProfileUrl, sendConfirmEmailUrl, confirmEmailUrl } from 'src/app/configs/api-endpoints';
import { UserInvite } from '../models/userInviteList';
import { activeInvitesUrl } from 'src/app/configs/api-endpoints';
import { ActiveInvites} from '../models/activeInvites';
import { UserProfile } from '../models/userProfile';
import { ConfirmEmailCode } from '../models/confirmEmailCode';

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

  private httpOption = {
    headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.getToken()
    })
  };

  constructor(private http: HttpClient) { }

  getUserProfile(): Observable<UserProfile>{
    return this.http.get<UserProfile>(this.userProfileUrl, this.httpOption);
  }

  getActiveInvites():Observable<ActiveInvites>{
    return this.http.get<ActiveInvites>(this.activeInvitesUrl,this.httpOption);
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
}
