import { WorkspaceService } from 'src/app/core/services/workspace.service';
import { MatAccordion } from '@angular/material/expansion';
import { WorkspaceTaskCreateComponent } from '../workspace-task-create/workspace-task-create.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WorkspaceMembers } from 'src/app/core/models/workspace/workspaceMembers';

@Component({
  selector: 'app-workspace-task-list',
  templateUrl: './workspace-task-list.component.html',
  styleUrls: ['./workspace-task-list.component.css']
})

export class WorkspaceTaskListComponent implements OnInit {

  @ViewChild(MatAccordion) accordion: MatAccordion;

  workspaceUserList: WorkspaceMembers[];
  workspaceId: number;
  
  userNull = {
    id:"",
    userName: "Unassigned task",
    role: 1,
    rowVersion: new Uint8Array
  };

  constructor(public dialog: MatDialog, private route: ActivatedRoute, private workspaceService: WorkspaceService) { }

  ngOnInit() {
    this.route.parent?.params.subscribe((params) => { 
      this.workspaceId = Number(params['id'])
    });
    this.workspaceService.getWorkspaceUserList(this.workspaceId).subscribe((data:WorkspaceMembers[])=>{
      this.workspaceUserList = data;
      this.workspaceUserList.push(this.userNull);
    });

  }

  modalCreateTask() {
    let dialogRef = this.dialog.open(WorkspaceTaskCreateComponent, {autoFocus: false});
    dialogRef.componentInstance.workspaceId = this.workspaceId;
  }

}
