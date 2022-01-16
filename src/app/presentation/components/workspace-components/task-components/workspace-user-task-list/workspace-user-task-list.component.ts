import { TaskStatus } from 'src/app/core/models/task/taskStatus';
import { TaskWorkerRole } from 'src/app/core/models/task/taskWorkerRoles';
import { colorWorkerStatus, kanbanColors } from './../../../../../configs/colorsForWorkspaceCards';
import { TaskInfo } from '../../../../../core/models/task/taskInfo';
import { Tasks } from '../../../../../core/models/task/tasks';
import { TaskService } from '../../../../../core/services/task.service';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { WorkspaceMembers } from 'src/app/core/models/workspace/workspaceMembers';
import { MatDialog } from '@angular/material/dialog';
import { WorkspaceTaskEditComponent } from '../workspace-task-edit/workspace-task-edit.component';


@Component({
  selector: 'app-workspace-user-task-list',
  templateUrl: './workspace-user-task-list.component.html',
  styleUrls: ['./workspace-user-task-list.component.css']
})
export class WorkspaceUserTaskListComponent implements OnInit {

  @ViewChild(MatAccordion) accordion: MatAccordion;
  @Input() public workspaceId: number;
  @Input() public user: WorkspaceMembers;
  @Input() public index: number;

  taskStatuses: Array<TaskStatus>;
  workerStatus: TaskWorkerRole[];
  statusColor = colorWorkerStatus;
  kanbanClasses = kanbanColors;
  kanban: TaskStatus[] = [];
  listStatus: string[] = [];
  statusTasks:{tasks: Tasks, userId: string} = {tasks:{}, userId:''};

  constructor(private userTask: TaskService, public dialog: MatDialog) { }

  ngOnInit() {
    this.userTask.getStatusTask().subscribe(data => {
      this.kanban = data;
      data.map(element => {
        this.listStatus.push(this.index + '_' + element.id.toString());
        this.statusTasks.tasks[element.id] = [];
      });
    });
    this.userTask.getWorkerRole().subscribe(data => {
      this.workerStatus = data;
    });
  }

  showUserTasks(userId: string) {
    this.userTask.getUserTask(userId, this.workspaceId).subscribe((data: {tasks: Tasks, userId: string}) => {
      this.statusTasks = {tasks: {...this.statusTasks.tasks,...data.tasks}, userId: data.userId};
    });
  }

  drop(event: CdkDragDrop<TaskInfo[]>) {
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
    let columnId = event.container.id.replace(this.index + '_','');
    let taskTo = {
      workspaceId: this.workspaceId,
      statusId: +columnId,
      taskId: this.statusTasks.tasks[+columnId][event.currentIndex].id
    };
    this.userTask.updateStatusTask(taskTo).subscribe();
  }

  showTask(taskId : number) {
    let dialogRef = this.dialog.open(WorkspaceTaskEditComponent, {
      autoFocus: false,
      height: '85%',
      width: '85%'
    });
    dialogRef.componentInstance.workspaceId = this.workspaceId;
    dialogRef.componentInstance.taskId = taskId;
  }

}
