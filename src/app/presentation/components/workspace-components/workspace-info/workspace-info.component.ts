import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { numbers } from '@material/slider';
import { Subscription } from 'rxjs';
import { WorkspaceInfo } from 'src/app/core/models/workspace/workspaceInfo';
import { AlertService } from 'src/app/core/services/alerts.service';
import { DataShareService } from 'src/app/core/services/DataShare.service';
import { WorkspaceService } from 'src/app/core/services/workspace.service';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

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
  isLoading: boolean = false;
  src1: SafeResourceUrl;
  src2: SafeResourceUrl;
  src3: SafeResourceUrl;

  constructor(private route: ActivatedRoute,
    public dialog: MatDialog,
    private router: Router,
    private alertService: AlertService,
    private workspaceServise: WorkspaceService,
    private dataShare: DataShareService,
    private domSanitizer: DomSanitizer) {}

  ngOnInit() {
    this.isLoading = true;

    this.route.parent?.params.subscribe(
      (params) =>
      {
        this.workspaceId = Number(params['id']);
      });

      this.src1 = this.domSanitizer.bypassSecurityTrustResourceUrl(
        'http://localhost:3000/d-solo/o2AWvl1nz/grafana-provis?orgId=1&var-workspace=' +
       this.workspaceId.toString()+ '&panelId=4&refresh=15s&from=now-24h');
      this.src2 = this.domSanitizer.bypassSecurityTrustResourceUrl(
        'http://localhost:3000/d-solo/o2AWvl1nz/grafana-provis?orgId=1&var-workspace=' +
       this.workspaceId.toString()+ '&panelId=6&refresh=15s&from=now-24h');
      this.src3 =this.domSanitizer.bypassSecurityTrustResourceUrl(
        'http://localhost:3000/d-solo/o2AWvl1nz/grafana-provis?orgId=1&var-workspace=' +
       this.workspaceId.toString() + '&panelId=8&refresh=15s&from=now-24h');

       this.dataShare.workspaceInfo.subscribe((data: WorkspaceInfo) => {
         this.workspace = data;
         if (this.workspace.role == 1) {
           this.isOwner = true
          }
        });

     this.isLoading = false;
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
