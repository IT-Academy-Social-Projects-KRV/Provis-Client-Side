import { WorkspaceService } from 'src/app/core/services/workspace.service';
import { MatAccordion } from '@angular/material/expansion';
import { TaskService } from './../../../core/services/task.service';
import { CreateTaskComponent } from './../create-task/create-task.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WorkspaceMembers } from 'src/app/core/models/workspace/workspaceMembers';

@Component({
  selector: 'app-member-tasklist',
  templateUrl: './member-tasklist.component.html',
  styleUrls: ['./member-tasklist.component.css']
})

export class MemberTasklistComponent implements OnInit {

  @ViewChild(MatAccordion) accordion: MatAccordion;

  workspaceUserList: WorkspaceMembers[];
  workspaceId: number;
  
  userNull = {
    id:"",
    userName: "Unassigned task",
    role:'1'
  };

  constructor(public dialog: MatDialog, private userTask: TaskService, private route: ActivatedRoute, private workspaceService: WorkspaceService) { }

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
    let dialogRef = this.dialog.open(CreateTaskComponent, {autoFocus: false});
    dialogRef.componentInstance.workspaceId = this.workspaceId;
  }

}
