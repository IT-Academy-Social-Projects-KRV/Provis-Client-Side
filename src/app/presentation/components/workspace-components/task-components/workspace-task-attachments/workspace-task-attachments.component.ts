import { Component, Input, OnInit } from '@angular/core';
import { TaskAttachment } from 'src/app/core/models/task/taskAttachment';
import { saveAs } from 'file-saver';
import { environment } from 'src/environments/environment';
import { AlertService } from 'src/app/core/services/alerts.service';
import { TaskService } from 'src/app/core/services/task.service';
import { UnloadTaskAttachment } from 'src/app/core/models/task/uploadTaskAttachments';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-workspace-task-attachments',
  templateUrl: './workspace-task-attachments.component.html',
  styleUrls: ['./workspace-task-attachments.component.css']
})
export class WorkspaceTaskAttachmentsComponent implements OnInit {

  @Input() workspaceId: number;
  @Input() taskId: number;

  maxFileNumber: number = environment.attachmentsSettings.maxFileNumber;
  maxFileSize: number = environment.attachmentsSettings.maxFileSize;

  attachments: TaskAttachment[] = [];
  attachmentPreview: SafeUrl[] = [];

  constructor(private sanitizer: DomSanitizer, 
    private taskService: TaskService, 
    private alertService: AlertService) { }

  ngOnInit() {
    this.getAttachmentList();
  }

  setAttachmentPreviewList(){
    for(let attachment of this.attachments){
      this.setAttachmentPreview(attachment);
    }
  } 

  setAttachmentPreview(attachment: TaskAttachment) {
    if(attachment.contentType.startsWith('image')) {
      this.taskService.getAttachmentPreview(this.workspaceId, attachment.id).subscribe((data: Blob) => {
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

  getAttachmentList() {
    this.taskService.getAttachmentList(this.workspaceId, this.taskId).subscribe((data) =>{
      this.attachments = data;
    });
  }

  uploadAttachment(event: any) {

    let file = event.target.files[0] as File;

    if(file.size > this.maxFileSize * 1024 * 1024)
    {
      this.alertService.errorMessage('Max size is ' + this.maxFileSize + ' Mb', 'Error')
      return;
    }

    let uploadFile = new UnloadTaskAttachment();
    uploadFile.workspaceId = this.workspaceId;
    uploadFile.taskId = this.taskId;
    uploadFile.attachment = file;

    this.taskService.uploadAttachment(uploadFile).subscribe((data: TaskAttachment)=>{
      this.setAttachmentPreview(data);
      this.attachments.push(data);
    },
    (err) => {
      this.alertService.errorMessage(err);
    })

  }

  downloadFile(attachmentId: number) {
    this.taskService.getAttachment(this.workspaceId, attachmentId).subscribe(file => {
      saveAs(file, file.name);
    });
  }

  getAttacmentName(name: string): string {

    if(name.length<10)
      return name;
    else
      return name.substring(0, 10) + '...';
  }

  deleteAttachment(attachmentId: number) {
    this.taskService.deleteAttachment(this.workspaceId, attachmentId).subscribe(() => {
      this.attachments.splice(this.attachments.findIndex(x=>x.id == attachmentId), 1);
    });
  }
}
