import { MatDialogRef } from '@angular/material/dialog';
import { WorkspaceListComponent } from './../workspace-list/workspace-list.component';
import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { WorkspaceService } from 'src/app/core/services/workspace.service';
import { Router } from '@angular/router';
import { CreateWorkspace } from 'src/app/core/models/workspace/createWorkspace';

@Component({
  selector: 'app-add-workspace',
  templateUrl: './add-workspace.component.html',
  styleUrls: ['./add-workspace.component.css']
})

export class AddWorkspaceComponent implements OnInit {
  addwsform : FormGroup;
  createWorkspace : CreateWorkspace = new CreateWorkspace();
  @Output() public isAdded = new EventEmitter<boolean>(false);

  constructor(
    private fb:FormBuilder,
    private service: WorkspaceService, 
    private router: Router,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<WorkspaceListComponent>)
    {     
      this.addwsform=fb.group({        
      "Name": ['',[Validators.required]],
      "Description" : ['',[Validators.required]]               
      })
    }

  ngOnInit() {}

  submit()
  {  
    if(this.addwsform.valid){
      this.createWorkspace = Object.assign({}, this.addwsform.value);
      this.service.CreateWorkspace(this.createWorkspace).subscribe(
        () => { this.router.navigate(['currentUrl']);
        this.isAdded.emit(true);
      });
    }
  }
}
