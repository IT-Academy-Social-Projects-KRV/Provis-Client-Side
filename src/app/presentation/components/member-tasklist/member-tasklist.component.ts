import { MatAccordion } from '@angular/material/expansion';

import { TaskService } from './../../../core/services/task.service';

import { UserTask } from './../../../core/models/userTask';
import { CreateTaskComponent } from './../create-task/create-task.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-member-tasklist',
  templateUrl: './member-tasklist.component.html',
  styleUrls: ['./member-tasklist.component.css']
})

export class MemberTasklistComponent implements OnInit {

  @ViewChild(MatAccordion) accordion: MatAccordion;
  users= ['Donald Duck', 'Mikky Mouse', 'Spiderman'];

  panelOpenState = false;

  countTask: number = 1;

  todo: Array<UserTask> = [];
  inProgress: Array<UserTask> = [];
  inReview: Array<UserTask> = [];
  completed: Array<UserTask> = [];

  protected routeSub: Subscription;
  workspaceId: number;

  userTaskList: UserTask [];

  constructor(public dialog: MatDialog, private userTask: TaskService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.parent?.params.subscribe((params) => 
    {this.workspaceId = Number(params['id'])});

    this.userTask.getUserTask().subscribe((data: UserTask[]) => {
      this.userTaskList = data;
    
      for (let i = 0; i < this.userTaskList.length; i++)
      {
        switch(this.userTaskList[i].status) { 
          case "To do": { 
            this.todo.push(this.userTaskList[i]);
            break; 
          } 
          case "In progress": { 
            this.inProgress.push(this.userTaskList[i]);
            break; 
          } 
          case "In review": { 
            this.inReview.push(this.userTaskList[i]);
            break; 
          }
          case "Completed": { 
            this.completed.push(this.userTaskList[i]);
            break; 
          }  
        }   
      }
      this.countTask = this.todo.length + this.inProgress.length + this.inReview.length;
    })
  }

  modalCreateTask() {
    let dialogRef = this.dialog.open(CreateTaskComponent);
    dialogRef.componentInstance.workspaceId = this.workspaceId;
  }

  drop(event: CdkDragDrop<UserTask[]>) {
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
    console.log('current array - ', event.container.id);
    console.log('current element index - ', event.currentIndex);
    //console.log('Task ', this.todo[event.currentIndex]);
    //console.log(this.inProgress);
    switch(event.container.id) { 
      case "todo": { 
        console.log(this.todo[event.currentIndex]);
        break; 
      } 
      case "inProgress": { 
        console.log(this.inProgress[event.currentIndex]);
        break; 
      } 
      case "inReview": { 
        console.log(this.inReview[event.currentIndex]);
        break; 
      }
      case "completed": { 
        console.log(this.completed[event.currentIndex]);
        break; 
      }
    }   
    this.countTask = this.todo.length + this.inProgress.length + this.inReview.length;


  }
}
