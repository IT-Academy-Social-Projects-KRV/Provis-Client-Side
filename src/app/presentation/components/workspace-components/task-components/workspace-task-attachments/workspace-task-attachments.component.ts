import { Component, Input, OnInit } from '@angular/core';
import { TaskAttachment } from 'src/app/core/models/task/taskAttachment';
import { UserService } from 'src/app/core/services/user.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-workspace-task-attachments',
  templateUrl: './workspace-task-attachments.component.html',
  styleUrls: ['./workspace-task-attachments.component.css']
})
export class WorkspaceTaskAttachmentsComponent implements OnInit {

  @Input() workspaceId: number;
  @Input() taskId: number;

  attachments: TaskAttachment[] = [
    {id: 1, name: 'File1safsdfdgdfghfhhgfhfd.type'},
    {id: 2, name: 'File2.type'},
    {id: 3, name: 'File3.type'},
    {id: 4, name: 'File4.type'},
    {id: 5, name: 'File5.type'}
  ];

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  uploadAttachments(event: any) {

    let files = event.target.files as FileList;
    console.log(files);
    // for(let key in files)
    // {
    //   console.log(files[key].name);
    // }
  }

  downloadFile(attachmentId: number) {
    this.userService.getUserImage().subscribe(file => {
      saveAs(file, file.name);
    });
  }

}
