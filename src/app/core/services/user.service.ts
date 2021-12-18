import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, pipe } from 'rxjs';
import { userProfileUrl } from 'src/app/configs/api-endpoints';
import { UserProfile } from '../models/userProfile';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly userProfileUrl = userProfileUrl;

  private httpOption = {
    headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.getToken()
    })
  };

  constructor(private http: HttpClient) { }

  getUserPrifile(): Observable<UserProfile>{
    return this.http.get<UserProfile>(this.userProfileUrl, this.httpOption);
  }

  private getToken(): any{
    return localStorage.getItem('token')?.toString();
  }
}
