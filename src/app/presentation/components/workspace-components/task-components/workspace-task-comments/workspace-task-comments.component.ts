import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommentCreate } from 'src/app/core/models/comment/commentCreate';
import { TaskComment } from 'src/app/core/models/comment/taskComment';
import { AlertService } from 'src/app/core/services/alerts.service';
import { CommentService } from 'src/app/core/services/comment.service.service';

@Component({
  selector: 'app-workspace-task-comments',
  templateUrl: './workspace-task-comments.component.html',
  styleUrls: ['./workspace-task-comments.component.css']
})
export class WorkspaceTaskCommentsComponent implements OnInit {

  @Input() public taskId: number;
  @Input() public workspaceId: number;

  commentInfo: FormGroup;
  comment: CommentCreate = new CommentCreate();
  comments: TaskComment[];

  constructor(private commentService: CommentService,
    private alertService: AlertService,
    private formBuilder: FormBuilder) {
      this.commentInfo = formBuilder.group({
        "CommentText": ["", [Validators.maxLength(50)]]
      });
    }

  ngOnInit() {
    this.commentService.getTaskComments(this.taskId,
      this.workspaceId).subscribe((data: TaskComment[]) => {
      this.comments = data;
    })
  }

  createComment(){
    if(this.commentInfo.valid){
      this.comment = Object.assign({}, this.commentInfo.value);
      this.comment.taskId = this.taskId;
      this.comment.workspaceId = this.workspaceId;
      this.commentService.createComment(this.comment).subscribe(
        () => {
          this.alertService.successMessage();
          this.ngOnInit();
        },
        err => {
          this.alertService.errorMessage(err);
        }
      )
    }
  }
}
