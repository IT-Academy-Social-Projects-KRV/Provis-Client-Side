import { CreateTaskComponent } from './../create-task/create-task.component';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-leftmenu',
  templateUrl: './user-leftmenu.component.html',
  styleUrls: ['./user-leftmenu.component.css']
})
export class UserLeftmenuComponent implements OnInit {
  
  workspaceId: number;

  constructor(private route: ActivatedRoute, public dialog: MatDialog) { }
  
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.workspaceId = Number(this.route.snapshot.paramMap.get('id'));
    });
  }

  modalCreateTask() {
    let dialogRef = this.dialog.open(CreateTaskComponent);
  } 

}
