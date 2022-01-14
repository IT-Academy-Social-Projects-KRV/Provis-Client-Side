import { WorkspaceInfo } from '../../../../core/models/workspace/workspaceInfo';
import { UserService } from 'src/app/core/services/user.service';
import { WorkspaceTaskCreateComponent } from '../task-components/workspace-task-create/workspace-task-create.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WorkspaceService } from 'src/app/core/services/workspace.service';
import { workspaceUserRoles } from 'src/app/core/models/workspace/workspaceUserRole';
import { GlobalVariablesService } from 'src/app/core/services/globalVariables.service';

@Component({
  selector: 'app-workspace-menu',
  templateUrl: './workspace-menu.component.html',
  styleUrls: ['./workspace-menu.component.css']
})
export class WorkspaceMenuComponent implements OnInit {

  workspaceId: number;
  userWorkspaceInfo = new WorkspaceInfo;
  workspaceUserRoles: workspaceUserRoles[] = [];

  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private userService: UserService,
    private workspaceService: WorkspaceService,
    private globalVariables: GlobalVariablesService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(() => {
      this.workspaceId = Number(this.route.snapshot.paramMap.get('id'));
    });

    this.userService.userWorkspaceInfo(this.workspaceId).subscribe((data: WorkspaceInfo) => {
      this.userWorkspaceInfo = data;
    });

    this.workspaceService.getAllWorkspaceUserRole().subscribe(data => {
      this.globalVariables.globalWorkspaceUserRoles = data;
    });

  }

  modalCreateTask() {
    let dialogRef = this.dialog.open(WorkspaceTaskCreateComponent, {autoFocus: false});
    dialogRef.componentInstance.workspaceId = this.workspaceId;
  }

}
