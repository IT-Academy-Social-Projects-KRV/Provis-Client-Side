import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InviteToWorkspace } from 'src/app/core/models/workspace/inviteToWorkspace';
import { WorkspaceService } from 'src/app/core/services/workspace.service';
import Swal from 'sweetalert2';
import { UserService } from 'src/app/core/services/user.service';
import { WorkspaceInfo } from 'src/app/core/models/workspace/workspaceInfo';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { WorkspaceInfoInvite } from 'src/app/core/models/workspace/workspaceInfoInvite';

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

 constructor(private fb: FormBuilder, private ws: WorkspaceService, private us: UserService, private as: AuthenticationService) {
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
        () => {this.ws.WorkspaceInviteInfo(this.workspaceId).subscribe((data: WorkspaceInfoInvite[]) => {
            this.workspaceActiveInviteInfo = data;
            });
          },
          err => {
            let errorMessage: string = '';
            if(err.error.errors && typeof err.error.errors === 'object'){
              const errors = err.error.errors;
  
              for(let key in errors){
                for(let indexError in errors[key]){
                  errorMessage += errors[key][indexError] + '\n';
                }
              }
              
             this.showAlert(errorMessage);
              return;
            } 
  
            if(err.error && typeof err.error === 'object'){
              errorMessage += err.error.error;

              this.showAlert(errorMessage);
              return;
            }
          }
        );    
    }
  }

  DeleteInvite(inviteId: number): void{
    this.ws.WorkspaceActiveInviteDelete(inviteId, this.workspaceId).subscribe();
    this.workspaceActiveInviteInfo.splice(this.workspaceActiveInviteInfo.findIndex(x => x.inviteId == inviteId), 1);
  }
}
