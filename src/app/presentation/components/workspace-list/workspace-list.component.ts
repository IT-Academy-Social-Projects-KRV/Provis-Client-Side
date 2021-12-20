import { Component, OnInit } from '@angular/core';
import { WorkspaceService } from 'src/app/core/services/workspace.service';
import { UserWorkspace } from 'src/app/core/models/userWorkspaceList';


@Component({
  selector: 'app-workspace-list',
  templateUrl: './workspace-list.component.html',
  styleUrls: ['./workspace-list.component.css']
})
export class WorkspaceListComponent implements OnInit {
  userWorkspaceList: UserWorkspace[];
  constructor(private workspaceService: WorkspaceService) {}

  ngOnInit() {
    this.workspaceService.getUserWorkspace().subscribe((data: UserWorkspace[]) => {
      this.userWorkspaceList = data;
      console.log(data);
      
    });
  }

}
