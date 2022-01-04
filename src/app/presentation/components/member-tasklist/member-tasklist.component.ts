import { CreateTaskComponent } from './../create-task/create-task.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-member-tasklist',
  templateUrl: './member-tasklist.component.html',
  styleUrls: ['./member-tasklist.component.css']
})

export class MemberTasklistComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  modalCreateTask() {
    let dialogRef = this.dialog.open(CreateTaskComponent);
  } 

}
