import { Tasks } from './../models/tasks';
import { Observable } from 'rxjs';
import { userTaskUrl } from './../../configs/api-endpoints';
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

  getUserTask(userId: string, workspaceId: number): Observable<{tasks: Tasks, userId: string}>{
    return this.http.get<{tasks: Tasks, userId: string}>(this.userTaskUrl + 'tasks?userId='  + userId + '&workspaceId=' + workspaceId, this.httpOption);
  }

  public updateStatusTask(data:{workspaceId: number, statusId: number, taskId: number}):Observable<void>{
    return this.http.put<void>(this.userTaskUrl + 'status', data, this.httpOption);
  }
}