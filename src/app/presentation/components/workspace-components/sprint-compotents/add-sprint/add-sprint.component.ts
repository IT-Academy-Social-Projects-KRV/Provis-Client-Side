import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ChangeSprint } from 'src/app/core/models/sprint/addSprint';
import { AlertService } from 'src/app/core/services/alerts.service';
import { DataShareService } from 'src/app/core/services/dataShare.service';
import { SprintService } from 'src/app/core/services/sprint.service';

@Component({
  selector: 'app-add-sprint',
  templateUrl: './add-sprint.component.html',
  styleUrls: ['./add-sprint.component.css']
})
export class AddSprintComponent implements OnInit {

  @Input() public workspaceId: number;
  sprintForm: FormGroup;
  addSprintModel: ChangeSprint = new ChangeSprint;

  constructor(private formBuilder: FormBuilder,
    private sprintService: SprintService,
    private alertService: AlertService,
    private dataShareService: DataShareService,
    public dialog: MatDialog) {
    this.sprintForm = formBuilder.group({
      "name":["",[Validators.maxLength(50), Validators.required]],
      "description":[null, [Validators.maxLength(500)]],
      "dateOfStart":[],
      "dateOfEnd": []
    },
    {
      validators: [this.checkDate]
    })
   }

  ngOnInit() {
  }

  checkDate(g: FormGroup) {
    let isInvalid = (g.get('dateOfStart')?.value && g.get('dateOfEnd')?.value) &&
      (g.get('dateOfStart')?.value > g.get('dateOfEnd')?.value);
    if(isInvalid) {
      g.get('dateOfEnd')?.setErrors({invalidDate: true});
    }
  }

  createSprint() {
    if(this.sprintForm.valid) {
      this.addSprintModel = Object.assign({}, this.sprintForm.value);

      this.sprintService.addSprint(this.workspaceId, this.addSprintModel).subscribe(data=>{
        this.dataShareService.nextAddSprint(data);
        this.dialog.closeAll();
      }, err=> {
        this.alertService.errorMessage(err);
      })
    }
  }

}
