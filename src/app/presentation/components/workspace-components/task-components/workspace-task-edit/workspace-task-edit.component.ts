import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AssignedUsers, TaskDetalInfo } from 'src/app/core/models/task/taskDetalInfo';
import { TaskChangeInfo } from 'src/app/core/models/task/taskChangeInfo';
import { TaskStatus } from 'src/app/core/models/task/taskStatus';
import { TaskWorkerRole } from 'src/app/core/models/task/taskWorkerRoles';
import { WorkspaceMembers } from 'src/app/core/models/workspace/workspaceMembers';
import { AlertService } from 'src/app/core/services/alerts.service';
import { TaskService } from 'src/app/core/services/task.service';

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

  workspaceMemberList: WorkspaceMembers[];
  assignedUsers: AssignedUsers[];
  id: string;
  demoForm: FormGroup;

  constructor(private forbBuilder: FormBuilder,
    private alertService: AlertService,
    public dialog: MatDialog,
    private taskServise: TaskService) {
    this.detalInfoForm = forbBuilder.group({
      "Name": ["", [Validators.maxLength(50)]],
      "Description": ["", [Validators.maxLength(100)]],
      "DateOfEnd": ["",],
      "StatusId": ["", Validators.required]
    }),
      this.demoForm = this.forbBuilder.group({
        demoArray: this.forbBuilder.array([])
      })
  }

  ngOnInit() {
    this.taskServise.getStatusTask().subscribe((statList: TaskStatus[]) => {
      this.statusList = statList;
    });

    this.taskServise.getWorkerRole().subscribe((role: TaskWorkerRole[]) => {
      this.taskRole = role;
    });

    this.taskServise.getTaskInfo(this.workspaceId, this.taskId).subscribe((data: TaskDetalInfo) => {
      this.detalInfoForm = this.forbBuilder.group({
        "Name": data.name,
        "Description": data.description,
        "DateOfEnd": data.deadline,
        "StatusId": data.statusId
      });
      this.deadLine = data.deadline;
      this.selectedStatus = data.statusId;
      this.detalInfoForm.patchValue(this.detalInfo);
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
