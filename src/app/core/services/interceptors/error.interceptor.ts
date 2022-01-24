import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor() { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        return next.handle(req).pipe(
            catchError(err => {

                let errorMessage: string = '';

                if(err.status == 403 && err.error == null) {
                    return throwError(() => 'You don\'t have permissions');
                }

                if(err.error.errors && typeof err.error.errors === 'object') {
                    
                    const errors = err.error.errors;

                    for(let key in errors) {
                        for(let indexError in errors[key]) {
                            errorMessage += errors[key][indexError] + '\n';
                        }
                    }

                    return throwError(() => errorMessage);
                }

                if(err.error && typeof err.error === 'object') {
                    errorMessage += err.error.error;

                    return throwError(() => errorMessage);
                }

                return throwError(() => err);
            }));
    }

}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
};
