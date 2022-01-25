import { Component, Input, OnInit, Output , EventEmitter} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AssignedMember } from 'src/app/core/models/task/createTask';
import { TaskWorkerRole } from 'src/app/core/models/task/taskWorkerRoles';
import { WorkspaceMembers } from 'src/app/core/models/workspace/workspaceMembers';
import { TaskService } from 'src/app/core/services/task.service';
import { WorkspaceService } from 'src/app/core/services/workspace.service';
import { DataShareService } from 'src/app/core/services/DataShare.service';
import { WorkspaceInfo } from 'src/app/core/models/workspace/workspaceInfo';
import { mode } from 'src/app/core/types/assignUserMode';
import { ChangeMemberRole } from 'src/app/core/models/task/changeMemberRole';
import { MatDialog } from '@angular/material/dialog';
import { AlertService } from 'src/app/core/services/alerts.service';
import { JoinTaskMember } from 'src/app/core/models/task/joinTaskMember';

@Component({
  selector: 'app-workspace-task-assign',
  templateUrl: './workspace-task-assign.component.html',
  styleUrls: ['./workspace-task-assign.component.css']
})

export class WorkspaceTaskAssignComponent implements OnInit {
  @Input() public assignMembers: AssignedMember[];
  @Input() public mode: mode;
  @Input() public taskId: number;

  public workspaceId: number;
  workspaceMembers: WorkspaceMembers[];
  taskRoles: TaskWorkerRole[];
  userNameValid = false;
  roleValid = false;

  assignForm: FormGroup;
  selectedMember = new WorkspaceMembers();
  selectedRole = new TaskWorkerRole();

  constructor(
    private formBuilder:FormBuilder,
    private dataShare: DataShareService,
    private workspaceService: WorkspaceService,
    private taskServise: TaskService,
    public dialog: MatDialog,
    private alertService: AlertService) {
      this.assignForm = formBuilder.group({
        "userId":["",[Validators.required]],
        "roleTagId":["",[Validators.required]]
      })
   }

  ngOnInit() {
    this.dataShare.workspaceInfo.subscribe((data : WorkspaceInfo) => {
      this.workspaceId = data.id;
    })
    this.workspaceService.getWorkspaceUserList(this.workspaceId)
        .subscribe((data: WorkspaceMembers[]) => {
          this.workspaceMembers = data;
    });

    this.dataShare.taskRoles.subscribe((data: TaskWorkerRole[]) => {
      this.taskRoles = data;
    });
  }

  assignMember() {
    if(this.assignMembers.length < this.workspaceMembers.length && this.assignForm.valid) {

      let assignedMember = new AssignedMember();
        assignedMember.userId = this.selectedMember.id;
        assignedMember.roleTagId = this.selectedRole.id;

        if(this.mode == 'edit task') {
          let joinMember = new JoinTaskMember();
          joinMember.id = this.taskId;
          joinMember.workspaceId = this.workspaceId;
          joinMember.assignedUser = assignedMember;

          this.taskServise.taskMemberJoin(joinMember).subscribe(
            () => {
              this.alertService.successMessage();
              this.assignMembers.unshift(assignedMember);
            },
            err => {
              this.alertService.errorMessage(err);
            }
          );
        }
        else if(this.mode == 'create task') {
          this.assignMembers.unshift(assignedMember);
        }
        this.assignForm.reset();
    }
  }

  changeMemberRole(userId: string,$event : number) {
    if(this.mode == 'edit task') {
      console.log(this.mode);
      let member = {
        taskId : this.taskId,
        workspaceId: this.workspaceId,
        userId: userId,
        roleId: $event
      };
      this.taskServise.changeMemberRole(member).subscribe(
        () => {
          this.alertService.successMessage()
        },
        err => {
          this.alertService.errorMessage(err);
        }
      );
    }
  }

  deAssignMember(i: number, userId: string) {
    if(this.mode == "edit task") {
      this.taskServise.taskDisjoinMember(this.workspaceId,this.taskId,userId).subscribe(
        () => {
          this.alertService.successMessage();
          this.assignMembers.splice(i, 1);
        },
        err => {
          this.alertService.errorMessage(err);
        }
      );
    }
    else if(this.mode == "create task") {
      this.assignMembers.splice(i, 1);
    }
  }

  contains(userId: string) : boolean {
      return this.assignMembers.some(e => e.userId == userId);
  }

  getUserName(id: string) : string {
    if(id && this.workspaceMembers) {
      return this.workspaceMembers[this.workspaceMembers
        .findIndex(x => x.id == id)].userName;
    }
    else {
      return '';
    }
  }
}

