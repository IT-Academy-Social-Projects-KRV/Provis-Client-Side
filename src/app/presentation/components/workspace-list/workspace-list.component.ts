import { colorWorkspaceCardArray } from './../../../configs/colorsForWorkspaceCards';
import { AddWorkspaceComponent } from './../add-workspace/add-workspace.component';
import { Component, OnInit } from '@angular/core';
import { WorkspaceCard } from 'src/app/core/models/workspace/workspaceCard';
import { MatDialog } from '@angular/material/dialog';

import { WorkspaceService } from 'src/app/core/services/workspace.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-workspace-list',
  templateUrl: './workspace-list.component.html',
  styleUrls: ['./workspace-list.component.css']
})
export class WorkspaceListComponent implements OnInit {
  
  userWorkspaceList: WorkspaceCard[];
  cardColors = colorWorkspaceCardArray;
   
  constructor(private workspaceService: WorkspaceService, public dialog: MatDialog, private router: Router) {}
  
  ngOnInit() {
    this.workspaceService.getUserWorkspace().subscribe((data: WorkspaceCard[]) => {
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
