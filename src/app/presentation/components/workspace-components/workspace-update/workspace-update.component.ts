import { WorkspaceUpdate } from 'src/app/core/models/workspace/workspaceUpdate';
import { WorkspaceInfo } from 'src/app/core/models/workspace/workspaceInfo';
import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WorkspaceService } from 'src/app/core/services/workspace.service';

@Component({
  selector: 'app-workspace-update',
  templateUrl: './workspace-update.component.html',
  styleUrls: ['./workspace-update.component.css']
})
export class WorkspaceUpdateComponent implements OnInit {

  updwsform: FormGroup;
  @Input() workspaceInput: WorkspaceInfo;
  updateWorkspace: WorkspaceUpdate = new WorkspaceUpdate();
  @Output() public isUpdated = new EventEmitter<boolean>(false);

  constructor(formBuilder: FormBuilder, 
    private service: WorkspaceService, 
    private router: Router,) {
    this.updwsform = formBuilder.group({
      "Name": ['', [Validators.required]],
      "Description": ['', [Validators.required]]
    })
  }


  ngOnInit() {
    this.updateWorkspace.workspaceId=this.workspaceInput.id;
    this.updateWorkspace.Name=this.workspaceInput.name;
    this.updateWorkspace.Description=this.workspaceInput.description;
    this.updwsform.controls['Name'].setValue(this.updateWorkspace.Name);
    this.updwsform.controls['Description'].setValue(this.updateWorkspace.Description);
  }

  submit() {
    if(this.updwsform.valid){
      this.updateWorkspace.Name=this.updwsform.controls['Name'].value;
      this.updateWorkspace.Description=this.updwsform.controls['Description'].value;
      this.service.UpdateWorkspace(this.updateWorkspace).subscribe(
        () => {
        this.router.navigate(['currentUrl']);
        this.isUpdated.emit(true);
       });
    }
  }
}
