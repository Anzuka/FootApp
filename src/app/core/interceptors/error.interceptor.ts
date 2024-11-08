import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor,  HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept (request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
        catchError((error: HttpErrorResponse) => {
              console.error("intercept error: ", error);

            if (error.status === 403) {
              console.error("Accès refusé - Erreur 403");
            }
              return throwError(() => error);
            })
    );
    }
}
