import { HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http";

import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";


export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
            catchError((error: HttpErrorResponse) => {
    
                if (error.status === 403) {
                  console.error('Accès refusé - Erreur 403');
                }
                  return throwError(() => error);
                })
        );
}
