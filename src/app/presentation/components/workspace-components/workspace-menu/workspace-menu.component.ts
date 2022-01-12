import { WorkspaceInfo } from '../../../../core/models/workspace/workspaceInfo';
import { WorkspaceTaskCreateComponent } from '../task-components/workspace-task-create/workspace-task-create.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { DataShareService } from 'src/app/core/services/DataShare.service';
import { concatMap, Observable } from 'rxjs';

@Component({
  selector: 'app-workspace-menu',
  templateUrl: './workspace-menu.component.html',
  styleUrls: ['./workspace-menu.component.css']
})
export class WorkspaceMenuComponent implements OnInit {
  
  userWorkspaceInfo: WorkspaceInfo = new WorkspaceInfo();
  roleName: string;

  constructor(
    public dialog: MatDialog,
    private dataShareService: DataShareService) { }
  
  ngOnInit() {
    this.dataShareService.workspaceInfo.subscribe(data=>{
      this.userWorkspaceInfo = data;
   });

   this.dataShareService.getWorkspaceRoleName(this.userWorkspaceInfo.role).subscribe(role=>{this.roleName=role});
  }

  modalCreateTask() {
    let dialogRef = this.dialog.open(WorkspaceTaskCreateComponent, {autoFocus: false});
    dialogRef.componentInstance.workspaceId = this.userWorkspaceInfo.id;
  }

  public getWorkspaceRoleName(roleId: number){
    console.log(roleId);
    this.dataShareService.workspaceRoles.asObservable().subscribe(data=>{console.log(data)})
  }
}
