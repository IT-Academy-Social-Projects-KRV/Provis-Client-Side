import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CommentCreate } from 'src/app/core/models/comment/commentCreate';
import { TaskComment } from 'src/app/core/models/comment/taskComment';
import { AlertService } from 'src/app/core/services/alerts.service';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { CommentService } from 'src/app/core/services/comment.service';
import { TaskCommentEditComponent } from '../task-comment-edit/task-comment-edit.component';

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
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private authService: AuthenticationService) {
      this.commentInfo = formBuilder.group({
        "CommentText": ["", [Validators.maxLength(500)]]
      });
      this.commentInfo.setErrors(null);
    }

  ngOnInit() {
    this.commentService.getTaskComments(this.taskId,
      this.workspaceId).subscribe((data: TaskComment[]) => {
      this.comments = data;
    })
  }

   async deleteComment(commentId: number){
    if(await this.alertService.confirmMessage("Are you shure to delete this comment?",
    "Delete comment","Delete")){
      this.commentService.deleteComment(commentId, this.workspaceId).subscribe(
        () => {
          this.comments.splice(this.comments.findIndex(x => x.id == commentId), 1);
        },
        err => {
          this.alertService.errorMessage(err);
        }
      )
    }
  }

  editComment(commentId: number){
    let dialog = this.dialog.open(TaskCommentEditComponent);
    dialog.componentInstance.commentId = commentId;
    dialog.componentInstance.workspaceId = this.workspaceId;
    dialog.componentInstance.editComemntForm.setValue(
      {
        "CommentText": this.comments.find(x => x.id == commentId)?.commentText
      });
    dialog.componentInstance.isAdded.subscribe(data => {
      if(data){
        let index = this.comments.findIndex(x  => x.id == commentId);
        this.comments[index].commentText = dialog.componentInstance.editedText;
        dialog.close();
      }
    });
  }

  createComment(){
    if(this.commentInfo.get("CommentText")?.value){
      this.commentCreate = Object.assign({}, this.commentInfo.value);
      this.commentCreate.taskId = this.taskId;
      this.commentCreate.workspaceId = this.workspaceId;

      this.commentService.createComment(this.commentCreate).subscribe(
        (data) => {
          data.userName = this.authService.currentUser.username;
          this.comments.push(data)

          this.alertService.successMessage();
          this.commentInfo.reset();
        },
        err => {
          this.alertService.errorMessage(err);
        }
      )
    }
  }
}
