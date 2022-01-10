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
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {

  @Input() public workspaceId: number;
  taskForm: FormGroup;
  createTask: CreateTask = new CreateTask();
  statusList: TaskStatus[];
  taskRole: TaskWorkerRole[];
  selectedStatus: number;

  workspaceMemberList: WorkspaceMembers[];
  public assignedMembers: AssignedMember[];
  id : string;
  demoForm: FormGroup;

  constructor(private workspaceService: WorkspaceService,
    private fb:FormBuilder,
    private alertService: AlertService,
    private ws: WorkspaceService,
    public dialog: MatDialog,
    private taskServise: TaskService) {
    this.taskForm=fb.group({
      "Name":["",[Validators.maxLength(50)]],
      "Description":["",[Validators.maxLength(100)]],
      "DateOfEnd":["", ],
      "StatusId": ["",Validators.required]
    })

    this.demoForm = this.fb.group({
      demoArray: this.fb.array([])
    })
   }

  ngOnInit() {
    this.createTask.workspaceId = this.workspaceId;
    this.workspaceService.getWorkspaceUserList(this.workspaceId).subscribe((data: WorkspaceMembers[]) =>{
      this.workspaceMemberList = data;
    });

    this.taskServise.getStatusTask().subscribe((statList: TaskStatus[]) => {
      this.statusList = statList;
    });

    this.taskServise.getWorkerRole().subscribe((role: TaskWorkerRole[]) => {
      this.taskRole = role;
    })

    this.assignedMembers = [];
  }

  CreateNewTask(): void{
    if(this.assignedMembers.some(e => e.userId == null || e.roleTagId == null))
    {
      this.alertService.errorMessage("Fill all fields");
      return;
    }
    console.log(this.assignedMembers)
    if(this.taskForm.valid){
      this.createTask = this.taskForm.value;
      this.createTask.workspaceId = this.workspaceId;
      this.createTask.statusId = this.selectedStatus;
      this.createTask.assignedUsers = this.assignedMembers;
      this.ws.CreateTask(this.createTask).subscribe(
        () => {
          this.dialog.closeAll();
        },
        err => {
          this.alertService.errorMessage(err);
        }
      );
    }
  }

  AssignMember()
  {
  if(this.assignedMembers.length < this.workspaceMemberList.length)
    this.assignedMembers.unshift(new AssignedMember());
  }

  DeAssignMember(i: number) {
    this.assignedMembers.splice(i, 1);
  }

  Contains(userId: string) : boolean
  {
      return this.assignedMembers.some(e => e.userId == userId);
  }

  Ok()
  {

  }
}
