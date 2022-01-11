import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WorkspaceUpdate } from '../models/workspace/workspaceUpdate';
import { addworkspacetUrl, deleteUserFromWorkspaseUrl, getUserWorkspaceList, getWorkspaceUsersUrl, inviteUser, workspaceActiveInvite, addTaskUrl, changeWorkspaceRoleUrl, updateWorkspaceUrl } from 'src/app/configs/api-endpoints';
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

    private readonly getUserWorkspaceList = getUserWorkspaceList;
    private readonly WorkspaceListUrl = addworkspacetUrl;
    private readonly getUserInvite = inviteUser;
    private readonly updateWorkspaceUrl = updateWorkspaceUrl;
    private readonly getWorkspaceUsers = getWorkspaceUsersUrl;
    private readonly delUserWorksp = deleteUserFromWorkspaseUrl;
    private readonly activeInviteUrl = workspaceActiveInvite;
    private readonly createTaskUrl = addTaskUrl;
    private readonly changeWorkspaceRoleUrl = changeWorkspaceRoleUrl;

    private httpOption = {
        headers: new HttpHeaders({
            Authorization: 'Bearer ' + this.GetToken()
        })
    }
    constructor(private http: HttpClient) { }

    public CreateWorkspace(workspace: CreateWorkspace): Observable<void> {
        return this.http.post<void>(this.WorkspaceListUrl, workspace, this.httpOption);
    }
    private GetToken(): any{
        return localStorage.getItem('token')?.toString();
    }

    getUserWorkspace(): Observable<WorkspaceCard[]>{
        return this.http.get<WorkspaceCard[]>(this.getUserWorkspaceList, this.httpOption);
    }

    public InviteUser(invite: InviteToWorkspace): Observable<void> {
        return this.http.post<void>(this.getUserInvite, invite, this.httpOption);
    }

    public UpdateWorkspace(workspace: WorkspaceUpdate): Observable<void> {
      return this.http.put<void>(this.updateWorkspaceUrl, workspace, this.httpOption);
    }

    public getWorkspaceUserList(workspaceId: number): Observable<WorkspaceMembers[]>{
        return this.http.get<WorkspaceMembers[]>(this.getWorkspaceUsers+"/"+workspaceId+"/members", this.httpOption);
    }

    public delUserFromWorksp(workspaceId: number, userId: string): Observable<void>{
        return this.http.delete<void>(this.delUserWorksp+"/"+workspaceId+"/user/"+userId, this.httpOption);
    }

    public leaveFromWorkspace(workspaceId: number): Observable<void>{
        return this.http.delete<void>(this.delUserWorksp+"/"+workspaceId+"/user", this.httpOption);
    }

    public WorkspaceInviteInfo(workspaceId: number) {
        return this.http.get<WorkspaceInfoInvite[]>(this.activeInviteUrl + workspaceId + "/invite/active", this.httpOption);
    }

    public WorkspaceActiveInviteDelete(id: number, workspaceId: number){
        return this.http.delete<void>(this.activeInviteUrl + workspaceId + "/invite/" + id + "/cancel", this.httpOption);
    }

    public CreateTask(task: CreateTask): Observable<void> {
        return this.http.post<void>(this.createTaskUrl, task, this.httpOption);
    }

    public changeWorkspaceRole(body: WorkspaceChangeRole): Observable<void>{
        return this.http.put<void>(this.changeWorkspaceRoleUrl, body, this.httpOption);
    }
}
