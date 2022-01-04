import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserInviteComponent } from '../user-invite/user-invite.component';
import { WorkspaceService } from 'src/app/core/services/workspace.service';
import { UserInvites } from 'src/app/core/models/userInviteList';
import { WorkspaceMembers } from 'src/app/core/models/workspaceUsersList';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-member-managment',
  templateUrl: './member-managment.component.html',
  styleUrls: ['./member-managment.component.css']
})
export class MemberManagmentComponent implements OnInit {

  protected routeSub: Subscription;
  workspaceId: number;
  workspaceActiveInviteInfo: UserInvites[];
  workspaceUserList: WorkspaceMembers[];

  constructor(public dialog: MatDialog, private route: ActivatedRoute, private router: Router, private workspaceServise: WorkspaceService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.workspaceId = Number(this.route.snapshot.paramMap.get('id'))
    this.workspaceServise.getWorkspaceUserList(this.workspaceId).subscribe(data=>{
      this.workspaceUserList=data;})
  })}
  
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
}
