import { WorkspaceUpdate } from 'src/app/core/models/workspace/workspaceUpdate';
import { WorkspaceInfo } from 'src/app/core/models/workspace/workspaceInfo';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WorkspaceService } from 'src/app/core/services/workspace.service';
import { WorkspaceDescription } from 'src/app/core/models/workspace/workspaceDescription';
import { DataShareService } from 'src/app/core/services/dataShare.service';

@Component({
  selector: 'app-workspace-update',
  templateUrl: './workspace-update.component.html',
  styleUrls: ['./workspace-update.component.css']
})
export class WorkspaceUpdateComponent implements OnInit {

  updwsform: FormGroup;
  workspaceInfo: WorkspaceInfo;
  updateWorkspace: WorkspaceUpdate = new WorkspaceUpdate();
  @Output() public isUpdated = new EventEmitter<boolean>(false);

  constructor(formBuilder: FormBuilder,

    private service: WorkspaceService,
    private workspaceService: WorkspaceService,
    private dataShareService: DataShareService) {
    this.updwsform = formBuilder.group({
      "Name": ['', [Validators.required]],
      "Description": ['']
    })
  }

  ngOnInit() {

    this.dataShareService.workspaceInfo.subscribe((data: WorkspaceInfo) => {
      this.workspaceInfo = data;
      this.updateWorkspace.workspaceId = data.id;
      this.updateWorkspace.Name = data.name;
      this.updwsform.controls['Name'].setValue(this.updateWorkspace.Name);
    });

    this.workspaceService.getWorkspaceDecscription(this.workspaceInfo.id).subscribe((data: WorkspaceDescription) => {
      this.updateWorkspace.Description = data.description;
      this.updwsform.controls['Description'].setValue(data.description);
    });
  }

  submit() {
    if(this.updwsform.valid){

      this.updateWorkspace.Name=this.updwsform.controls['Name'].value;
      this.updateWorkspace.Description=this.updwsform.controls['Description'].value;

      this.service.UpdateWorkspace(this.updateWorkspace).subscribe(() => {
        this.workspaceInfo.name = this.updateWorkspace.Name;
        this.dataShareService.nextWorkspaceInfo(this.workspaceInfo);
        this.isUpdated.emit(true);
       });
    }
  }
}
