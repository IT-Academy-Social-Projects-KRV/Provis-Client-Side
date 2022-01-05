import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkspaceMembers } from 'src/app/core/models/workspaceUsersList';
import { WorkspaceService } from 'src/app/core/services/workspace.service';
import { UserInviteComponent } from '../user-invite/user-invite.component';
import { UserInvites } from 'src/app/core/models/userInviteList';
import Swal from 'sweetalert2';
import { userWorkspaceInfo } from 'src/app/core/models/userWorkspaceInfo';
import { UserService } from 'src/app/core/services/user.service';


@Component({
  selector: 'app-member-managment',
  templateUrl: './member-managment.component.html',
  styleUrls: ['./member-managment.component.css']
})
export class MemberManagmentComponent implements OnInit {

  workspaceId: number;
  workspaceUserList: WorkspaceMembers[];
  protected routeSub: Subscription;
  workspaceActiveInviteInfo: UserInvites[];
  userWorkspaceInfo = new userWorkspaceInfo;
  
  constructor(
    private route: ActivatedRoute, 
    public dialog: MatDialog, 
    private workspaceServise: WorkspaceService, 
    private userService: UserService) {}

  ngOnInit() {
    this.route.parent?.params.subscribe((params) =>{
        this.workspaceId = Number(params['id']);
    })
    this.workspaceServise.getWorkspaceUserList(this.workspaceId).subscribe(data=>{
      this.workspaceUserList=data;
    })
    this.userService.userWorkspaceInfo(this.workspaceId).subscribe((data: userWorkspaceInfo) => {
        this.userWorkspaceInfo = data;
      });
  }

  delete(userId:string): void{
    Swal.fire({
      title: 'Are you sure?',
      text: "User will be deleted from all workspace tasks!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.workspaceServise.delUserFromWorksp(this.workspaceId, userId).subscribe(
          () => { 
            window.location.reload();
          })
        }
      })
    }

  modalInvites() {
    let dialogRef = this.dialog.open(UserInviteComponent, {autoFocus: false});
    dialogRef.componentInstance.workspaceId = this.workspaceId;
  }
}
