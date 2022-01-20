import { WorkspaceInfo } from '../../../../core/models/workspace/workspaceInfo';
import { map, Subscription, Observable, mapTo, filter, merge } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, ResolveEnd, ResolveStart, Router } from '@angular/router';
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
  description: string;

  constructor(private activeRoute: ActivatedRoute, public dialog: MatDialog, ) {}

  ngOnInit() {



    this.description = this.activeRoute.snapshot.data['description'];
    console.log(this.description);

    // this.route.parent?.params.subscribe(
    //   (params) =>
    //   {
    //     this.workspaceId = Number(params['id']);
    //    });
  }

  modalInvites() {
    let dialogRef = this.dialog.open(WorkspaceInviteComponent);
    dialogRef.componentInstance.workspaceId = this.workspaceId;
  }

  modalUpdate() {
    let dialogRef = this.dialog.open(WorkspaceUpdateComponent);
    dialogRef.componentInstance.workspaceId=this.workspaceId;
    dialogRef.componentInstance.isUpdated.subscribe(data => {
      if(data)
        dialogRef.close();
    });
  }
}
