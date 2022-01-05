import { userWorkspaceInfo } from './../../../core/models/userWorkspaceInfo';
import { UserService } from 'src/app/core/services/user.service';
import { CreateTaskComponent } from './../create-task/create-task.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-leftmenu',
  templateUrl: './user-leftmenu.component.html',
  styleUrls: ['./user-leftmenu.component.css']
})
export class UserLeftmenuComponent implements OnInit {
  
  workspaceId: number;
  userWorkspaceInfo = new userWorkspaceInfo;

  constructor(private route: ActivatedRoute, public dialog: MatDialog, private userService: UserService) { }
  
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.workspaceId = Number(this.route.snapshot.paramMap.get('id'));
    });

    this.userService.userWorkspaceInfo(this.workspaceId).subscribe((data: userWorkspaceInfo) => {
      this.userWorkspaceInfo = data;
    });

  }
  
  modalCreateTask() {
    let dialogRef = this.dialog.open(CreateTaskComponent);
    dialogRef.componentInstance.workspaceId = this.workspaceId;
  } 

}
