import { Injectable } from '@angular/core';
import { BehaviorSubject, map, mergeMap, Observable, Subject, switchMap } from 'rxjs';
import { WorkspaceInfo } from '../models/workspace/workspaceInfo';
import { WorkspaceRole } from '../models/workspace/workspaceRole';

@Injectable({
  providedIn: 'root'
})

export class DataShareService {

  private workspaceInfoSub = new BehaviorSubject<WorkspaceInfo>(new WorkspaceInfo());
  public workspaceInfo = this.workspaceInfoSub.asObservable();

  private workspaceRolesSub = new BehaviorSubject<WorkspaceRole[]>([new WorkspaceRole()]);
  public workspaceRoles = this.workspaceRolesSub.asObservable();

  constructor() { }

  public nextWorkspaceInfo(workspaceInfo: WorkspaceInfo): void {
    this.workspaceInfoSub.next(workspaceInfo);
  }

  public nextWorkspaceRoles(workspaceRoles: WorkspaceRole[]): void {
    this.workspaceRolesSub.next(workspaceRoles);
  }

  public getworkspaceRoleName(roleId: number): Observable<string> {
    return this.workspaceRoles.pipe(map(data => {
      if(roleId){
        return data[data.findIndex(x => x.id == roleId)].name;
      }
      else{
        return "";
      }
    }));
  }
}
