import { CommentAttachment } from './../../../../../../core/models/comment/commentAttachment';
import { delay } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CommentCreate } from 'src/app/core/models/comment/commentCreate';
import { TaskComment } from 'src/app/core/models/comment/taskComment';
import { AlertService } from 'src/app/core/services/alerts.service';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { CommentService } from 'src/app/core/services/comment.service';
import { TaskCommentEditComponent } from '../task-comment-edit/task-comment-edit.component';
import * as saveAs from 'file-saver';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-task-comments',
  templateUrl: './task-comments.component.html',
  styleUrls: ['./task-comments.component.css']
})
export class TaskCommentsComponent implements OnInit {

  @Input() public taskId: number;
  @Input() public workspaceId: number;

  comments: TaskComment[]=[];
  commentInfo: FormGroup;
  commentCreate: CommentCreate = new CommentCreate();
  isLoading: boolean = false;

  constructor(private sanitizer: DomSanitizer,
    private commentService: CommentService,
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
    this.getCommentsAndAttachments();
  }

   async deleteComment(commentId: number) {
    if(await this.alertService.confirmMessage("Are you sure to delete this comment?",
      "Delete comment","Delete")) {
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

  getCommentsAndAttachments()
  {
    this.isLoading = true;
    this.commentService.getTaskComments(this.taskId,
      this.workspaceId).subscribe((data: TaskComment[]) => {
        this.comments = data;
        this.comments.forEach(x=>{
          this.commentService.getAttachmentList(this.workspaceId, x.id).subscribe((data: CommentAttachment[])=>
          {
              x.attachments=data;
              this.setAttachmentPreviewList();
              this.isLoading = false;
          })
        });
    });
  }
  editComment(commentId: number) {
    let dialog = this.dialog.open(TaskCommentEditComponent);
    dialog.componentInstance.commentId = commentId;
    dialog.componentInstance.workspaceId = this.workspaceId;
    dialog.componentInstance.editComemntForm.setValue(
      {
        "CommentText": this.comments.find(x => x.id == commentId)?.commentText
      });
    dialog.componentInstance.isAdded.subscribe(data => {
      if(data) {
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
          this.comments.push(data);

          this.commentInfo.reset();
        },
        err => {
          this.alertService.errorMessage(err);
        }
      )
    }
  }

  deleteAttachment(attachmentId: number, comment: TaskComment) {
    this.commentService.deleteAttachment(this.workspaceId, attachmentId).subscribe(() => {
      comment.attachments.splice(comment.attachments.findIndex(x=>x.id == attachmentId), 1);
    });
  }

  downloadFile(attachmentId: number) {
    this.commentService.getAttachment(this.workspaceId, attachmentId).subscribe(file => {
      saveAs(file, file.name);
    });
  }

  getAttachmentName(name: string): string {

    if(name.length<10)
      return name;
    else
      return name.substring(0, 10) + '...';
  }

  setAttachmentPreview(attachment: CommentAttachment) {
    if(attachment.contentType.startsWith('image')) {
      this.commentService.getAttachmentPreview(this.workspaceId, attachment.id).subscribe((data: Blob) => {
        const blob = new Blob([data], { type: data.type });
        const unsafeImg = URL.createObjectURL(blob);
        attachment.preview = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      })
    }
    else if(attachment.contentType.startsWith('application/msword') ||
            attachment.contentType.startsWith('application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
              attachment.preview = "assets/img/word-preview.png";
    }
    else if(attachment.contentType.startsWith('application/vnd.ms-excel') ||
            attachment.contentType.startsWith('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')) {
      attachment.preview = "assets/img/excel-preview.png";
    }
    else if(attachment.contentType.startsWith('application/pdf')) {
      attachment.preview = "assets/img/pdf-preview.png";
    }
    else if(attachment.contentType.startsWith('text/plain')) {
      attachment.preview = "assets/img/txt-preview.png";
    }
    else {
      attachment.preview = "assets/img/default-preview.png";
    }
  }

  setAttachmentPreviewList(){
    for(let comment of this.comments)
      for(let attachment of comment.attachments){
        this.setAttachmentPreview(attachment);
      }
  }
  checkAttachments(comment: TaskComment)
  {
    console.log(comment.attachments!==undefined && comment.attachments.length > 0);
    return comment.attachments!==undefined && comment.attachments.length > 0;
  }
}
