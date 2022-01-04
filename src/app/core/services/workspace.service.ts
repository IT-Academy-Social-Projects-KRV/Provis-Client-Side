import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateWorkspace } from '../models/workspace';
import { UpdateWorkspace } from '../models/workspaceUpdate';
import { WorkspaceInviteInfo } from '../models/WorkspaceInviteInfo';
import { CreateTask } from '../models/createTask';
import { addworkspacetUrl, deleteUserFromWorkspaseUrl, getUserWorkspaceList, getWorkspaceUsersUrl, inviteUser, addTaskUrl, workspaceActiveInvite, updateWorkspaceUrl } from 'src/app/configs/api-endpoints';
import { Observable } from 'rxjs';
import { UserWorkspace } from '../models/userWorkspaceList';
import { UserInvite } from '../models/userInvite';
import { WorkspaceMembers } from '../models/workspaceUsersList';

@Injectable({
  providedIn: 'root',
})
export class WorkspaceService {

    private readonly getUserWorkspaceList = getUserWorkspaceList;
    private readonly WorkspaceListUrl = addworkspacetUrl;
    private readonly getUserInvite = inviteUser;
    private readonly updateWorkspaceUrl = updateWorkspaceUrl;

    private readonly activeInviteUrl = workspaceActiveInvite;
    private readonly createTaskUrl = addTaskUrl;
    private readonly getWorkspaceUsers = getWorkspaceUsersUrl;
    private readonly delUserWorksp = deleteUserFromWorkspaseUrl;
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

    getUserWorkspace(): Observable<UserWorkspace[]>{
        return this.http.get<UserWorkspace[]>(this.getUserWorkspaceList, this.httpOption);
    }

    public InviteUser(invite: UserInvite): Observable<void> {
        return this.http.post<void>(this.getUserInvite, invite, this.httpOption);
    }

    public UpdateWorkspace(workspace: UpdateWorkspace): Observable<void> {
      return this.http.put<void>(this.updateWorkspaceUrl, workspace, this.httpOption);
    }

    public WorkspaceInviteInfo(workspaceId: number) {
        return this.http.get<WorkspaceInviteInfo[]>(this.activeInviteUrl + workspaceId + "/invite/active", this.httpOption);
    }

    public WorkspaceActiveInviteDelete(id: number, workspaceId: number){
        return this.http.delete<void>(this.activeInviteUrl + workspaceId + "/invite/" + id + "/cancel", this.httpOption);
    }

    public CreateTask(task: CreateTask): Observable<void> {
        return this.http.post<void>(this.createTaskUrl, task, this.httpOption);
    }

    public getWorkspaceUserList(workspaceId: number): Observable<WorkspaceMembers[]>{
        return this.http.get<WorkspaceMembers[]>(this.getWorkspaceUsers+"/"+workspaceId+"/members", this.httpOption);
    }

    public delUserFromWorksp(workspaceId: number, userId: string): Observable<void>{
        return this.http.delete<void>(this.delUserWorksp+"/"+workspaceId+"/user/"+userId, this.httpOption);
    }
}
