import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AssignedMember, CreateTask } from 'src/app/core/models/task/createTask';
import { TaskStatus } from 'src/app/core/models/task/taskStatus';
import { TaskWorkerRole } from 'src/app/core/models/task/taskWorkerRoles';
import { WorkspaceMembers } from 'src/app/core/models/workspace/workspaceMembers';
import { AlertService } from 'src/app/core/services/alerts.service';
import { TaskService } from 'src/app/core/services/task.service';
import { WorkspaceService } from 'src/app/core/services/workspace.service';

@Component({
  selector: 'app-workspace-task-create',
  templateUrl: './workspace-task-create.component.html',
  styleUrls: ['./workspace-task-create.component.css']
})
export class WorkspaceTaskCreateComponent implements OnInit {
  @Input() public workspaceId: number;
  taskForm: FormGroup;
  createTask: CreateTask = new CreateTask();
  statusList: TaskStatus[];
  selectedStatus: number;

  public assignedMembers: AssignedMember[];
  public isAssignedValid = false;
  id : string;

  constructor(
    private forbBuilder:FormBuilder,
    private alertService: AlertService,
    private workspaceServ: WorkspaceService,
    public dialog: MatDialog,
    private taskServise: TaskService) {
    this.taskForm=forbBuilder.group({
      "Name":["",[Validators.maxLength(50)]],
      "Description":["",[Validators.maxLength(100)]],
      "DateOfEnd":["", ],
      "StatusId": ["",Validators.required]
    })
   }

  ngOnInit() {
    this.createTask.workspaceId = this.workspaceId;

    this.taskServise.getStatusTask().subscribe((statList: TaskStatus[]) => {
      this.statusList = statList;
    });

    this.assignedMembers = [];
  }

  CreateNewTask(): void{
    if(this.taskForm.valid && this.isAssignedValid){
      this.createTask = this.taskForm.value;
      this.createTask.workspaceId = this.workspaceId;
      this.createTask.statusId = this.selectedStatus;
      this.createTask.assignedUsers = this.assignedMembers;
      this.workspaceServ.CreateTask(this.createTask).subscribe(
        () => {
          this.dialog.closeAll();
        },
        err => {
          this.alertService.errorMessage(err);
        }
      );
    }
  }

  checkIsValidAssignedUser(isValid: boolean) {
    this.isAssignedValid = isValid;
  }
}
