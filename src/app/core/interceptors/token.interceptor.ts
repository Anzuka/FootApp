import { HttpInterceptorFn } from "@angular/common/http";
import { JwtService } from "../auth/service/jwt.service";
import { inject } from "@angular/core";

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
    const token = inject(JwtService).getToken();
  
    const request = req.clone({
      setHeaders: {
        ...(token ? { Authorization: `Token ${token}` } : {}),
      },
    });
    return next(request);
  };