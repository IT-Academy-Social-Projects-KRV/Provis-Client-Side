import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserInvite } from 'src/app/core/models/userInvite';
import { WorkspaceComponent } from '../workspace/workspace.component';
import { WorkspaceService } from 'src/app/core/services/workspace.service';
import Swal from 'sweetalert2';
import { UserInvites } from 'src/app/core/models/userInviteList';
import { WorkspaceInviteInfo } from 'src/app/core/models/WorkspaceInviteInfo';

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
    workspaceID: WorkspaceComponent;

 constructor(private fb: FormBuilder, private ws: WorkspaceService) {
   this.inviteUserForm = fb.group({
     'UserEmail': ['', [Validators.required, Validators.email]]
   }); 
 }

  ngOnInit() {
    this.userInvite.workspaceId = this.workspaceId;

    this.ws.WorkspaceInviteInfo(this.workspaceId).subscribe((data: WorkspaceInviteInfo[]) => {
      this.workspaceActiveInviteInfo = data;
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
          () => {},
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

    DeleteInvite(): void{
      this.ws.WorkspaceActiveInviteDelete(11, this.workspaceId).subscribe();
    }
}
