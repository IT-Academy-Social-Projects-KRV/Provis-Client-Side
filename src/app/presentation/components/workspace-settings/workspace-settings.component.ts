import { UserService } from './../../../core/services/user.service';
import { WorkspaceInfo } from '../../../core/models/workspace/workspaceInfo';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { UserInviteComponent } from '../user-invite/user-invite.component';
import { ModalUpdateWorkspaceComponent } from '../modal-updateworkspace/modal-updateworkspace.component';

@Component({
  selector: 'app-workspace-settings',
  templateUrl: './workspace-settings.component.html',
  styleUrls: ['./workspace-settings.component.css']
})
export class WorkspaceSettingsComponent implements OnInit {

  protected routeSub: Subscription;
  workspaceId: number;
  workspace: WorkspaceInfo;
  constructor(private router:Router, private route: ActivatedRoute, public dialog: MatDialog, private userService: UserService) { }

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
    let dialogRef = this.dialog.open(UserInviteComponent);
    dialogRef.componentInstance.workspaceId = this.workspaceId;
  }

  modalUpdate() {
    let dialogRef = this.dialog.open(ModalUpdateWorkspaceComponent);
    dialogRef.componentInstance.workspaceInput=this.workspace;
    dialogRef.componentInstance.isUpdated.subscribe(data => {
      if(data)
        dialogRef.close();

    });
  }

}

