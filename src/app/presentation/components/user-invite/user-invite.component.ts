import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserInvite } from 'src/app/core/models/userInvite';
import { WorkspaceComponent } from '../workspace/workspace.component';


@Component({
  selector: 'app-user',
  templateUrl: './user-invite.component.html',
  styleUrls: ['./user-invite.component.css']
})
export class UserInviteComponent implements OnInit {

    @Input() public workspaceId: number;
    userInvite: UserInvite = new UserInvite();
    inviteUserForm: FormGroup;
    workspaceID: WorkspaceComponent;

 constructor(private fb: FormBuilder) {
   this.inviteUserForm = fb.group({
     'UserEmail': ['', [Validators.required, Validators.email]]
   });
 }

  ngOnInit() {
    this.userInvite.WorkspaceId = this.workspaceId;
   }

    Invite(): void{
      if(this.inviteUserForm.valid){
        this.userInvite = this.inviteUserForm.value;
        this.userInvite.WorkspaceId = this.workspaceId;
       console.log(this.userInvite.UserEmail);
      }
    }
}
