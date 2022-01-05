import { CreateTaskComponent } from './../create-task/create-task.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-member-tasklist',
  templateUrl: './member-tasklist.component.html',
  styleUrls: ['./member-tasklist.component.css']
})

export class MemberTasklistComponent implements OnInit {

  workspaceId: number;
  constructor(public dialog: MatDialog, private route: ActivatedRoute,) { }

  ngOnInit() {
    this.route.parent?.params.subscribe(
      (params) =>
      {this.workspaceId = Number(params['id']);
    })
  }

  modalCreateTask() {
    let dialogRef = this.dialog.open(CreateTaskComponent);
    dialogRef.componentInstance.workspaceId = this.workspaceId;
  } 


}
