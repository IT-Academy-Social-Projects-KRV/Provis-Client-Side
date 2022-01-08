import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserInvite } from 'src/app/core/models/userInvite';
import { WorkspaceService } from 'src/app/core/services/workspace.service';
import { WorkspaceInviteInfo } from 'src/app/core/models/WorkspaceInviteInfo';
import Swal from 'sweetalert2';
import { UserService } from 'src/app/core/services/user.service';
import { userWorkspaceInfo } from 'src/app/core/models/userWorkspaceInfo';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { UserInfo } from 'src/app/core/models/userInfo';

@Component({
  selector: 'app-user',
  templateUrl: './user-invite.component.html',
  styleUrls: ['./user-invite.component.css']
})
export class UserInviteComponent implements OnInit {

    @Input() public workspaceId: number;
    workspaceActiveInviteInfo: WorkspaceInviteInfo[];
    userInvite: UserInvite = new UserInvite();
    inviteUserForm: FormGroup;
    currentUserRole = new userWorkspaceInfo();
    currentUserName: string|undefined;

 constructor(private fb: FormBuilder, private ws: WorkspaceService, private us: UserService, private as: AuthenticationService) {
   this.inviteUserForm = fb.group({
     'UserEmail': ['', [Validators.required, Validators.email]]
   }); 
 }

  ngOnInit() {
    this.userInvite.workspaceId = this.workspaceId;

    this.ws.WorkspaceInviteInfo(this.workspaceId).subscribe((data: WorkspaceInviteInfo[]) => {
      this.workspaceActiveInviteInfo = data;
    });

    this.us.userWorkspaceInfo(this.workspaceId).subscribe((data: userWorkspaceInfo) => {
      this.currentUserRole = data;
      this.currentUserName = this.as.currentUser.Username;
    });
  }

  showAlert(error: string){
    Swal.fire({
      icon: 'error',
      title: error,
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }
    })
  }

  Invite(): void{
    if(this.inviteUserForm.valid){
      this.userInvite = this.inviteUserForm.value;
      this.userInvite.workspaceId = this.workspaceId;
      this.ws.InviteUser(this.userInvite).subscribe(
        () => {this.ws.WorkspaceInviteInfo(this.workspaceId).subscribe((data: WorkspaceInviteInfo[]) => {
            this.workspaceActiveInviteInfo = data;
            });
          },
          err => {
            this.showAlert(err);
          }
        );    
    }
  }

  DeleteInvite(inviteId: number): void{
    this.ws.WorkspaceActiveInviteDelete(inviteId, this.workspaceId).subscribe();
    this.workspaceActiveInviteInfo.splice(this.workspaceActiveInviteInfo.findIndex(x => x.inviteId == inviteId), 1);
  }
}
