import { Validators } from "@angular/forms";
export class ConfirmCodeValidator{
    public static getRequiredValidator()
    {
        return Validators.required;
    }

    public static getConfirmCode()
    {
      return [ConfirmCodeValidator.getRequiredValidator(), Validators.pattern(`^[ 0-9]+$`), Validators.maxLength(6), Validators.minLength(6)];
    }
}
