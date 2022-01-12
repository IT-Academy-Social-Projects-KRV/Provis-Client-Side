import { colorWorkspaceCardArray } from '../../../../configs/colorsForWorkspaceCards';
import { WorkspaceCreateComponent } from '../../workspace-components/workspace-create/workspace-create.component';
import { Component, OnInit } from '@angular/core';
import { WorkspaceCard } from 'src/app/core/models/workspace/workspaceCard';
import { MatDialog } from '@angular/material/dialog';
import { WorkspaceService } from 'src/app/core/services/workspace.service';
import { DataShareService } from 'src/app/core/services/DataShare.service';
import { WorkspaceRole } from 'src/app/core/models/workspace/workspaceRole';

@Component({
  selector: 'app-user-workspace-list',
  templateUrl: './user-workspace-list.component.html',
  styleUrls: ['./user-workspace-list.component.css']
})
export class UserWorkspaceListComponent implements OnInit {
  
  userWorkspaceList: WorkspaceCard[];
  cardColors = colorWorkspaceCardArray;
  public workspaceRoles: WorkspaceRole[];
   
  constructor(private workspaceService: WorkspaceService, public dialog: MatDialog, private dataShareService: DataShareService) {}
  
  ngOnInit() {
    this.workspaceService.getUserWorkspace().subscribe((data: WorkspaceCard[]) => {
      this.userWorkspaceList = data;
    });

    this.dataShareService.workspaceRoles.subscribe((data)=>{
      this.workspaceRoles = data;
    });
  }

  modalCreateWorkspace() {
    let dialogRef = this.dialog.open(WorkspaceCreateComponent, {autoFocus: false});
    dialogRef.componentInstance.isAdded.subscribe(data => {
      if(data) 
        dialogRef.close();
    });
  }

  getWorkspaceRoleName(roleId: number): string {
    return this.workspaceRoles[this.workspaceRoles.findIndex(x=>x.id == roleId)].name;
  }
}
