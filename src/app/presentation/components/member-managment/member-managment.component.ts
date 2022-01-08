import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserInviteComponent } from '../user-invite/user-invite.component';
import { WorkspaceService } from 'src/app/core/services/workspace.service';
import { UserInvite } from 'src/app/core/models/user/userInvite';
import Swal from 'sweetalert2';
import { WorkspaceInfo } from 'src/app/core/models/workspace/workspaceInfo';
import { UserService } from 'src/app/core/services/user.service';
import { WorkspaceChangeRole } from 'src/app/core/models/workspace/workspaceChangeRole';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { WorkspaceMembers } from 'src/app/core/models/workspace/workspaceMembers';
interface Role {
  roleId: number;
  nameRole: string;
}

@Component({
  selector: 'app-member-managment',
  templateUrl: './member-managment.component.html',
  styleUrls: ['./member-managment.component.css']
})
export class MemberManagmentComponent implements OnInit {

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
  
  constructor(
    private route: ActivatedRoute, 
    public dialog: MatDialog, 
    private router: Router,
    private workspaceServise: WorkspaceService, 
    private userService: UserService,
    public authSrvice: AuthenticationService) {}
  
  ngOnInit() {
    this.route.parent?.params.subscribe(
      (params) =>
      {this.workspaceId = Number(params['id']);
    })
    this.workspaceServise.getWorkspaceUserList(this.workspaceId).subscribe(data=>{
      this.workspaceUserList=data;
    })
    this.userService.userWorkspaceInfo(this.workspaceId).subscribe((data: WorkspaceInfo) => {
        this.userWorkspaceInfo = data;
      });
  }
  
  modalInvites() {
    let dialogRef = this.dialog.open(UserInviteComponent, {autoFocus: false});
    dialogRef.componentInstance.workspaceId = this.workspaceId;
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

  chandeWorkspaceRole(roleId: number, currentRole: string, userId: string) {

    if(this.roles[this.roles.findIndex(x=>x.roleId == roleId)].nameRole != currentRole)
    {
      let body = new WorkspaceChangeRole()
      body.roleId = roleId;
      body.userId = userId;
      body.workspaceId = this.workspaceId;

      this.workspaceServise.changeWorkspaceRole(body).subscribe(
        ()=>{
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Change role',
            text: "Success",
            showConfirmButton: false,
            timer: 1000
          })
        },

          err => {
            this.showAlert(err);
          }
      );
    }

  }
}
