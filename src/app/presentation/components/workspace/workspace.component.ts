import { CreateTaskComponent } from './../create-task/create-task.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';


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
  modalCreateTask() {
    let dialogRef = this.dialog.open(CreateTaskComponent);
    dialogRef.componentInstance.workspaceId = this.workspaceId;
  }

}
