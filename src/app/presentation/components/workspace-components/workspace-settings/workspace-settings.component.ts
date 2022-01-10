import { UserService } from '../../../../core/services/user.service';
import { WorkspaceInfo } from '../../../../core/models/workspace/workspaceInfo';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { WorkspaceInviteComponent } from '../workspace-invite/workspace-invite.component';
import { WorkspaceUpdateComponent } from '../workspace-update/workspace-update.component';

@Component({
  selector: 'app-workspace-settings',
  templateUrl: './workspace-settings.component.html',
  styleUrls: ['./workspace-settings.component.css']
})
export class WorkspaceSettingsComponent implements OnInit {

  protected routeSub: Subscription;
  workspaceId: number;
  workspace: WorkspaceInfo;
  constructor(private route: ActivatedRoute, public dialog: MatDialog, private userService: UserService) { }

  ngOnInit() {
    this.route.parent?.params.subscribe(
      (params) =>
      {
        this.workspaceId = Number(params['id']);
        this.userService.userWorkspaceInfo(this.workspaceId).subscribe((data: WorkspaceInfo) => {
          this.workspace = data;
        });
       });
  }

  modalInvites() {
    let dialogRef = this.dialog.open(WorkspaceInviteComponent);
    dialogRef.componentInstance.workspaceId = this.workspaceId;
  }

  modalUpdate() {
    let dialogRef = this.dialog.open(WorkspaceUpdateComponent);
    dialogRef.componentInstance.workspaceInput=this.workspace;
    dialogRef.componentInstance.isUpdated.subscribe(data => {
      if(data)
        dialogRef.close();
    });
  }
}
