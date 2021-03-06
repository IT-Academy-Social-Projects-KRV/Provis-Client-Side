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
import { formatDate } from '@angular/common';
import { DataShareService } from 'src/app/core/services/dataShare.service';
import { DeleteTask } from 'src/app/core/models/task/deleteTask';

@Component({
  selector: 'app-workspace-task-edit',
  templateUrl: './workspace-task-edit.component.html',
  styleUrls: ['./workspace-task-edit.component.css']
})
export class WorkspaceTaskEditComponent implements OnInit {

  @Input() public taskId: number;
  @Input() public workspaceId: number;

  detailInfoForm: FormGroup;
  detailInfo: TaskDetalInfo = new TaskDetalInfo();
  taskChangeInfo: TaskChangeInfo;
  statusList: TaskStatus[];
  taskRole: TaskWorkerRole[];
  selectedStatus: number;
  storyPoints?: number;
  deadLine: Date;
  rowVersion: Uint8Array;

  assignUserMode: mode = 'edit task';
  workspaceMemberList: WorkspaceMembers[];
  assignedMembers: AssignedMember[];
  id: string;
  demoForm: FormGroup;
  isLoading: boolean = false;

  constructor(private workspaceService: WorkspaceService,
    private forbBuilder: FormBuilder,
    private alertService: AlertService,
    public dialog: MatDialog,
    private taskService: TaskService,
    private dataShare: DataShareService) {
    this.detailInfoForm = forbBuilder.group({
      "name": ["", [Validators.maxLength(50)]],
      "description": ["", [Validators.maxLength(100)]],
      "deadline": ["",],
      "statusId": ["", Validators.required],
      "storyPoints": [null, [Validators.maxLength(2)]]
    }),
      this.demoForm = this.forbBuilder.group({
        demoArray: this.forbBuilder.array([])
      })
  }

  ngOnInit() {
    this.isLoading = true;
    this.workspaceService.getWorkspaceUserList(this.workspaceId)
      .subscribe((data: WorkspaceMembers[]) => {
        this.workspaceMemberList = data;
          this.taskService.getStatusTask().subscribe((statList: TaskStatus[]) => {
            this.statusList = statList;
            this.taskService.getWorkerRole().subscribe((role: TaskWorkerRole[]) => {
              this.taskRole = role;
                this.taskService.getTaskInfo(this.workspaceId, this.taskId)
                  .subscribe((data: TaskDetalInfo) => {
                    this.detailInfoForm.patchValue(data);
                    this.detailInfoForm.controls['deadline']
                      .setValue(formatDate(data.deadline,'yyyy-MM-dd','en'));
                    this.selectedStatus = data.statusId;
                    this.assignedMembers = data.assignedUsers;
                    this.isLoading = false;
                    this.rowVersion = data.rowVersion;
                });
            });
          });
      });
  }

  EditTask() {
    if (this.detailInfoForm.valid) {
      this.taskChangeInfo = this.detailInfoForm.value;
      this.taskChangeInfo.id = this.taskId;
      this.taskChangeInfo.workspaceId = this.workspaceId;
      this.taskChangeInfo.deadline = this.detailInfoForm.value.deadline;
      this.taskChangeInfo.storyPoints = this.detailInfoForm.value.storyPoints;
      this.taskChangeInfo.statusId = this.selectedStatus;
      this.taskChangeInfo.rowVersion = this.rowVersion;
      this.taskService.editTask(this.taskChangeInfo).subscribe(
        (data: TaskDetalInfo) => {
          this.rowVersion = data.rowVersion;
          this.dataShare.nextTaskUpdate(this.taskChangeInfo);
          this.alertService.successMessage()
        },
        err => {
          this.alertService.errorMessage(err);
        }
      )}
  }

  getSelectedStatus(selectedStatus: number): string {
    if(selectedStatus)
      return this.statusList[selectedStatus - 1].name;
    else
      return '';
  }

  async deleteTask() {
    if(await this.alertService.confirmMessage('Task will be deleted!',
        'Are you sure?',
        'Yes, delete!'))
      {
        this.taskService.deleteTask(this.workspaceId, this.taskId).subscribe(
        () => {
          let deleteTask = new DeleteTask();
          deleteTask.id = this.taskId;
          deleteTask.statusId = this.selectedStatus;
          this.alertService.successMessage();
          this.dataShare.nextTaskDelete(deleteTask);
          this.dialog.closeAll();
        },
        err => {
          this.alertService.errorMessage(err);
        })
      }
  }

}
