import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateWorkspace } from '../models/workspace';
import { addworkspacetUrl, getUserWorkspaceList } from 'src/app/configs/api-endpoints';
import { Observable } from 'rxjs';
import { UserWorkspace } from '../models/userWorkspaceList';

@Injectable({
  providedIn: 'root',
})
export class WorkspaceService {

    private readonly getUserWorkspaceList = getUserWorkspaceList;
    private readonly WorkspaceListUrl = addworkspacetUrl;

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
}
