import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable} from 'rxjs';
import { DeleteTask } from '../models/task/deleteTask';
import { TaskWorkerRole } from '../models/task/taskWorkerRoles';
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

  private taskRolesSub = new BehaviorSubject<TaskWorkerRole[]>([new TaskWorkerRole()]);
  public taskRoles = this.taskRolesSub.asObservable();

  private taskDeleteSub = new BehaviorSubject<DeleteTask>(new DeleteTask());
  public taskDelete = this.taskDeleteSub.asObservable();

  constructor() { }

  public nextTaskDelete(taskDelete: DeleteTask): void {
    this.taskDeleteSub.next(taskDelete);
  }

  public nextWorkspaceInfo(workspaceInfo: WorkspaceInfo): void {
    this.workspaceInfoSub.next(workspaceInfo);
  }

  public nextWorkspaceRoles(workspaceRoles: WorkspaceRole[]): void {
    this.workspaceRolesSub.next(workspaceRoles);
  }

  public nextTaskRoles(taskRoles: TaskWorkerRole[]): void {
    this.taskRolesSub.next(taskRoles);
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
