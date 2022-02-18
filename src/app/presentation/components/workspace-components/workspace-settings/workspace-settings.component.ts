import { WorkspaceInfo } from '../../../../core/models/workspace/workspaceInfo';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { WorkspaceInviteComponent } from '../workspace-invite/workspace-invite.component';
import { WorkspaceUpdateComponent } from '../workspace-update/workspace-update.component';
import { DataShareService } from 'src/app/core/services/dataShare.service';
import { WorkspaceService } from 'src/app/core/services/workspace.service';
import { AlertService } from 'src/app/core/services/alerts.service';

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
  isUseSprints: boolean = false;

  constructor(public dialog: MatDialog,
    private dataShare: DataShareService,
    private workspaceService: WorkspaceService,
    private alertService: AlertService) {}

  ngOnInit() {
    this.dataShare.workspaceInfo.subscribe(data => {
      this.workspace = data;
      this.isUseSprints = data.isUseSprints;
    });
  }

  modalInvites() {
    let dialogRef = this.dialog.open(WorkspaceInviteComponent);
    dialogRef.componentInstance.workspaceId = this.workspaceId;
  }

  modalUpdate() {
    let dialogRef = this.dialog.open(WorkspaceUpdateComponent);
    dialogRef.componentInstance.isUpdated.subscribe(data => {
      if(data)
        dialogRef.close();
    });
  }

  changeUseSprints(checked: boolean) {
    if(!checked) {
      this.alertService.confirmMessage("Are you sure?", "Off sprints").then((res)=>{
        if(res)
          this.setUsingSprints(checked);
        else
          this.isUseSprints = true;
      });
    } else {
      this.setUsingSprints(checked);
    }

  }

  setUsingSprints(value: boolean) {
    this.workspaceService.SetUsingSprints(this.workspace.id, value).subscribe(()=>{
      this.workspace.isUseSprints = value;
      this.dataShare.nextWorkspaceInfo(this.workspace);
    }, err => {
      this.alertService.errorMessage(err);
      this.isUseSprints = false;
    });
  }
}
