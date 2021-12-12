import { FormGroup, Validator, Validators } from "@angular/forms";
export class SignInUpValidator{
    public static getNameValidator(a:number, b:number){
        return [SignInUpValidator.getRequiredValidator(),Validators.pattern(`[A-Za-z]{${a},${b}}`)];
    }

    public static getUserNameValidator(a:number, b:number){
        return [SignInUpValidator.getRequiredValidator(),Validators.pattern(`[A-Za-z0-9-_]{${a},${b}}`)];
    }

    public static getEmailValidator(){
        return [SignInUpValidator.getRequiredValidator(),Validators.email];
    }

    public static getPasswordValidator(a:number, b:number){
        return [SignInUpValidator.getRequiredValidator(),Validators.pattern(`^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-_]).{${a},${b}}$`)];
    }

    public static getRequiredValidator()
    {
        return Validators.required;
    }
    public static confirmPasswordValidator(controlName: string, matchingControlName: string) {
        return (formGroup: FormGroup) => {
          let control = formGroup.controls[controlName];
          let matchingControl = formGroup.controls[matchingControlName]          
          if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ confirmPasswordValidator: true });
          } else {
            matchingControl.setErrors(null);
          }
        };
      }
}
