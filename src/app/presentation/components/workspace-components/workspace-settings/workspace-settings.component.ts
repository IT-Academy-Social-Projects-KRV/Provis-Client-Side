import { WorkspaceInfo } from '../../../../core/models/workspace/workspaceInfo';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { WorkspaceInviteComponent } from '../workspace-invite/workspace-invite.component';
import { WorkspaceUpdateComponent } from '../workspace-update/workspace-update.component';
import { AlertService } from 'src/app/core/services/alerts.service';
import { WorkspaceService } from 'src/app/core/services/workspace.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-workspace-settings',
  templateUrl: './workspace-settings.component.html',
  styleUrls: ['./workspace-settings.component.css']
})
export class WorkspaceSettingsComponent implements OnInit {

  protected routeSub: Subscription;
  workspaceId: number;
  workspace: WorkspaceInfo;
  isOwner: boolean;

  constructor(private route: ActivatedRoute, 
    public dialog: MatDialog,
    private router: Router, 
    private alertService: AlertService,
    private workspaceServise: WorkspaceService,) {}

  ngOnInit() {
    this.route.parent?.params.subscribe(
      (params) =>
      {
        this.workspaceId = Number(params['id']);
       });
       this.workspaceServise.getWorkspaceInfo(this.workspaceId)
       .subscribe((data: WorkspaceInfo) => {
        this.workspace = data;
        
        if (this.workspace.role==1) {
            this.isOwner = true
          }
      });
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

  async leave (){
      if  (await this.alertService.confirmMessage('You will be deleted from all workspace tasks!', 
        'Are you sure?', 
        'Yes, leave!'))
      {
      this.alertService.successMessage();
      this.workspaceServise.leaveFromWorkspace(this.workspaceId).subscribe(
        () => { 
          this.router.navigate(['/user/workspaces']);
        })
      }
    }
}
