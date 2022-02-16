import { usersTasks } from './../models/task/tasks';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable} from 'rxjs';
import { DeleteTask } from '../models/task/deleteTask';
import { TaskWorkerRole } from '../models/task/taskWorkerRoles';
import { WorkspaceInfo } from '../models/workspace/workspaceInfo';
import { WorkspaceRole } from '../models/workspace/workspaceRole';
import { CreateTask } from '../models/task/createTask';
import { TaskChangeInfo } from '../models/task/taskChangeInfo';
import { AddTask } from '../models/task/addTask';


@Injectable({
  providedIn: 'root'
})

export class DataShareService {

  public currentTask: AddTask;

  private workspaceInfoSub = new BehaviorSubject<WorkspaceInfo>(new WorkspaceInfo());
  public workspaceInfo = this.workspaceInfoSub.asObservable();

  private workspaceRolesSub = new BehaviorSubject<WorkspaceRole[]>([new WorkspaceRole()]);
  public workspaceRoles = this.workspaceRolesSub.asObservable();

  private taskRolesSub = new BehaviorSubject<TaskWorkerRole[]>([new TaskWorkerRole()]);
  public taskRoles = this.taskRolesSub.asObservable();

  private taskDeleteSub = new BehaviorSubject<DeleteTask>(new DeleteTask());
  public taskDelete = this.taskDeleteSub.asObservable();

  private taskAddSub = new BehaviorSubject<AddTask>(new AddTask());
  public taskAdd = this.taskAddSub.asObservable();

  private taskCreateSub = new BehaviorSubject<CreateTask>(new CreateTask());
  public taskCreate = this.taskCreateSub.asObservable();

  private taskUpdateSub = new BehaviorSubject<TaskChangeInfo>(new TaskChangeInfo());
  public taskUpdate = this.taskUpdateSub.asObservable();

  private usersTasksSub = new BehaviorSubject<usersTasks>(new usersTasks());
  public usersTasks = this.usersTasksSub.asObservable();
  
  private emailSub = new BehaviorSubject<string>("");
  public email = this.emailSub.asObservable();

  constructor() { }

  public nextEmail(email: string): void {
    this.emailSub.next(email);
  }
  
  public nextUsersTasks(usersTasks: usersTasks): void {
    this.usersTasksSub.next(usersTasks);
  }

  public nextTaskUpdate(taskUpdate: TaskChangeInfo): void {
    this.taskUpdateSub.next(taskUpdate);
  }

  public nextTaskCreate(taskCreate: CreateTask): void {
    this.taskCreateSub.next(taskCreate);
  }

  public nextTaskAdd(taskAdd: AddTask): void {
    this.taskAddSub.next(taskAdd);
  }

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
