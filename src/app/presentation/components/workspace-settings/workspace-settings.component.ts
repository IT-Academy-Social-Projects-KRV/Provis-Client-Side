import { UserService } from './../../../core/services/user.service';
import { userWorkspaceInfo } from './../../../core/models/userWorkspaceInfo';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ModalUpdateWorkspaceComponent } from '../modal-updateworkspace/modal-updateworkspace.component';

@Component({
  selector: 'app-workspace-settings',
  templateUrl: './workspace-settings.component.html',
  styleUrls: ['./workspace-settings.component.css']
})
export class WorkspaceSettingsComponent implements OnInit {
  protected routeSub: Subscription;
  workspaceId: number;
  workspace: userWorkspaceInfo;
  constructor(private route: ActivatedRoute, public dialog: MatDialog, private userService: UserService) { }

  ngOnInit() {
    this.route.parent?.params.subscribe(
      (params) =>
      {
        this.workspaceId = Number(params['id']);
        this.userService.userWorkspaceInfo(this.workspaceId).subscribe((data: userWorkspaceInfo) => {
          this.workspace = data;
        });
       });
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

