import { updateWorkspaceUrl } from './../../../configs/api-endpoints';
import { UpdateWorkspace } from 'src/app/core/models/workspaceUpdate';
import { userWorkspaceInfo } from 'src/app/core/models/userWorkspaceInfo';
import { UserService } from 'src/app/core/services/user.service';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { Component, Input, OnInit, DebugElement, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WorkspaceService } from 'src/app/core/services/workspace.service';

@Component({
  selector: 'app-modal-updateworkspace',
  templateUrl: './modal-updateworkspace.component.html',
  styleUrls: ['./modal-updateworkspace.component.css']
})
export class ModalUpdateWorkspaceComponent implements OnInit {

  updwsform: FormGroup;
  @Input() workspaceInput: userWorkspaceInfo;
  updateWorkspace: UpdateWorkspace = new UpdateWorkspace();
  @Output() public isUpdated = new EventEmitter<boolean>(false);

  constructor(private fb: FormBuilder, private service: WorkspaceService, private router: Router) {
    this.updwsform = fb.group({
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

  showAlert(error: string) {
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