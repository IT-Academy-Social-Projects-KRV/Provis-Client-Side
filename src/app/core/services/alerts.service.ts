import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';

@Injectable()
export class AlertService{

  public errorMessage(text: string, title?: string) {
    Swal.fire({
      icon: 'error',
      title: title,
      text: text
    })
  }

  public successMessage(text: string, title?: string){
    Swal.fire({
      icon: 'success',
      title: title,
      text: text,
      position: environment.alertSettings.position,
      showConfirmButton: false,
      timer: environment.alertSettings.timer
    })
  }
  
  public warningMessage(text: string, title?: string, confirmText: string='Ok'){
    Swal.fire({
      icon: 'warning',
      title: title,
      text: text,
      showCancelButton: false,
      confirmButtonColor: environment.alertSettings.confirmButtonColor,
      confirmButtonText: confirmText
    })
  }

  public async confirmMessage(text: string, title: string, button: string): Promise<boolean> {

    let isConfirm: boolean = false;
    await Swal.fire({
      icon: 'warning',
      title: title,
      text: text,
      showCancelButton: true,
      confirmButtonColor: environment.alertSettings.confirmButtonColor,
      cancelButtonColor: environment.alertSettings.cancelButtonColor,
      confirmButtonText: button
    }).then((result) => {
      if (result.isConfirmed)
        isConfirm=true;
    })
    return isConfirm;
  }
}
