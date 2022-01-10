import { WorkspaceInfo } from '../../../../core/models/workspace/workspaceInfo';
import { UserService } from 'src/app/core/services/user.service';
import { WorkspaceTaskCreateComponent } from '../task-components/workspace-task-create/workspace-task-create.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-workspace-menu',
  templateUrl: './workspace-menu.component.html',
  styleUrls: ['./workspace-menu.component.css']
})
export class WorkspaceMenuComponent implements OnInit {
  
  workspaceId: number;
  userWorkspaceInfo = new WorkspaceInfo;

  constructor(private route: ActivatedRoute, public dialog: MatDialog, private userService: UserService) { }
  
  ngOnInit() {
    this.route.paramMap.subscribe(() => {
      this.workspaceId = Number(this.route.snapshot.paramMap.get('id'));
    });

    this.userService.userWorkspaceInfo(this.workspaceId).subscribe((data: WorkspaceInfo) => {
      this.userWorkspaceInfo = data;
    });

  }
  
  modalCreateTask() {
    let dialogRef = this.dialog.open(WorkspaceTaskCreateComponent, {autoFocus: false});
    dialogRef.componentInstance.workspaceId = this.workspaceId;
  } 

}
