import { Tasks } from '../models/task/tasks';
import { Observable } from 'rxjs';
import { statusesUrl, rolesUrl, taskServiceUrl, taskUrl } from './../../configs/api-endpoints';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TaskStatus } from '../models/task/taskStatus';
import { TaskWorkerRole } from '../models/task/taskWorkerRoles';
import { TaskAttachment } from '../models/task/taskAttachment';
import { UnloadTaskAttachments } from '../models/task/uploadTaskAttachments';
import { TaskDetalInfo } from '../models/task/taskDetalInfo';
import { TaskChangeInfo } from '../models/task/taskChangeInfo';

@Injectable({
  providedIn: 'root',
})

export class TaskService {

  private readonly taskServiceUrl = taskServiceUrl;
  private readonly statusesUrl = statusesUrl;
  private readonly rolesUrl = rolesUrl;
  private readonly taskUrl = taskUrl;

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
    return this.http.get<{tasks: Tasks, userId: string}>(this.taskServiceUrl + 'tasks?userId='  + userId + '&workspaceId=' + workspaceId, this.httpOption);
  }

  public updateStatusTask(data:{workspaceId: number, statusId: number, taskId: number}):Observable<void>{
    return this.http.put<void>(this.taskServiceUrl + 'status', data, this.httpOption);
  }

  getStatusTask() {
    return this.http.get<TaskStatus[]>(this.statusesUrl, this.httpOption);
  }

  getWorkerRole(){
    return this.http.get<TaskWorkerRole[]>(this.rolesUrl, this.httpOption);
  }

  getAttachmentList(workspaceId: number, taskId: number): Observable<TaskAttachment[]> {

    return this.http.get<TaskAttachment[]>(this.taskServiceUrl + taskId + '/workspace/' + workspaceId + '/attachments', this.httpOption);
  }

  getAttachment(workspaceId: number, attachmentId: number): Observable<File> {

    const options = {
      headers: this.httpOption.headers,
      responseType: 'Blob' as 'json'
    }

    return this.http.get<File>(this.taskServiceUrl + '/workspace/' + workspaceId + '/attachment'+ attachmentId, options);
  }

  uploadAttachmentList(attachmentList: UnloadTaskAttachments): Observable<void> {

    return this.http.put<void>(this.taskServiceUrl + 'atachments', attachmentList, this.httpOption);
  }

  deleteAttachment(workspaceId: number, attachmentId: number): Observable<void> {

    return this.http.delete<void>(this.taskServiceUrl + '/workspace/' + workspaceId + '/attachment'+ attachmentId, this.httpOption);
  }
  public getTaskInfo(taskId: number):Observable<TaskDetalInfo>{
    return this.http.get<TaskDetalInfo>(this.taskUrl + "/" + taskId, this.httpOption);
  }

  public editTask(taskChangeInfo: TaskChangeInfo):Observable<void>{
    return this.http.put<void>(this.taskUrl, taskChangeInfo, this.httpOption);
  }
}
