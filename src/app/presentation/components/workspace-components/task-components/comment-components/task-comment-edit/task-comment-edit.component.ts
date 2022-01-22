import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommentEdit } from 'src/app/core/models/comment/commentEdit';
import { AlertService } from 'src/app/core/services/alerts.service';
import { CommentService } from 'src/app/core/services/comment.service';

@Component({
  selector: 'app-task-comment-edit',
  templateUrl: './task-comment-edit.component.html',
  styleUrls: ['./task-comment-edit.component.css']
})
export class TaskCommentEditComponent implements OnInit {

  editComemntForm: FormGroup;
  commentEdit: CommentEdit = new CommentEdit();

  @Input() public commentId: number;
  @Input() public workspaceId: number;
  @Output() public isAdded = new EventEmitter<boolean>(false);

  constructor(private formBuilder: FormBuilder,
    private commentService: CommentService,
    private alertService: AlertService) {
      this.editComemntForm = formBuilder.group({
        "CommentText": ['', Validators.maxLength(500)]
      });
     }

  ngOnInit() {
  }

  editComment(){
    if(this.editComemntForm.valid){
      this.commentEdit = Object.assign({}, this.editComemntForm.value);
      this.commentEdit.workspaceId = this.workspaceId;
      this.commentEdit.commentId = this.commentId;

      this.commentService.editComment(this.commentEdit).subscribe(
        () => {
          this.isAdded.emit(true);
        },
        err => {
          this.alertService.errorMessage(err);
          this.isAdded.emit(true);
        }
      )
    }
  }
}
