import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskWorkerRole } from 'src/app/core/models/task/taskWorkerRoles';
import { WorkspaceInfo } from 'src/app/core/models/workspace/workspaceInfo';
import { DataShareService } from 'src/app/core/services/dataShare.service';
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
    private dataShareService: DataShareService,
    private taskService: TaskService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(() => {

      let workspaceId = Number(this.route.snapshot.paramMap.get('id'));

      this.workspaceService.getWorkspaceInfo(workspaceId).subscribe((data: WorkspaceInfo) => {
        this.dataShareService.nextWorkspaceInfo(data);
      });

      this.taskService.getWorkerRole().subscribe((data: TaskWorkerRole[]) => {
        this.dataShareService.nextTaskRoles(data);
      });
    });
  }
}
