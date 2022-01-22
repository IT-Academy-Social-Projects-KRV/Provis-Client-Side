import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { WorkspaceInviteComponent } from '../workspace-invite/workspace-invite.component';
import { WorkspaceService } from 'src/app/core/services/workspace.service';
import { UserInvite } from 'src/app/core/models/user/userInvite';
import { WorkspaceInfo } from 'src/app/core/models/workspace/workspaceInfo';
import { UserService } from 'src/app/core/services/user.service';
import { WorkspaceChangeRole } from 'src/app/core/models/workspace/workspaceChangeRole';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { WorkspaceMembers } from 'src/app/core/models/workspace/workspaceMembers';
import { AlertService } from 'src/app/core/services/alerts.service';
import { DataShareService } from 'src/app/core/services/DataShare.service';

interface Role {
  roleId: number;
  nameRole: string;
}

@Component({
  selector: 'app-workspace-member-managment',
  templateUrl: './workspace-member-managment.component.html',
  styleUrls: ['./workspace-member-managment.component.css']
})
export class WorkspaceMemberManagmentComponent implements OnInit {

  roles: Role[] = [
    {roleId: 1, nameRole: 'Owner'},
    {roleId: 2, nameRole: 'Manager'},
    {roleId: 3, nameRole: 'Member'},
    {roleId: 4, nameRole: 'Viewer'},
  ];

  protected routeSub: Subscription;
  workspaceId: number;
  workspaceActiveInviteInfo: UserInvite[];
  userWorkspaceInfo = new WorkspaceInfo;
  workspaceUserList: WorkspaceMembers[];
  workspaceMember: WorkspaceMembers;
  
  constructor(
    private route: ActivatedRoute, 
    public dialog: MatDialog, 
    private alertService: AlertService,
    private workspaceServise: WorkspaceService, 
    public authSrvice: AuthenticationService,
    private dataShare: DataShareService) {}
  
  ngOnInit() {
    this.route.parent?.params.subscribe(
      (params) =>
      {this.workspaceId = Number(params['id']);
    })
    this.workspaceServise.getWorkspaceUserList(this.workspaceId).subscribe(data=>{
      this.workspaceUserList=data;
    })
    this.dataShare.workspaceInfo.subscribe((data: WorkspaceInfo) => {
      this.userWorkspaceInfo = data;
    });
  }
  
  isOwner(workspaceMember: WorkspaceMembers){
    if (workspaceMember.role == 1) {
      return true
    }
    else {
      return false
    }
  }

  modalInvites() {
    let dialogRef = this.dialog.open(WorkspaceInviteComponent, {autoFocus: false});
    dialogRef.componentInstance.workspaceId = this.workspaceId;
  }

  async delete(userId:string): Promise<void>{

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

    if(roleId != currentRole)
    {
      let body = new WorkspaceChangeRole()
      body.roleId = roleId;
      body.userId = userId;
      body.workspaceId = this.workspaceId;

      this.workspaceServise.changeWorkspaceRole(body).subscribe(
        ()=>{
          this.alertService.successMessage('Change role');
        },

          err => {
            this.alertService.errorMessage(err);
          }
      );
    }

  }
}
