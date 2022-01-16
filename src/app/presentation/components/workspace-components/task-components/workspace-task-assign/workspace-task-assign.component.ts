import { Component, Input, OnInit, Output , EventEmitter} from '@angular/core';
import { FormBuilder, NgForm} from '@angular/forms';
import { AssignedMember } from 'src/app/core/models/task/createTask';
import { TaskWorkerRole } from 'src/app/core/models/task/taskWorkerRoles';
import { WorkspaceMembers } from 'src/app/core/models/workspace/workspaceMembers';
import { TaskService } from 'src/app/core/services/task.service';
import { WorkspaceService } from 'src/app/core/services/workspace.service';
import { AlertService } from 'src/app/core/services/alerts.service';

@Component({
  selector: 'app-workspace-task-assign',
  templateUrl: './workspace-task-assign.component.html',
  styleUrls: ['./workspace-task-assign.component.css']
})

export class WorkspaceTaskAssignComponent implements OnInit {
  @Input() public workspaceId: number;
  @Input() public assignMembers: AssignedMember[];
  @Output() public isValid = new EventEmitter<boolean>(false);

  workspaceMembers: WorkspaceMembers[];
  taskRoles: TaskWorkerRole[];
  userNameValid = false;
  roleValid = false;

  constructor(
    private formBuilder:FormBuilder,
    private workspaceService: WorkspaceService,
    private taskServise: TaskService,
    private alertService: AlertService) {
   }

  ngOnInit() {
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
