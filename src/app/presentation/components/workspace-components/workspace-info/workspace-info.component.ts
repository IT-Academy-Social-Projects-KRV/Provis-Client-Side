import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { WorkspaceInfo } from 'src/app/core/models/workspace/workspaceInfo';
import { AlertService } from 'src/app/core/services/alerts.service';
import { DataShareService } from 'src/app/core/services/DataShare.service';
import { WorkspaceService } from 'src/app/core/services/workspace.service';

@Component({
  selector: 'app-workspace-info',
  templateUrl: './workspace-info.component.html',
  styleUrls: ['./workspace-info.component.css']
})
export class WorkspaceInfoComponent implements OnInit {

  protected routeSub: Subscription;
  workspace: WorkspaceInfo;
  workspaceId: number;
  isOwner: boolean;

  constructor(private route: ActivatedRoute, 
    public dialog: MatDialog,
    private router: Router, 
    private alertService: AlertService,
    private workspaceServise: WorkspaceService,
    private dataShare: DataShareService) {}

  ngOnInit() {
    this.route.parent?.params.subscribe(
      (params) =>
      {
        this.workspaceId = Number(params['id']);
       });

    this.dataShare.workspaceInfo.subscribe((data: WorkspaceInfo) => {
      this.workspace = data;
      if (this.workspace.role == 1) {
        this.isOwner = true
      }
    });
  }
  
  async leave (){
    if  (await this.alertService.confirmMessage('You will be deleted from all workspace tasks!', 
      'Are you sure?', 
      'Yes, leave!'))
    {
    this.alertService.successMessage();
    this.workspaceServise.leaveFromWorkspace(this.workspaceId).subscribe(
      () => { 
        this.router.navigate(['/user/workspaces']);
      })
    }
  }
}
