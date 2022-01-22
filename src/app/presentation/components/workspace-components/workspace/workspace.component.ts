import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskWorkerRole } from 'src/app/core/models/task/taskWorkerRoles';
import { WorkspaceInfo } from 'src/app/core/models/workspace/workspaceInfo';
import { WorkspaceRole } from 'src/app/core/models/workspace/workspaceRole';
import { DataShareService } from 'src/app/core/services/DataShare.service';
import { TaskService } from 'src/app/core/services/task.service';
import { WorkspaceService } from 'src/app/core/services/workspace.service';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.css']
})
export class WorkspaceComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private workspaceService: WorkspaceService,
    private dataShareSrervice: DataShareService,
    private taskService: TaskService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(() => {

      let workspaceId = Number(this.route.snapshot.paramMap.get('id'));

      this.workspaceService.getWorkspaceInfo(workspaceId).subscribe((data: WorkspaceInfo) => {
        this.dataShareSrervice.nextWorkspaceInfo(data);
      });

      this.taskService.getWorkerRole().subscribe((data: TaskWorkerRole[]) => {
        this.dataShareSrervice.nextTaskRoles(data);
      });
    });
  }
}
