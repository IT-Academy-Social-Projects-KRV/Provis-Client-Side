import { Observable } from 'rxjs';
import { userTaskUrl } from './../../configs/api-endpoints';
import { UserTask } from './../models/userTask';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root',
})

export class TaskService {


  private readonly userTaskUrl = userTaskUrl;

  private httpOption = {
    headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.getToken()
    })
  };

  constructor(private http: HttpClient) { }

  private getToken(): any{
    return localStorage.getItem('token')?.toString();
  }

  getUserTask(): Observable<UserTask[]>{
    return this.http.get<UserTask[]>(this.userTaskUrl, this.httpOption);
  }
    
}
