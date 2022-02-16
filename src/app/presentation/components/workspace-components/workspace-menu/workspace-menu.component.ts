import { WorkspaceInfo } from '../../../../core/models/workspace/workspaceInfo';
import { WorkspaceTaskCreateComponent } from '../task-components/workspace-task-create/workspace-task-create.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { workspaceUserRoles } from 'src/app/core/models/workspace/workspaceUserRole';
import { DataShareService } from 'src/app/core/services/dataShare.service';
import { SprintInfo } from 'src/app/core/models/sprint/sprintInfo';
import { SprintService } from 'src/app/core/services/sprint.service';
import { Router } from '@angular/router';
import { AddSprintComponent } from '../sprint-compotents/add-sprint/add-sprint.component';
import { ChangeSprintComponent } from '../sprint-compotents/change-sprint/change-sprint.component';

@Component({
  selector: 'app-workspace-menu',
  templateUrl: './workspace-menu.component.html',
  styleUrls: ['./workspace-menu.component.css']
})

export class WorkspaceMenuComponent implements OnInit {

  workspaceId: number;
  workspaceUserRoles: workspaceUserRoles[] = [];
  userWorkspaceInfo: WorkspaceInfo = new WorkspaceInfo();
  roleName: string = '';
  isUseSprint: boolean = false;
  isShowSprintList: boolean = false;
  sprintList: SprintInfo[] = [];
  showSprintList: boolean = false;

  constructor(public dialog: MatDialog,
    private dataShareService: DataShareService,
    private sprintService: SprintService,
    private router: Router) {}

  ngOnInit() {
    this.dataShareService.workspaceInfo.subscribe(data => {
      this.userWorkspaceInfo = data;

      this.dataShareService.getworkspaceRoleName(data.role).subscribe(role=>{
        this.roleName = role;
        this.isUseSprint = data.isUseSprints;
      });

      if(data.isUseSprints) {
        this.sprintService.getSprintList(data.id).subscribe(sprintList=>{
          this.sprintList = sprintList;
        });
      } else if (!data.isUseSprints) {
        this.sprintList = [];
        this.isShowSprintList = false;
      }

    });

    this.dataShareService.UpdateSprint.subscribe(data=>{
      if(data) {
        let index = this.sprintList.findIndex(x=>x.id == data.id);
        if(index != -1) {
          this.sprintList[index].name = data.name;
        }
      }
    });

    this.dataShareService.AddSprint.subscribe(data => {
      if(data) {
        this.sprintList.push(data);
      }
    });
  }

  modalCreateTask() {
    let dialogRef = this.dialog.open(WorkspaceTaskCreateComponent, {autoFocus: false});
    dialogRef.componentInstance.workspaceId = this.userWorkspaceInfo.id;
  }

  showTasks() {
    if(this.isUseSprint) {
      this.isShowSprintList = !this.isShowSprintList;
    } else {
      this.router.navigate(['/user/workspace/' + this.userWorkspaceInfo.id + '/tasklist']);
    }
  }

  regirectToSprint(sprintId: number) {
    let url = '/user/workspace/' + this.userWorkspaceInfo.id + '/tasklist/sprint/'+ sprintId;
    this.router.navigate([url]);
  }

  showAddSprint() {
    let dialogRef = this.dialog.open(AddSprintComponent);
    dialogRef.componentInstance.workspaceId = this.userWorkspaceInfo.id;
  }

  showUpdateSprint(sprintId: number) {
    let dialogRef = this.dialog.open(ChangeSprintComponent);
    dialogRef.componentInstance.workspaceId = this.userWorkspaceInfo.id;
    dialogRef.componentInstance.sprintId = sprintId;
  }
}
