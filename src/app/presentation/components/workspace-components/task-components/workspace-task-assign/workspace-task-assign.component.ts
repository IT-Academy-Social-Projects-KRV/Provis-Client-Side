import { Component, Input, OnInit, Output , EventEmitter} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AssignedMember } from 'src/app/core/models/task/createTask';
import { TaskWorkerRole } from 'src/app/core/models/task/taskWorkerRoles';
import { WorkspaceMembers } from 'src/app/core/models/workspace/workspaceMembers';
import { TaskService } from 'src/app/core/services/task.service';
import { WorkspaceService } from 'src/app/core/services/workspace.service';
import { DataShareService } from 'src/app/core/services/DataShare.service';
import { WorkspaceInfo } from 'src/app/core/models/workspace/workspaceInfo';

@Component({
  selector: 'app-workspace-task-assign',
  templateUrl: './workspace-task-assign.component.html',
  styleUrls: ['./workspace-task-assign.component.css']
})

export class WorkspaceTaskAssignComponent implements OnInit {
  @Input() public assignMembers: AssignedMember[];
  @Output() public isValid = new EventEmitter<boolean>(false);

  public workspaceId: number;
  workspaceMembers: WorkspaceMembers[];
  taskRoles: TaskWorkerRole[];
  userNameValid = false;
  roleValid = false; 

  constructor(
    private dataShare: DataShareService,
    private workspaceService: WorkspaceService,
    private taskServise: TaskService) {
   }

  ngOnInit() {
    this.dataShare.workspaceInfo.subscribe((data : WorkspaceInfo) => {
      this.workspaceId = data.id;
    })
    this.workspaceService.getWorkspaceUserList(this.workspaceId).subscribe((data: WorkspaceMembers[]) =>{
      this.workspaceMembers = data;
    });
    this.taskServise.getWorkerRole().subscribe((role: TaskWorkerRole[]) => {
      this.taskRoles = role;
    });
  }

  assignMember()
  {
    if(this.assignMembers.length < this.workspaceMembers.length)
    {
        this.assignMembers.unshift(new AssignedMember());
        this.userNameValid = false;
        this.roleValid = false;
        this.isValid.next(false);
    }
  }

  deAssignMember(i: number) {
    this.assignMembers.splice(i, 1);
  }

  contains(userId: string) : boolean
  {
      return this.assignMembers.some(e => e.userId == userId);
  }

  changeUserNameIsValid(isValid: boolean | null){
    if(isValid)
    {
      this.userNameValid = isValid;
      this.isValid.next(this.userNameValid && this.roleValid);
    }  
  }

  changeRoleIsValid(isValid: boolean | null){
    if(isValid)
    {
      this.roleValid = isValid;
      this.isValid.next(this.userNameValid && this.roleValid);
    }
  }
}
