import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { commentServiceUrl } from 'src/app/configs/api-endpoints';
import { CommentCreate } from '../models/comment/commentCreate';
import { CommentEdit } from '../models/comment/commentEdit';
import { TaskComment } from '../models/comment/taskComment';

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

    public getTaskComments(taskId: number, workspaceId: number): Observable<TaskComment[]>{
        return this.http.get<TaskComment[]>(this.commentServiceUrl + taskId + '/workspace/' + workspaceId, this.httpOption);
    }

    public createComment(comment: CommentCreate): Observable<void>{
        return this.http.post<void>(this.commentServiceUrl, comment, this.httpOption);
    }

    public deleteComment(commentId: number, workspaceId: number): Observable<void>{
        return this.http.delete<void>(this.commentServiceUrl + commentId + '/workspace/' + workspaceId, this.httpOption);
    }

    public editComment(editComment: CommentEdit): Observable<void>{
        return this.http.put<void>(this.commentServiceUrl, editComment, this.httpOption);
    }
}
