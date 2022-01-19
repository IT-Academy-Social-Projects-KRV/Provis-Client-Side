import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AssignedMember, TaskDetalInfo } from 'src/app/core/models/task/taskDetalInfo';
import { TaskChangeInfo } from 'src/app/core/models/task/taskChangeInfo';
import { TaskStatus } from 'src/app/core/models/task/taskStatus';
import { TaskWorkerRole } from 'src/app/core/models/task/taskWorkerRoles';
import { WorkspaceMembers } from 'src/app/core/models/workspace/workspaceMembers';
import { AlertService } from 'src/app/core/services/alerts.service';
import { TaskService } from 'src/app/core/services/task.service';
import { WorkspaceService } from 'src/app/core/services/workspace.service';
import { mode } from 'src/app/core/types/assignUserMode';

@Component({
  selector: 'app-workspace-task-edit',
  templateUrl: './workspace-task-edit.component.html',
  styleUrls: ['./workspace-task-edit.component.css']
})
export class WorkspaceTaskEditComponent implements OnInit {

  @Input() public taskId: number;
  @Input() public workspaceId: number;
  detalInfoForm: FormGroup;
  detalInfo: TaskDetalInfo = new TaskDetalInfo();
  taskChangeInfo: TaskChangeInfo;
  statusList: TaskStatus[];
  taskRole: TaskWorkerRole[];
  selectedStatus: number;
  deadLine: Date;

  assignUserMode: mode = 'edit task';
  workspaceMemberList: WorkspaceMembers[];
  assignedMembers: AssignedMember[];
  id: string;

  constructor(private workspaceService: WorkspaceService,
    private forbBuilder: FormBuilder,
    private alertService: AlertService,
    private workspaceServ: WorkspaceService,
    public dialog: MatDialog,
    private taskServise: TaskService) {
    this.detalInfoForm = forbBuilder.group({
      "Name": ["", [Validators.maxLength(50)]],
      "Description": ["", [Validators.maxLength(100)]],
      "DateOfEnd": ["",],
      "StatusId": ["", Validators.required]
    })
  }

  ngOnInit() {
    this.workspaceService.getWorkspaceUserList(this.workspaceId).subscribe((data: WorkspaceMembers[]) => {
      this.workspaceMemberList = data;
    });

    this.taskServise.getStatusTask().subscribe((statList: TaskStatus[]) => {
      this.statusList = statList;
    });

    this.taskServise.getWorkerRole().subscribe((role: TaskWorkerRole[]) => {
      this.taskRole = role;
    });

    this.taskServise.getTaskInfo(this.taskId).subscribe((data: TaskDetalInfo) => {
      this.detalInfoForm = this.forbBuilder.group({
        "Name": data.name,
        "Description": data.description,
        "DateOfEnd": data.deadline,
        "StatusId": data.statusId
      });
      this.deadLine = data.deadline;
      this.selectedStatus = data.statusId;
      this.detalInfoForm.patchValue(this.detalInfo);
      this.assignedMembers = data.assignedUsers;
    });

  }

  EditTask() {
    if (this.detalInfoForm.valid) {

      this.taskChangeInfo = this.detalInfoForm.value;
      this.taskChangeInfo.id = this.taskId;
      this.taskChangeInfo.workspaceId = this.workspaceId;
      this.taskChangeInfo.deadline = this.detalInfoForm.value.DateOfEnd;
      this.taskServise.editTask(this.taskChangeInfo).subscribe(
        () => {
          this.alertService.successMessage()
        },
        err => {
          this.alertService.errorMessage(err);
        }
      )}
  }
}
