import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommentCreate } from 'src/app/core/models/comment/commentCreate';
import { TaskComment } from 'src/app/core/models/comment/taskComment';
import { AlertService } from 'src/app/core/services/alerts.service';
import { CommentService } from 'src/app/core/services/comment.service';

@Component({
  selector: 'app-task-comments',
  templateUrl: './task-comments.component.html',
  styleUrls: ['./task-comments.component.css']
})
export class TaskCommentsComponent implements OnInit {

  @Input() public taskId: number;
  @Input() public workspaceId: number;
  comments: TaskComment[];

  commentInfo: FormGroup;
  commentCreate: CommentCreate = new CommentCreate();

  constructor(private commentService: CommentService,
    private alertService: AlertService,
    private formBuilder: FormBuilder) {
      this.commentInfo = formBuilder.group({
        "CommentText": ["", [Validators.maxLength(50)]]
      });
    }

  ngOnInit() {
    this.updateCommentList();
  }

  updateCommentList(){
    this.commentService.getTaskComments(this.taskId,
      this.workspaceId).subscribe((data: TaskComment[]) => {
      this.comments = data;
    })
  }

  deleteComment(commentId: number){
    this.commentService.deleteComment(commentId, this.workspaceId).subscribe(
      async () => {
        if(await this.alertService.confirmMessage(
          "Are you shure to delete this comment?",
          "Delete comment",
          "Delete")){
          this.updateCommentList();
        }
      },
      err => {
        this.alertService.errorMessage(err);
      }
    )
  }

  editComment(commentId: number){

  }

  createComment(){
    if(this.commentInfo.valid){
      this.commentCreate = Object.assign({}, this.commentInfo.value);
      this.commentCreate.taskId = this.taskId;
      this.commentCreate.workspaceId = this.workspaceId;
      this.commentService.createComment(this.commentCreate).subscribe(
        () => {
          this.alertService.successMessage();
          this.updateCommentList();
        },
        err => {
          this.alertService.errorMessage(err);
        }
      )
    }
  }
}
