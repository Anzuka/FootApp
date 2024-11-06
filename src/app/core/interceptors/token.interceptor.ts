import {  HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { JwtService } from "../auth/service/jwt.service";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Router } from "@angular/router";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept (request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const authToken = inject(JwtService).getToken();

    if (authToken && authToken != '') {
      return next.handle(request.clone( { setHeaders: { Authorization: 'Bearer ' + authToken } } ));
    }
    return next.handle(request);
  }
}
