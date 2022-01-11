import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WorkspaceUpdate } from '../models/workspace/workspaceUpdate';
import { workspaceUrl,
    workspaceServiceUrl,
    workspacesUrl,
    inviteUrl,
    taskUrl,
    changeWorkspaceRoleUrl } from 'src/app/configs/api-endpoints';
import { Observable } from 'rxjs';
import { WorkspaceCard } from '../models/workspace/workspaceCard';
import { InviteToWorkspace } from '../models/workspace/inviteToWorkspace';
import { CreateTask } from '../models/task/createTask';
import { WorkspaceChangeRole } from '../models/workspace/workspaceChangeRole';
import { WorkspaceMembers } from '../models/workspace/workspaceMembers';
import { WorkspaceInfoInvite } from '../models/workspace/workspaceInfoInvite';
import { CreateWorkspace } from '../models/workspace/createWorkspace';

@Injectable({
  providedIn: 'root',
})
export class WorkspaceService {

    private readonly workspacesUrl = workspacesUrl;
    private readonly workspaceUrl = workspaceUrl;
    private readonly inviteUrl = inviteUrl;
    private readonly workspaceServiceUrl = workspaceServiceUrl;
    private readonly taskUrl = taskUrl;
    private readonly changeWorkspaceRoleUrl = changeWorkspaceRoleUrl;

    private httpOption = {
        headers: new HttpHeaders({
            Authorization: 'Bearer ' + this.GetToken()
        })
    }
    constructor(private http: HttpClient) { }

    public CreateWorkspace(workspace: CreateWorkspace): Observable<void> {
        return this.http.post<void>(this.workspaceUrl, workspace, this.httpOption);
    }
    private GetToken(): any{
        return localStorage.getItem('token')?.toString();
    }

    getUserWorkspace(): Observable<WorkspaceCard[]>{
        return this.http.get<WorkspaceCard[]>(this.workspacesUrl, this.httpOption);
    }

    public InviteUser(invite: InviteToWorkspace): Observable<void> {
        return this.http.post<void>(this.inviteUrl, invite, this.httpOption);
    }

    public UpdateWorkspace(workspace: WorkspaceUpdate): Observable<void> {
      return this.http.put<void>(this.workspaceUrl, workspace, this.httpOption);
    }

    public getWorkspaceUserList(workspaceId: number): Observable<WorkspaceMembers[]>{
        return this.http.get<WorkspaceMembers[]>(this.workspacesUrl + "/" + workspaceId + "/members", this.httpOption);
    }

    public delUserFromWorksp(workspaceId: number, userId: string): Observable<void>{
        return this.http.delete<void>(this.workspaceServiceUrl + workspaceId + "/user/" + userId, this.httpOption);
    }

    public WorkspaceInviteInfo(workspaceId: number) {
        return this.http.get<WorkspaceInfoInvite[]>(this.workspaceServiceUrl + workspaceId + "/invite/active", this.httpOption);
    }

    public WorkspaceActiveInviteDelete(id: number, workspaceId: number){
        return this.http.delete<void>(this.workspaceServiceUrl + workspaceId + "/invite/" + id + "/cancel", this.httpOption);
    }

    public CreateTask(task: CreateTask): Observable<void> {
        return this.http.post<void>(this.taskUrl, task, this.httpOption);

    }

    public changeWorkspaceRole(body: WorkspaceChangeRole): Observable<void>{
        return this.http.put<void>(this.changeWorkspaceRoleUrl, body, this.httpOption);
    }
}
