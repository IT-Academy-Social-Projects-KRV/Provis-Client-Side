import { TaskStatus } from 'src/app/core/models/task/taskStatus';
import { TaskWorkerRole } from 'src/app/core/models/task/taskWorkerRoles';
import { colorWorkerStatus, statusColors } from './../../../../../configs/colorsForWorkspaceCards';
import { TaskInfo } from '../../../../../core/models/task/taskInfo';
import { Tasks, usersTasks } from '../../../../../core/models/task/tasks';
import { TaskService } from '../../../../../core/services/task.service';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { WorkspaceMembers } from 'src/app/core/models/workspace/workspaceMembers';
import { MatDialog } from '@angular/material/dialog';
import { WorkspaceTaskEditComponent } from '../workspace-task-edit/workspace-task-edit.component';
import { DataShareService } from 'src/app/core/services/dataShare.service';
import { AlertService } from 'src/app/core/services/alerts.service';
import { UpdateTaskStatus } from 'src/app/core/models/task/updateTaskStatus';
import { SprintInfo } from 'src/app/core/models/sprint/sprintInfo';
import { SprintService } from 'src/app/core/services/sprint.service';
import { ChangeSprintForTask } from 'src/app/core/models/task/changeSprintForTask';


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
  @Input() public sprintId: number | null;

  taskStatuses: Array<TaskStatus>;
  workerStatus: TaskWorkerRole[];
  statusColor = colorWorkerStatus;
  kanbanClasses = statusColors;
  kanbanBoard: TaskStatus[] = [];
  listStatus: string[] = [];
  statusTasks: {tasks: Tasks, userId: string} = {tasks:{}, userId:''};
  isLoading: boolean = false;
  tempUserTasks: usersTasks = {};
  isUserSprints: boolean = false;
  sprintList: SprintInfo[] = [];

  constructor(private userTask: TaskService,
    public dialog: MatDialog,
    private dataShare: DataShareService,
    private alertService: AlertService,
    private sprintService: SprintService,
    private taskService: TaskService) { }

  ngOnInit() {

    this.dataShare.workspaceInfo.subscribe(data => {
      this.isUserSprints = data.isUseSprints;

      if(data.isUseSprints) {
        this.sprintService.getSprintList(data.id).subscribe(sprintList=>{
          this.sprintList = sprintList;
          if(this.sprintId)
            this.sprintList.unshift({id: -1, name: 'Product Backlog'});
        });
      }
    });

    this.dataShare.usersTasks.subscribe(data => this.tempUserTasks = data);

    this.userTask.getWorkerRole().subscribe(data => this.workerStatus = data);

    this.dataShare.taskUpdate.subscribe(data => {
      let index = this.statusTasks.tasks[data.statusId]?.findIndex(x => x.id == data.id);
      if(index >= 0) {
        if(index != -1) {
          this.statusTasks.tasks[data.statusId][index].name = data.name;
          this.statusTasks.tasks[data.statusId][index].deadline = data.deadline;
          this.statusTasks.tasks[data.statusId][index].storyPoints = data.storyPoints;
        }
      }
    })

    this.dataShare.taskDelete.subscribe(data => {
      if(data.id) {
        let index = this.statusTasks.tasks[data.statusId]?.findIndex(x => x.id == data.id);
        if(index != -1)
          this.statusTasks.tasks[data.statusId].splice(index, 1);
      }
    })

    this.dataShare.taskAdd.subscribe(data => {
      if(data.id) {
        let addNewTask = {
          id: data.id,
          name: data.name,
          deadline: data.deadline,
          workerRoleId: data.workerRoleId,
          commentCount: data.commentCount,
          storyPoints: data.storyPoints,
          memberCount: data.memberCount,
          creatorUsername: data.creatorUsername,
          rowVersion: data.rowVersion
        }

        if(data.toUserId == this.statusTasks.userId) {
          this.tempUserTasks[data.toUserId][data.status].push(addNewTask);
        }

        if(data.toUserId == 'null' && this.statusTasks.userId == null) {
          this.tempUserTasks[data.toUserId][data.status].push(addNewTask);
        }

        if(data.fromUser == 'null') {
          let index =  this.tempUserTasks[data.fromUser][data.status]?.findIndex(x => x.id == data.id);
          if(index != -1)
            this.tempUserTasks[data.fromUser][data.status].splice(index, 1);
        }
      }
    })

  }

  closeUser() {
    delete this.tempUserTasks[this.statusTasks.userId];
    this.statusTasks = {tasks:{}, userId:''};
  }

  showUserTasks(userId: string) {
    this.isLoading = true;
    this.kanbanBoard = [];
    this.statusTasks = {tasks:{}, userId:''};
    this.userTask.getStatusTask().subscribe(statuses => {
      this.kanbanBoard = statuses;
      statuses.map(element => {
        this.listStatus.push(this.index + '_' + element.id.toString());
        this.statusTasks.tasks[element.id] = [];
      });
      this.userTask.getUserTask(userId, this.workspaceId, this.sprintId).subscribe((
        data: {tasks: Tasks, userId: string}) => {
          this.statusTasks = {tasks: {...this.statusTasks.tasks,...data.tasks}, userId: data.userId};
          this.isLoading = false;

          this.tempUserTasks[this.statusTasks.userId] = this.statusTasks.tasks;
          this.dataShare.nextUsersTasks(this.tempUserTasks);
      });
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

    let beforeStatus = event.previousContainer.id.replace(this.index + '_','');
    let currentStatus = event.container.id.replace(this.index + '_','');

    if(beforeStatus != currentStatus) {
      let taskTo = {
        workspaceId: this.workspaceId,
        statusId: +currentStatus,
        taskId: this.statusTasks.tasks[+currentStatus][event.currentIndex].id,
        rowVersion: this.statusTasks.tasks[+currentStatus][event.currentIndex].rowVersion
      };

      let currentTask = this.statusTasks.tasks[+currentStatus][event.currentIndex];
      let currentUserId = this.statusTasks.userId;

      this.userTask.updateStatusTask(taskTo).subscribe(
        (data: UpdateTaskStatus) => {
          this.statusTasks.tasks[+currentStatus][event.currentIndex].rowVersion = data.rowVersion;
        },
        err =>
        {
          this.alertService.errorMessage(err.error)
          this.tempUserTasks[currentUserId][err.statusId].push(currentTask);
          this.tempUserTasks[currentUserId][+currentStatus].splice(event.currentIndex,1);
        });


      for(let [key, value] of Object.entries(this.tempUserTasks)) {
        if(key != currentUserId) {
          let index = this.isTaskExist(key, +beforeStatus, currentTask.id);
          if(index != -1) {
            let currentTaskInAnotherUser = this.tempUserTasks[key][+beforeStatus][index];
            this.tempUserTasks[key][+currentStatus].push(currentTaskInAnotherUser);
            this.tempUserTasks[key][+beforeStatus].splice(index,1);
          }
        }
      }
    }
  }

  isTaskExist(userId: string, status: number, taskId: number){
    return this.tempUserTasks[userId][status]?.findIndex(x => x.id == taskId);
  }

  showTask(taskId: number, status: number) {

    let currentUserId = this.user.id == '' ? 'null': this.user.id;
    let index = this.isTaskExist(currentUserId, status, taskId);

    if(index != -1)
      this.dataShare.currentTask = {
        id: taskId,
        toUserId: currentUserId,
        fromUser: currentUserId,
        name: this.tempUserTasks[currentUserId][status][index].name,
        deadline: this.tempUserTasks[currentUserId][status][index].deadline,
        workerRoleId: this.tempUserTasks[currentUserId][status][index].workerRoleId,
        commentCount: this.tempUserTasks[currentUserId][status][index].commentCount,
        storyPoints: this.tempUserTasks[currentUserId][status][index].storyPoints,
        memberCount: this.tempUserTasks[currentUserId][status][index].memberCount,
        creatorUsername: this.tempUserTasks[currentUserId][status][index].creatorUsername,
        status:status,
        rowVersion: this.tempUserTasks[currentUserId][status][index].rowVersion
      };

    let dialogRef = this.dialog.open(WorkspaceTaskEditComponent, {
      autoFocus: false,
      height: '85%',
      width: '85%'
    });
    dialogRef.componentInstance.workspaceId = this.workspaceId;
    dialogRef.componentInstance.taskId = taskId;
  }

  moveToAnotherSprint(taskId: number, sprintId: number, statusId: number) {

    if(sprintId == this.sprintId)
      return;

    let body = new ChangeSprintForTask();
    body.sprintId = (sprintId != -1)? sprintId : undefined;

    this.taskService.changeSprintForTask(this.workspaceId, taskId, body).subscribe(() => {
      let index = this.statusTasks.tasks[statusId]?.findIndex(x => x.id == taskId);
      if(index != -1)
        this.statusTasks.tasks[statusId].splice(index, 1);
    },
    err =>{
      this.alertService.errorMessage(err);
    });
  }

}
