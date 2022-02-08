import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { commentServiceUrl } from 'src/app/configs/api-endpoints';
import { CommentAttachment } from '../models/comment/commentAttachment';
import { CommentCreate } from '../models/comment/commentCreate';
import { CommentEdit } from '../models/comment/commentEdit';
import { TaskComment } from '../models/comment/taskComment';
import { UploadCommentAttachment } from '../models/comment/uploadCommentAttachment';

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

    public createComment(comment: CommentCreate): Observable<TaskComment>{
        return this.http.post<TaskComment>(this.commentServiceUrl, comment, this.httpOption);
    }

    public deleteComment(commentId: number, workspaceId: number): Observable<void>{
        return this.http.delete<void>(this.commentServiceUrl + commentId + '/workspace/' + workspaceId, this.httpOption);
    }

    public editComment(editComment: CommentEdit): Observable<void>{
        return this.http.put<void>(this.commentServiceUrl, editComment, this.httpOption);
    }

    public getAttachmentList(workspaceId: number, commentId: number): Observable<CommentAttachment[]> {
      return this.http.get<CommentAttachment[]>(this.commentServiceUrl +'comment/'+ commentId + '/workspace/' + workspaceId + '/attachments', this.httpOption);
    }

    public getAttachment(workspaceId: number, attachmentId: number): Observable<File> {

      const options = {
        headers: this.httpOption.headers,
        responseType: 'Blob' as 'json'
      }

      return this.http.get<File>(this.commentServiceUrl + 'comment/workspace/' + workspaceId + '/attachment/'+ attachmentId, options);
    }

    public uploadAttachment(attachment:  UploadCommentAttachment): Observable<CommentAttachment> {
        const formData = new FormData();

        formData.append('attachment', attachment.attachment, attachment.attachment.name);
        formData.append('taskId', attachment.commentId.toString());
        formData.append('workspaceId', attachment.workspaceId.toString());

        return this.http.post<CommentAttachment>(this.commentServiceUrl + 'comment/attachments', formData, this.httpOption);
    }

    public deleteAttachment(workspaceId: number, attachmentId: number): Observable<void> {
      return this.http.delete<void>(this.commentServiceUrl + 'comment/workspace/' + workspaceId + '/attachment/'+ attachmentId, this.httpOption);
    }

    public getAttachmentPreview(workspaceId: number, attachmentId: number): Observable<File> {
      const options = {
        headers: this.httpOption.headers,
        responseType: 'Blob' as 'json'
      }
      return this.http.get<File>(this.commentServiceUrl + 'comment/workspace/' + workspaceId + '/attachment/' + attachmentId + '/preview', options)
    }
}
