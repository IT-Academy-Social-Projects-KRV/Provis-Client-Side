import { Component, Input, OnInit } from '@angular/core';
import { TaskAttachment } from 'src/app/core/models/task/taskAttachment';
import { UserService } from 'src/app/core/services/user.service';
import { saveAs } from 'file-saver';
import { environment } from 'src/environments/environment';
import { AlertService } from 'src/app/core/services/alerts.service';

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

  attachments: TaskAttachment[] = [
    {id: 1, name: 'File1safsdfdgdfghfhhgfhfdadsjlfsdhfjdhgsjkdlfhgjlhgfsdjklhgldfg;hsfdjkgkdfghfdjfsgafdkg[jrfa[po[gj]]].type'},
    {id: 2, name: 'File2.type'},
    {id: 3, name: 'File3.type'},
    {id: 4, name: 'File4.type'},
    {id: 5, name: 'File5.type'}
  ];

  constructor(private userService: UserService, private alertService: AlertService) { }

  ngOnInit() {
  }

  getAttachmentList() {

  }

  uploadAttachment(event: any) {

    let file = event.target.files[0] as File;

    if(file.size > this.maxFileSize * 1024 * 1024)
    {
      this.alertService.errorMessage('Max size is ' + this.maxFileSize + ' Mb', 'Error')
      return;
    }

  }

  downloadFile(attachmentId: number) {
    this.userService.getUserImage().subscribe(file => {
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
  }
}
