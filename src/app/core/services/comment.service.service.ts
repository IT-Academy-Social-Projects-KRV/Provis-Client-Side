import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { commentServiceUrl } from 'src/app/configs/api-endpoints';
import { TaskComment } from '../models/task/taskComment';

@Injectable()
export class CommentService {

    private readonly commentServiceUrl = commentServiceUrl;

    private httpOption = {
        headers: new HttpHeaders({
            Authorization: 'Bearer ' + this.getToken()
        })
      };

    constructor(private http: HttpClient) { }

    private getToken(): any{
        return localStorage.getItem('token')?.toString();
    }

    public getTaskComments(taskId: number, workspaceId: number){
        return this.http.get<TaskComment[]>(this.commentServiceUrl + taskId + '/workspace/' + workspaceId, this.httpOption);
    }
}
