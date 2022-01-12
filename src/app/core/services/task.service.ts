import { Tasks } from '../models/task/tasks';
import { Observable } from 'rxjs';
import { getTaskStatuses, getTaskWorkerRoles, userTaskUrl } from './../../configs/api-endpoints';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TaskStatus } from '../models/task/taskStatus';
import { TaskWorkerRole } from '../models/task/taskWorkerRoles';


@Injectable({
  providedIn: 'root',
})

export class TaskService {

  private readonly userTaskUrl = userTaskUrl;
  private readonly taskStatusesUrl = getTaskStatuses;
  private readonly workerRoleUrl = getTaskWorkerRoles;

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

  getStatusTask() {
    return this.http.get<TaskStatus[]>(this.taskStatusesUrl, this.httpOption);
  }

  getWorkerRole(){
    return this.http.get<TaskWorkerRole[]>(this.workerRoleUrl, this.httpOption);
  }
}
