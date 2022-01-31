import { delay } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';
import { TaskHistory } from 'src/app/core/models/task/taskHistory';
import { TaskService } from 'src/app/core/services/task.service';

@Component({
  selector: 'app-workspace-task-history',
  templateUrl: './workspace-task-history.component.html',
  styleUrls: ['./workspace-task-history.component.css'],
})
export class WorkspaceTaskHistoryComponent implements OnInit {

  @Input() taskId: number;
  history: TaskHistory[];
  isLoading: boolean = false;

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.isLoading = true;
    this.taskService.gethistoryTask(this.taskId).subscribe((data: TaskHistory[]) => {
      this.history = data;
      this.isLoading = false;
    });
  }

}
