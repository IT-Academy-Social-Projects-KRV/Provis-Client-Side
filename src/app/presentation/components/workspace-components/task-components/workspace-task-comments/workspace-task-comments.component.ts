import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommentCreate } from 'src/app/core/models/comment/commentCreate';
import { CommentEdit } from 'src/app/core/models/comment/commentEdit';
import { TaskComment } from 'src/app/core/models/comment/taskComment';
import { AlertService } from 'src/app/core/services/alerts.service';
import { CommentService } from 'src/app/core/services/comment.service';

@Component({
  selector: 'app-workspace-task-comments',
  templateUrl: './workspace-task-comments.component.html',
  styleUrls: ['./workspace-task-comments.component.css']
})
export class WorkspaceTaskCommentsComponent implements OnInit {

  @Input() public taskId: number;
  @Input() public workspaceId: number;

  commentInfo: FormGroup;
  commentCreate: CommentCreate = new CommentCreate();
  commentEdit: CommentEdit = new CommentEdit();
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
      this.commentCreate = Object.assign({}, this.commentInfo.value);
      this.commentCreate.taskId = this.taskId;
      this.commentCreate.workspaceId = this.workspaceId;
      this.commentService.createComment(this.commentCreate).subscribe(
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

  deleteComment(commentId: number){
    this.commentService.deleteComment(commentId, this.workspaceId).subscribe(
      async () => {
        if(await this.alertService.confirmMessage(
          "Are you shure to delete this comment?",
          "Delete comment",
          "Delete")){
          this.ngOnInit();
        }
      },
      err => {
        this.alertService.errorMessage(err);
      }
    )
  }

  editComment(){

  }
}
