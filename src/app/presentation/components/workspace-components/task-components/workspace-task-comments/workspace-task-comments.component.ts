import { Component, Input, OnInit } from '@angular/core';
import { TaskComment } from 'src/app/core/models/task/taskComment';
import { CommentService } from 'src/app/core/services/comment.service.service';

@Component({
  selector: 'app-workspace-task-comments',
  templateUrl: './workspace-task-comments.component.html',
  styleUrls: ['./workspace-task-comments.component.css']
})
export class WorkspaceTaskCommentsComponent implements OnInit {

  @Input() public taskId: number;
  @Input() public workspaceId: number;

  comments: TaskComment[];

  constructor(private taskService: CommentService) { }

  ngOnInit() {
    this.taskService.getTaskComments(this.taskId,
      this.workspaceId).subscribe((data: TaskComment[]) => {
      this.comments = data;
    })
  }
}
