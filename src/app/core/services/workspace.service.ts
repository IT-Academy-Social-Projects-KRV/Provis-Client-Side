import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateWorkspace } from '../models/workspace';
import { activeInvitesUrl, addworkspacetUrl, getUserWorkspaceList, inviteUser, workspaceActiveInvite, workspaceDeleteActiveInvite } from 'src/app/configs/api-endpoints';
import { Observable } from 'rxjs';
import { UserWorkspace } from '../models/userWorkspaceList';
import { UserInvite } from '../models/userInvite';
import { UserInvites } from '../models/userInviteList';

@Injectable({
  providedIn: 'root',
})
export class WorkspaceService {

    private readonly getUserWorkspaceList = getUserWorkspaceList;
    private readonly WorkspaceListUrl = addworkspacetUrl;
    private readonly getUserInvite = inviteUser;
    private readonly activeInviteUrl = workspaceActiveInvite;
    private readonly workspaceDeleteActiveInviteUrl = workspaceDeleteActiveInvite;

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

    public WorkspaceInviteInfo(workspaceId: number) {
    return this.http.get<UserInvites[]>(this.activeInviteUrl + workspaceId + "/info", this.httpOption);
    }

    public WorkspaceActiveInviteDelete(id: number, workspaceId: number){
        return this.http.delete<void>(this.workspaceDeleteActiveInviteUrl + workspaceId + "/invite/" + id + "/cancel", this.httpOption);
    }
}
