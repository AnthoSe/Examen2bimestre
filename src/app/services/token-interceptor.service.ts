import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private UserService: UserService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.UserService.getToken();

    // Solo agregamos el encabezado de autorización si hay un token disponible
    if (token) {
      const tokenizedReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });

      return next.handle(tokenizedReq);
    }

    return next.handle(req);
  }
}
