import { Injectable } from '@angular/core';
import { map, mergeMap, Observable, Subject, switchMap } from 'rxjs';
import { WorkspaceInfo } from '../models/workspace/workspaceInfo';
import { WorkspaceRole } from '../models/workspace/workspaceRole';

@Injectable({
  providedIn: 'root'
})
export class DataShareService {

  public workspaceInfo = new Subject<WorkspaceInfo>();
  public work = this.workspaceInfo.asObservable();
  public workspaceRoles = new Subject<WorkspaceRole[]>();

  constructor() { }

  public getWorkspaceRoleName(roleId: number): Observable<string> {
    return this.workspaceRoles.asObservable().pipe(map(data=>{
      console.log(roleId);
      return data[data.findIndex(x=>x.id == roleId)].name;
    }));
  }
}
