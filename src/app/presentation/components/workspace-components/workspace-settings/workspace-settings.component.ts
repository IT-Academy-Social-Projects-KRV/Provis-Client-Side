import { UserService } from '../../../../core/services/user.service';
import { WorkspaceInfo } from '../../../../core/models/workspace/workspaceInfo';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { WorkspaceInviteComponent } from '../workspace-invite/workspace-invite.component';
import { WorkspaceUpdateComponent } from '../workspace-update/workspace-update.component';
import { AlertService } from 'src/app/core/services/alerts.service';
import { WorkspaceService } from 'src/app/core/services/workspace.service';

@Component({
  selector: 'app-workspace-settings',
  templateUrl: './workspace-settings.component.html',
  styleUrls: ['./workspace-settings.component.css']
})
export class WorkspaceSettingsComponent implements OnInit {

  protected routeSub: Subscription;
  workspaceId: number;
  workspace: WorkspaceInfo;
  
  constructor(private route: ActivatedRoute, 
    public dialog: MatDialog,
    private router: Router, 
    private userService: UserService, 
    private alertService: AlertService,
    private workspaceServise: WorkspaceService,) {}

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

  async leave (){

      if  (await this.alertService.confirmMessage('You will be deleted from all workspace tasks!', 
        'Are you sure?', 
        'Yes, leave!'))
      {
      this.alertService.successMessage();
      this.workspaceServise.LeaveFromWorkspace(this.workspaceId).subscribe(
        () => { 
          this.router.navigate(['/user/workspaces']);
        })
      }
    }
}
