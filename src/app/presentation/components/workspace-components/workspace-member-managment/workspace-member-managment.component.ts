import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { WorkspaceInviteComponent } from '../workspace-invite/workspace-invite.component';
import { WorkspaceService } from 'src/app/core/services/workspace.service';
import { WorkspaceInfo } from 'src/app/core/models/workspace/workspaceInfo';
import { WorkspaceChangeRole } from 'src/app/core/models/workspace/workspaceChangeRole';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { WorkspaceMembers } from 'src/app/core/models/workspace/workspaceMembers';
import { AlertService } from 'src/app/core/services/alerts.service';
import { workspaceUserRoles } from 'src/app/core/models/workspace/workspaceUserRole';
import { DataShareService } from 'src/app/core/services/DataShare.service';

@Component({
  selector: 'app-workspace-member-managment',
  templateUrl: './workspace-member-managment.component.html',
  styleUrls: ['./workspace-member-managment.component.css']
})
export class WorkspaceMemberManagmentComponent implements OnInit {

  protected routeSub: Subscription;
  workspaceId: number;
  userWorkspaceInfo = new WorkspaceInfo;
  workspaceUserList: WorkspaceMembers[];
  workspaceMember: WorkspaceMembers;
  roles: workspaceUserRoles[];
  
  constructor(
    private route: ActivatedRoute,
    private dataShare: DataShareService,
    public dialog: MatDialog, 
    private alertService: AlertService,
    private workspaceServise: WorkspaceService, 
    public authSrvice: AuthenticationService) {}
  
  ngOnInit() {
    this.route.parent?.params.subscribe((params) => {
      this.workspaceId = Number(params['id']);
    })

    this.workspaceServise.getWorkspaceUserList(this.workspaceId).subscribe(data => {
      this.workspaceUserList = data;
    })
    
    this.dataShare.workspaceInfo.subscribe((data: WorkspaceInfo) => {
      this.userWorkspaceInfo = data;
    });
    
    this.dataShare.workspaceRoles.subscribe((data: workspaceUserRoles[]) => {
        this.roles = data;
    });
  }
  
  isOwner(workspaceMember: WorkspaceMembers): boolean {
    return workspaceMember.role == 1;
  }

  isCurrentUser(workspaceMember: WorkspaceMembers): boolean {
    return workspaceMember.id == this.authSrvice.currentUser.id;
  }

  modalInvites() {
    let dialogRef = this.dialog.open(WorkspaceInviteComponent, {autoFocus: false});
    dialogRef.componentInstance.workspaceId = this.workspaceId;
  }

  async delete(userId: string): Promise<void> {
    if  (await this.alertService.confirmMessage('User will be deleted from all workspace tasks!', 
        'Are you sure?', 
        'Yes, delete!'))
      {
      this.workspaceServise.delUserFromWorksp(this.workspaceId, userId).subscribe(
        () => { 
          window.location.reload();
        })
      }
  }

  chandeWorkspaceRole(roleId: number, currentRole: number, userId: string) {
    if(roleId != currentRole) {
      let body = new WorkspaceChangeRole()
      body.roleId = roleId;
      body.userId = userId;
      body.workspaceId = this.workspaceId;

      this.workspaceServise.changeWorkspaceRole(body).subscribe(
        () => {
          this.alertService.successMessage('Change role');
        },
        err => {
          this.alertService.errorMessage(err);
        }
      );
    }
  }

}
