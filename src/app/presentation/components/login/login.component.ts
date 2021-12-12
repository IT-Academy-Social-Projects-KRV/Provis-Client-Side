import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SignInUpValidator } from 'src/app/core/validators/signInUpValidator';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm : FormGroup;

  constructor(private fb:FormBuilder){
    this.loginForm=fb.group({        
        "userEmail":["",SignInUpValidator.getEmailValidator()],
        "userPassword" : [""]               
    })
}
  ngOnInit(): void {
  }
  submit()
  {
      alert("Looking for this combination of email and password...");
  }
}
