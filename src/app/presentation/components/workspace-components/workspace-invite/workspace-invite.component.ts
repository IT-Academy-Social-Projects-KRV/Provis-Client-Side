import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InviteToWorkspace } from 'src/app/core/models/workspace/inviteToWorkspace';
import { WorkspaceService } from 'src/app/core/services/workspace.service';
import { UserService } from 'src/app/core/services/user.service';
import { WorkspaceInfo } from 'src/app/core/models/workspace/workspaceInfo';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { WorkspaceInfoInvite } from 'src/app/core/models/workspace/workspaceInfoInvite';
import { AlertService } from 'src/app/core/services/alerts.service';
import { DataShareService } from 'src/app/core/services/DataShare.service';

@Component({
  selector: 'app-workspace-invite',
  templateUrl: './workspace-invite.component.html',
  styleUrls: ['./workspace-invite.component.css']
})
export class WorkspaceInviteComponent implements OnInit {

    @Input() public workspaceId: number;
    workspaceActiveInviteInfo: WorkspaceInfoInvite[];
    userInvite: InviteToWorkspace = new InviteToWorkspace();
    inviteUserForm: FormGroup;
    currentUserRole = new WorkspaceInfo();
    currentUserName: string|undefined;

 constructor(
   formBuilder: FormBuilder, 
  private workspaceService: WorkspaceService, 
  private userService: UserService, 
  private authenticationService: AuthenticationService, 
  private alertService: AlertService,
  private dataShare: DataShareService) {
   this.inviteUserForm = formBuilder.group({
     'UserEmail': ['', [Validators.required, Validators.email]]
   }); 
 }

  ngOnInit() {
    this.userInvite.workspaceId = this.workspaceId;

    this.workspaceService.WorkspaceInviteInfo(this.workspaceId).subscribe((data: WorkspaceInfoInvite[]) => {
      this.workspaceActiveInviteInfo = data;
    });

    this.dataShare.workspaceInfo.subscribe((data: WorkspaceInfo) => {
      this.currentUserRole = data;
      this.currentUserName = this.authenticationService.currentUser.username;
    });
  }

  Invite(): void{
    if(this.inviteUserForm.valid){
      this.userInvite = this.inviteUserForm.value;
      this.userInvite.workspaceId = this.workspaceId;
      this.workspaceService.InviteUser(this.userInvite).subscribe(
        () => {this.workspaceService.WorkspaceInviteInfo(this.workspaceId).subscribe((data: WorkspaceInfoInvite[]) => {
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
    this.workspaceService.WorkspaceActiveInviteDelete(inviteId, this.workspaceId).subscribe();
    this.workspaceActiveInviteInfo.splice(this.workspaceActiveInviteInfo.findIndex(x => x.inviteId == inviteId), 1);
  }
}
