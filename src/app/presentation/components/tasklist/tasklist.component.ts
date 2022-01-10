import { TaskInfo } from '../../../core/models/task/taskInfo';
import { Tasks } from '../../../core/models/task/tasks';
import { WorkspaceService } from 'src/app/core/services/workspace.service';
import { TaskService } from './../../../core/services/task.service';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { WorkspaceMembers } from 'src/app/core/models/workspace/workspaceMembers';


@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.css']
})
export class TasklistComponent implements OnInit {

  @ViewChild(MatAccordion) accordion: MatAccordion;
  @Input() public workspaceId: number;
  @Input() public user: WorkspaceMembers;

  statusTasks:{tasks: Tasks, userId: string} = {tasks : {
    1:[],
    2:[],
    3:[],
    4:[]
  },
    userId: ''};

  workerStatus: { [key: string]: string } = {
    '1': 'worker',
    '2': 'support',
    '3': 'reviewer',
    'null': ''
  };

  constructor(private userTask: TaskService, private workspaceService: WorkspaceService ) { }

  ngOnInit() {}

  showUserTasks(userId: string) {
    this.userTask.getUserTask(userId, this.workspaceId).subscribe((data: {tasks: Tasks, userId: string}) => {
      this.statusTasks = {tasks: {...this.statusTasks.tasks,...data.tasks}, userId: data.userId}
    })
    console.log(this.user);
  }

  drop(event: CdkDragDrop<TaskInfo[]>) {
    let taskInfo = new TaskInfo;
    console.log(this.statusTasks);
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }

      switch(event.container.id) {
      case "1": {
        taskInfo = this.statusTasks.tasks[1][event.currentIndex];
        break;
      }
      case "2": {
        taskInfo = this.statusTasks.tasks[2][event.currentIndex];
        break;
      }
      case "3": {
        taskInfo = this.statusTasks.tasks[3][event.currentIndex];
        break;
      }
      case "4": {
        taskInfo = this.statusTasks.tasks[4][event.currentIndex];
        break;
      }
    }

    let taskTo = {workspaceId: this.workspaceId, statusId: +event.container.id, taskId: taskInfo.id};
    this.userTask.updateStatusTask(taskTo).subscribe();
  }
}
