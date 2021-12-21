import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { WorkspaceService } from 'src/app/core/services/workspace.service';
import { Router } from '@angular/router';
import { CreateWorkspace } from 'src/app/core/models/workspace';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-add-workspace',
  templateUrl: './add-workspace.component.html',
  styleUrls: ['./add-workspace.component.css']
})

export class AddWorkspaceComponent implements OnInit {
  addwsform : FormGroup;
  createWorkspace : CreateWorkspace = new CreateWorkspace();
  

   
  constructor(private fb:FormBuilder, private service: WorkspaceService, private router: Router) { 
    this.addwsform=fb.group({        
      "Name": ["",[Validators.required]],
      "Description" : ["",[Validators.required]]               
  })
  }

  ngOnInit() {
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

  submit()
  {  
    if(this.addwsform.valid){
      this.createWorkspace = Object.assign({}, this.addwsform.value);
      this.service.CreateWorkspace(this.createWorkspace).subscribe(
        () => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: '',
            text: "Workspace created successful",
            showConfirmButton: false,
            timer: 1000
          });

          this.router.navigate(['user/workspace/list']);
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
      )
    }  
  }
}

