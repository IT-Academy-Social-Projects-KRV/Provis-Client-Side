import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { enumValues, taskStatuses, userTaskRole } from 'src/app/configs/enum-helper';
import { AssignedMember, CreateTask } from 'src/app/core/models/create-task';
import { WorkspaceMembers } from 'src/app/core/models/workspaceUsersList';
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
  public enumValues = enumValues;
  
  workspaceMemberList: WorkspaceMembers[];
  userRole = userTaskRole;
  public assignedMembers: AssignedMember[];
  id : string;
  demoForm: FormGroup;

  constructor(private workspaceService: WorkspaceService, private fb:FormBuilder, private ws: WorkspaceService, public dialog: MatDialog) {
    this.taskForm=fb.group({
      "Name":["",[Validators.maxLength(50)]],
      "Description":["",[Validators.maxLength(100)]],
      "DateOfEnd":["", ],
      "StatusId": ["",Validators.required]
    })

    this.demoForm = this.fb.group({
      demoArray: this.fb.array([])
    })
   }

  ngOnInit() {
    this.createTask.workspaceId = this.workspaceId;
    this.workspaceService.getWorkspaceUserList(this.workspaceId).subscribe((data: WorkspaceMembers[]) =>{
      this.workspaceMemberList = data;
    });

    this.assignedMembers = [];
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
    if(this.assignedMembers.some(e => e.userId == null || e.roleTagId == null))
    {
      this.showAlert("Fill all fields");
      return;
    }
    if(this.taskForm.valid){
      this.createTask = this.taskForm.value;

      this.createTask.workspaceId = this.workspaceId;
      this.createTask.statusId = this.selectedStatus;
      this.createTask.assignedUsers = this.assignedMembers;
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

  AssignMember()
  {
  if(this.assignedMembers.length < this.workspaceMemberList.length)
    this.assignedMembers.unshift(new AssignedMember());
    console.log(this.assignedMembers);
  }

  DeAssignMember(i: number) {
    this.assignedMembers.splice(i, 1);
  }

  Contains(userId: string) : boolean
  {
      return this.assignedMembers.some(e => e.userId == userId);
  }

  Ok()
  {
    
  }
}
