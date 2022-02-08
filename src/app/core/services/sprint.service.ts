import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { sprintServiceUrl } from 'src/app/configs/api-endpoints';
import { ChangeSprint } from '../models/sprint/addSprint';
import { SprintDetailInfo } from '../models/sprint/SprintDetailInfo';
import { SprintInfo } from '../models/sprint/sprintInfo';

@Injectable({
  providedIn: 'root'
})
export class SprintService {

  private readonly sprintServiceUrl = sprintServiceUrl + '/workspace/';

  private httpOption = {
    headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.getToken()
    })
  };

  constructor(private http: HttpClient) { }

  private getToken(): any{
    return localStorage.getItem('token')?.toString();
  }

  public getSprintList(workspaceId: number): Observable<SprintInfo[]>{
    return this.http.get<SprintInfo[]>(this.sprintServiceUrl + workspaceId + '/sprints', this.httpOption);
  }

  public addSprint(workspaceId: number, model: ChangeSprint): Observable<SprintInfo>{
    return this.http.post<SprintInfo>(this.sprintServiceUrl + workspaceId, model, this.httpOption);
  }

  public updateSprint(workspaceId: number, sprintId: number, model: ChangeSprint): Observable<void>{
    return this.http.put<void>(this.sprintServiceUrl + workspaceId + '/sprint/' + sprintId, model, this.httpOption);
  }

  public GetDetailSprintInfo(workspaceId: number, sprintId: number): Observable<SprintDetailInfo>{
    return this.http.get<SprintDetailInfo>(this.sprintServiceUrl + workspaceId + '/sprint/' + sprintId, this.httpOption);
  }

}
