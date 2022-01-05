import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { enumValues, taskStatuses } from 'src/app/configs/enum-helper';
import { CreateTask, IAssignedUser } from 'src/app/core/models/create-task';
import { WorkspaceService } from 'src/app/core/services/workspace.service';
import Swal from 'sweetalert2';


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
  assignedUsersArr: IAssignedUser[] =[
    //{roleTagId: 1, userId: 'dca4f278-b0bb-46bc-9758-0cb715392f66'}
  ];
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

  CreateNewTask(): void{
    if(this.taskForm.valid){
      this.createTask = this.taskForm.value;

      this.createTask.workspaceId = this.workspaceId;
      this.createTask.statusId = this.selectedStatus;
      this.createTask.assignedUsers = this.assignedUsersArr;
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
