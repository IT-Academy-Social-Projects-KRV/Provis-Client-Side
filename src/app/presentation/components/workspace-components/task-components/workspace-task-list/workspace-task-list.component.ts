import { WorkspaceService } from 'src/app/core/services/workspace.service';
import { MatAccordion } from '@angular/material/expansion';
import { WorkspaceTaskCreateComponent } from '../workspace-task-create/workspace-task-create.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WorkspaceMembers } from 'src/app/core/models/workspace/workspaceMembers';
import { SprintDetailInfo } from 'src/app/core/models/sprint/SprintDetailInfo';
import { SprintService } from 'src/app/core/services/sprint.service';
import { DataShareService } from 'src/app/core/services/dataShare.service';

@Component({
  selector: 'app-workspace-task-list',
  templateUrl: './workspace-task-list.component.html',
  styleUrls: ['./workspace-task-list.component.css']
})

export class WorkspaceTaskListComponent implements OnInit {

  @ViewChild(MatAccordion) accordion: MatAccordion;

  workspaceUserList: WorkspaceMembers[];
  workspaceId: number;
  sprintId: number | null = null;
  sprintInfo: SprintDetailInfo | null = null;
  userNull = {
    id:"",
    userName: "Unassigned task",
    role: 1
  };

  constructor(public dialog: MatDialog,
    private activeRoute: ActivatedRoute,
    private workspaceService: WorkspaceService,
    private sprintService: SprintService,
    private dataShare: DataShareService) {
     }

  ngOnInit() {
    this.activeRoute.parent?.params.subscribe((params) => {
      this.workspaceId = Number(params['id'])
    });

    this.workspaceService.getWorkspaceUserList(this.workspaceId).subscribe((data:WorkspaceMembers[])=>{
      this.workspaceUserList = data;
      this.workspaceUserList.push(this.userNull);
    });

    this.activeRoute.params.subscribe(data=>{
      this.sprintId = (data['sprintId'])? data['sprintId'] : null;
      if(this.sprintId) {
        this.sprintService.GetDetailSprintInfo(this.workspaceId, this.sprintId).subscribe(data => {
          this.sprintInfo = data;
        });
      }
      this.accordion.closeAll();
    });

    this.dataShare.UpdateSprint.subscribe(data=>{
      if(data && this.sprintInfo && this.sprintInfo.id == data?.id) {
        this.sprintInfo = data;
      }
    });
  }

  modalCreateTask() {
    let dialogRef = this.dialog.open(WorkspaceTaskCreateComponent, {autoFocus: false});
    dialogRef.componentInstance.workspaceId = this.workspaceId;
    dialogRef.componentInstance.sprintId = (this.sprintId)? this.sprintId : undefined;
  }

}
