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

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    
    this.taskService.gethistoryTask(this.taskId).subscribe((data: TaskHistory[]) => {
      this.history = data;
    });

  }

}
