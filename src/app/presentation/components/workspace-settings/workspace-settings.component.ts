import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserInviteComponent } from '../user-invite/user-invite.component';

@Component({
  selector: 'app-workspace-settings',
  templateUrl: './workspace-settings.component.html',
  styleUrls: ['./workspace-settings.component.css']
})
export class WorkspaceSettingsComponent implements OnInit {
  
  protected routeSub: Subscription;
  workspaceId: number;

  constructor(private route: ActivatedRoute, public dialog: MatDialog) { }

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
