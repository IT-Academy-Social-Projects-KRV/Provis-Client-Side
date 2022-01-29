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
import { DataShareService } from 'src/app/core/services/DataShare.service';


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
  statusTasks: {tasks: Tasks, userId: string} = {tasks:{}, userId:''};
  ifClosed: boolean = true;

  constructor(private userTask: TaskService, public dialog: MatDialog, private dataShare: DataShareService) { }

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
    
    this.dataShare.taskDelete.subscribe(data => {
      if(data.id){
        let index = this.statusTasks.tasks[data.statusId]?.findIndex(x => x.id == data.id);
        if(index != -1)
          this.statusTasks.tasks[data.statusId].splice(index, 1);
      }
    })
  }

  showUserTasks(userId: string) {
     if(this.ifClosed) {
      this.statusTasks = {tasks:{}, userId:''};
      this.ngOnInit();
      this.userTask.getUserTask(userId, this.workspaceId).subscribe((
        data: {tasks: Tasks, userId: string}) => {
          this.statusTasks = {tasks: {...this.statusTasks.tasks,...data.tasks}, userId: data.userId};
      });
      this.ifClosed = !this.ifClosed;
    } else {
      this.ifClosed = !this.ifClosed;
    }
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

    let beforeStatus = event.previousContainer.id.replace(this.index + '_','');
    let currentStatus = event.container.id.replace(this.index + '_','');

    if(beforeStatus != currentStatus) {
      let taskTo = {
        workspaceId: this.workspaceId,
        statusId: +currentStatus,
        taskId: this.statusTasks.tasks[+currentStatus][event.currentIndex].id
      };
      this.userTask.updateStatusTask(taskTo).subscribe();
    }
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
