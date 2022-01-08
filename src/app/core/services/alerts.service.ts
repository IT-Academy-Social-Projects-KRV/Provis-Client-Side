import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable()
export class AlertService{

  public static alertError(stringError: string, stringTitle?: string) {
    return Swal.fire({
      icon: 'error',
      title: stringTitle,
      text: stringError,
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }
    })
  }

  public static alertSuccessTop(stringSuccess: string, stringTitle?: string){
    return Swal.fire({
      icon: 'success',
      title: stringTitle,
      text: stringSuccess,
      position: 'top-end',      
      showConfirmButton: false,
      timer: 1000
    })
  }
  
  public static alertWarning(stringWarning: string, stringTitle?: string){
    return Swal.fire({
      icon: 'warning',
      title: stringTitle,
      text: stringWarning,    
      showCancelButton: false,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Ok'
    })
  }

  public static alertAreYouSure(stringText: string, stringButton: string){
    return Swal.fire({
      title: 'Are you sure?',
      text: stringText,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: stringButton
    })
  }
}
