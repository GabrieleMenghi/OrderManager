import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, catchError } from 'rxjs';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router, private toastr: ToastrService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err) {
          switch (err.status) {
            case 400:
              this.toastr.error('Richiesta non valida');
              break;
            case 500:
              this.toastr.error('Richiesta in errore');
              break;
            default:
              this.toastr.error('Errore nella richiesta');
              break;
          }
          }
        throw err;
      })
    );
  }
}
