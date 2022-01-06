import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { enumValues, taskStatuses } from 'src/app/configs/enum.helper';
import { CreateTask, IAssignedUser } from 'src/app/core/models/createTask';
import { WorkspaceService } from 'src/app/core/services/workspace.service';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {

  @Input() public workspaceId: number;
  taskForm: FormGroup;
  createTask: CreateTask = new CreateTask();
  status = taskStatuses;
  selectedStatus: number;
  public enumValues = enumValues;

  constructor(private fb:FormBuilder, private ws: WorkspaceService, public dialog: MatDialog) {
    this.taskForm=fb.group({
      "Name":["",[Validators.maxLength(50)]],
      "Description":["",[Validators.maxLength(100)]],
      "DateOfEnd":["", ],
      "StatusId": ["",Validators.required]
    })
  }

  ngOnInit() {
    this.createTask.workspaceId = this.workspaceId
    console.log(this.workspaceId)
  }

  showAlert(error: string){
    Swal.fire({
      icon: 'error',
      title: error,
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }
    })
  }

  AssignUserOnTask(): void{
    console.log('sdsdsdsdssdsd');
  }

  assignedUsersArr: IAssignedUser[] =[
    {roleTagId: 1, userId: '7a278b6d-391e-47b8-bac9-4a9741643be1'}
  ];

  CreateNewTask(): void{
    if(this.taskForm.valid){
      this.createTask = this.taskForm.value;

      this.createTask.workspaceId = this.workspaceId;
      this.createTask.statusId = this.selectedStatus;
      this.createTask.assignedUsers = this.assignedUsersArr;
      console.log(this.createTask);
      this.ws.CreateTask(this.createTask).subscribe(
        () => {
          this.dialog.closeAll();
        },
        err => {
          let errorMessage: string = '';
          if(err.error.errors && typeof err.error.errors === 'object'){
            const errors = err.error.errors;

            for(let key in errors){
              for(let indexError in errors[key]){
                errorMessage += errors[key][indexError] + '\n';
              }
            }

            this.showAlert(errorMessage);

            return;
          }
          if(err.error && typeof err.error === 'object'){
            errorMessage += err.error.error;

            this.showAlert(errorMessage);

            return;
          }
        }
      );
    }
  }
}