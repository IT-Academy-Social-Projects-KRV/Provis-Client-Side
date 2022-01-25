import { Router } from '@angular/router';
import { WorkspaceInfo } from '../../../../core/models/workspace/workspaceInfo';
import { WorkspaceTaskCreateComponent } from '../task-components/workspace-task-create/workspace-task-create.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { workspaceUserRoles } from 'src/app/core/models/workspace/workspaceUserRole';
import { DataShareService } from 'src/app/core/services/DataShare.service';

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

  constructor(
    public dialog: MatDialog,
    private dataShareService: DataShareService,
    private router: Router) { }

  ngOnInit() {
    this.dataShareService.workspaceInfo.subscribe(data => {
      this.userWorkspaceInfo = data;

      this.dataShareService.getworkspaceRoleName(data.role).subscribe(role=>{
        this.roleName = role;
      });
    });
  }

  modalCreateTask() {
    let dialogRef = this.dialog.open(WorkspaceTaskCreateComponent, {autoFocus: false});
    dialogRef.componentInstance.workspaceId = this.userWorkspaceInfo.id;
  }
}
