import { Component, Input, OnInit } from '@angular/core';
import { TaskAttachment } from 'src/app/core/models/task/taskAttachment';
import { UserService } from 'src/app/core/services/user.service';
import { saveAs } from 'file-saver';
import { environment } from 'src/environments/environment';
import { AlertService } from 'src/app/core/services/alerts.service';
import { TaskService } from 'src/app/core/services/task.service';
import { UnloadTaskAttachment } from 'src/app/core/models/task/uploadTaskAttachments';

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

  constructor(private taskService: TaskService, private alertService: AlertService) { }

  ngOnInit() {
    this.getAttachmentList();
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

    this.taskService.uploadAttachment(uploadFile).subscribe((data)=>{
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

    if(name.length<30)
      return name;
    else
      return name.substring(0, 30) + '...';
  }

  deleteAttachment(attachmentId: number) {
    this.taskService.deleteAttachment(this.workspaceId, attachmentId).subscribe(() => {
      this.attachments.splice(this.attachments.findIndex(x=>x.id == attachmentId), 1);
    });
  }
}
