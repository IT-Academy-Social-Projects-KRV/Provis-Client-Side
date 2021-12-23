import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserInviteComponent } from '../user-invite/user-invite.component';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.css']
})
export class WorkspaceComponent implements OnInit {

  protected routeSub: Subscription;
  workspaceId: number;

  constructor(private route: ActivatedRoute, public dialog: MatDialog) { }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      this.workspaceId = params['id'];
    });
  }
  
  ngOnDestroy(){
    this.routeSub.unsubscribe();
  }

  modalInvites() {
    let dialogRef = this.dialog.open(UserInviteComponent);
    dialogRef.componentInstance.workspaceId = this.workspaceId;
  }
}
