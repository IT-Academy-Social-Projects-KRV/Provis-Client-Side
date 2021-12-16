import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private authService: AuthenticationService, private router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        return next.handle(req).pipe(
            catchError(err => {
                
                if(err.status == 401 && err.headers.get('token-expired'))
                {              
                    return this.handle401Error(req, next);
                }

                return throwError(err);
            }));
    }

    private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
      
        return this.authService.RefreshToken().pipe(
        switchMap(() => {
            const token = localStorage.getItem('token')?.toString();
            return next.handle(this.addTokenHeader(request, token));
        }),
        catchError((err) => {
            if(err.error.error == 'Invalid refrash token')
            {
                this.authService.Logout();
                this.showErrorAlert('you need authorization');
                this.router.navigate(['/login']);
            }
            return throwError(err);
        })
        );
    }

    private addTokenHeader(request: HttpRequest<any>, token?: string) {

        return request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
    }

    showErrorAlert(error: string){
        Swal.fire({
          position: 'top-right',
          icon: 'error',
          title: '',
          text: error,
          showConfirmButton: false,
          timer: 1000
        });
    }

}

export const AuthInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
};
