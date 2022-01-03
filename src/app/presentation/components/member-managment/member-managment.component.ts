import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserInviteComponent } from '../user-invite/user-invite.component';
import { WorkspaceService } from 'src/app/core/services/workspace.service';
import { UserWorkspace } from 'src/app/core/models/userWorkspaceList';
import { UserInvite } from 'src/app/core/models/userInvite';
import { UserInvites } from 'src/app/core/models/userInviteList';


@Component({
  selector: 'app-member-managment',
  templateUrl: './member-managment.component.html',
  styleUrls: ['./member-managment.component.css']
})
export class MemberManagmentComponent implements OnInit {

  protected routeSub: Subscription;
  workspaceId: number;
  workspaceActiveInviteInfo: UserInvites[];

  constructor(public dialog: MatDialog, private route: ActivatedRoute, private workspaceServise: WorkspaceService) { }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      this.workspaceId = params['id'];
    });
   }

  modalInvites() {
    let dialogRef = this.dialog.open(UserInviteComponent);
    dialogRef.componentInstance.workspaceId = this.workspaceId;
  }
}
