import { colorWorkspaceCardArray } from '../../../../configs/colorsForWorkspaceCards';
import { WorkspaceCreateComponent } from '../../workspace-components/workspace-create/workspace-create.component';
import { Component, OnInit } from '@angular/core';
import { WorkspaceCard } from 'src/app/core/models/workspace/workspaceCard';
import { MatDialog } from '@angular/material/dialog';
import { WorkspaceService } from 'src/app/core/services/workspace.service';

@Component({
  selector: 'app-user-workspace-list',
  templateUrl: './user-workspace-list.component.html',
  styleUrls: ['./user-workspace-list.component.css']
})
export class UserWorkspaceListComponent implements OnInit {
  
  userWorkspaceList: WorkspaceCard[];
  cardColors = colorWorkspaceCardArray;
   
  constructor(private workspaceService: WorkspaceService, public dialog: MatDialog) {}
  
  ngOnInit() {
    this.workspaceService.getUserWorkspace().subscribe((data: WorkspaceCard[]) => {
      this.userWorkspaceList = data;
    });
  }

  modalCreateWorkspace() {
    let dialogRef = this.dialog.open(WorkspaceCreateComponent, {autoFocus: false});
    dialogRef.componentInstance.isAdded.subscribe(data => {
      if(data) 
        dialogRef.close();
    });
  } 
}
