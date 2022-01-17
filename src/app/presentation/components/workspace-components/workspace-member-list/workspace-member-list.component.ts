import { userCardColor } from './../../../../configs/colorsForWorkspaceCards';
import { DataShareService } from 'src/app/core/services/DataShare.service';
import { UserWorkspaceInfo } from './../../../../core/models/user/userWorkspaceInfo';
import { WorkspaceService } from 'src/app/core/services/workspace.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WorkspaceRole } from 'src/app/core/models/workspace/workspaceRole';

@Component({
  selector: 'app-workspace-member-list',
  templateUrl: './workspace-member-list.component.html',
  styleUrls: ['./workspace-member-list.component.css']
})
export class WorkspaceMemberListComponent implements OnInit {

  workspaceId: number;
  userList: UserWorkspaceInfo[];
  workspaceRoles: WorkspaceRole[];
  userCardColor = userCardColor;

  constructor(
    private route: ActivatedRoute,
    private workspaceService: WorkspaceService,
    private dataShareService: DataShareService) { }

  ngOnInit() {
    this.route.parent?.params.subscribe((params) => {
      this.workspaceId = Number(params['id']);
      this.workspaceService.getWorkspaceUserInfo(this.workspaceId).subscribe(data=> {
        this.userList = data;
      })
      this.dataShareService.workspaceRoles.subscribe((data)=> {
        this.workspaceRoles = data;
      });
    });
  }

  getWorkspaceRoleName(roleId: number): string {
    return this.workspaceRoles[this.workspaceRoles.findIndex(x => x.id == roleId)].name;
  }
}
