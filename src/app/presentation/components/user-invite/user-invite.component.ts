import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InviteToWorkspace } from 'src/app/core/models/workspace/inviteToWorkspace';
import { WorkspaceService } from 'src/app/core/services/workspace.service';
import { UserService } from 'src/app/core/services/user.service';
import { WorkspaceInfo } from 'src/app/core/models/workspace/workspaceInfo';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { WorkspaceInfoInvite } from 'src/app/core/models/workspace/workspaceInfoInvite';
import { AlertService } from 'src/app/core/services/alerts.service';

@Component({
  selector: 'app-user',
  templateUrl: './user-invite.component.html',
  styleUrls: ['./user-invite.component.css']
})
export class UserInviteComponent implements OnInit {

    @Input() public workspaceId: number;
    workspaceActiveInviteInfo: WorkspaceInfoInvite[];
    userInvite: InviteToWorkspace = new InviteToWorkspace();
    inviteUserForm: FormGroup;
    currentUserRole = new WorkspaceInfo();
    currentUserName: string|undefined;

 constructor(private fb: FormBuilder, 
  private ws: WorkspaceService, 
  private us: UserService, 
  private as: AuthenticationService, 
  private alertService: AlertService) {
   this.inviteUserForm = fb.group({
     'UserEmail': ['', [Validators.required, Validators.email]]
   }); 
 }

  ngOnInit() {
    this.userInvite.workspaceId = this.workspaceId;

    this.ws.WorkspaceInviteInfo(this.workspaceId).subscribe((data: WorkspaceInfoInvite[]) => {
      this.workspaceActiveInviteInfo = data;
    });

    this.us.userWorkspaceInfo(this.workspaceId).subscribe((data: WorkspaceInfo) => {
      this.currentUserRole = data;
      this.currentUserName = this.as.currentUser.username;
    });
  }

  Invite(): void{
    if(this.inviteUserForm.valid){
      this.userInvite = this.inviteUserForm.value;
      this.userInvite.workspaceId = this.workspaceId;
      this.ws.InviteUser(this.userInvite).subscribe(
        () => {this.ws.WorkspaceInviteInfo(this.workspaceId).subscribe((data: WorkspaceInfoInvite[]) => {
            this.workspaceActiveInviteInfo = data;
            });
          },
          err => {
            this.alertService.errorMessage(err);
          }
        );    
    }
  }

  DeleteInvite(inviteId: number): void{
    this.ws.WorkspaceActiveInviteDelete(inviteId, this.workspaceId).subscribe();
    this.workspaceActiveInviteInfo.splice(this.workspaceActiveInviteInfo.findIndex(x => x.inviteId == inviteId), 1);
  }
}
