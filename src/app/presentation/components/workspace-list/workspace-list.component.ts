import { AddWorkspaceComponent } from './../add-workspace/add-workspace.component';
import { Component, OnInit } from '@angular/core';
import { UserWorkspace } from 'src/app/core/models/userWorkspaceList';
import { MatDialog } from '@angular/material/dialog';

import { WorkspaceService } from 'src/app/core/services/workspace.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-workspace-list',
  templateUrl: './workspace-list.component.html',
  styleUrls: ['./workspace-list.component.css']
})
export class WorkspaceListComponent implements OnInit {
  
  userWorkspaceList: UserWorkspace[];
  colorArray: string[] = ['#666ec3','#8b3d3d','#4c9763','#3c3c3c','#974d0e','#529992'];
   
  constructor(private workspaceService: WorkspaceService, public dialog: MatDialog, private router: Router) {}
  
  ngOnInit() {
    this.workspaceService.getUserWorkspace().subscribe((data: UserWorkspace[]) => {
      this.userWorkspaceList = data;
    });
  }

  modalCreateWorkspace() {
    let dialogRef = this.dialog.open(AddWorkspaceComponent);
    dialogRef.componentInstance.isAdded.subscribe(data => {
      if(data) 
        dialogRef.close();
    });
  } 
}
