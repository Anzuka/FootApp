import { HttpInterceptorFn } from "@angular/common/http";
import { JwtService } from "../auth/service/jwt.service";
import { inject } from "@angular/core";

export const tokenInterceptor: HttpInterceptorFn = (request, next) => {
    const authToken = inject(JwtService).getToken();

    if (authToken && authToken != '') {
      return next(request.clone( { setHeaders: { Authorization: 'Bearer ' + authToken } } ));
    }
    return next(request);

  }
  