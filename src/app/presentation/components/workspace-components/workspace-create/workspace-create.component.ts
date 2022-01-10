import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { WorkspaceService } from 'src/app/core/services/workspace.service';
import { Router } from '@angular/router';
import { CreateWorkspace } from 'src/app/core/models/workspace/createWorkspace';

@Component({
  selector: 'app-workspace-create',
  templateUrl: './workspace-create.component.html',
  styleUrls: ['./workspace-create.component.css']
})

export class WorkspaceCreateComponent implements OnInit {
  
  addwsform : FormGroup;
  createWorkspace : CreateWorkspace = new CreateWorkspace();
  @Output() public isAdded = new EventEmitter<boolean>(false);

  constructor(
    formBuilder: FormBuilder,
    private service: WorkspaceService,
    private router: Router,
    )
    {
      this.addwsform=formBuilder.group({
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
