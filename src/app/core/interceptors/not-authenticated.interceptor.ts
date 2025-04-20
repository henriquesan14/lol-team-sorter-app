import { HttpErrorResponse, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { catchError, throwError } from "rxjs";
import { Router } from "@angular/router";
import { LocalstorageService } from "../../shared/services/local-storage.service";

export const NotAuthenticatedInterceptor = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
    const localStorageService = inject(LocalstorageService);
    const localUser = localStorageService.getAuthStorage();
    const router = inject(Router);
    return next(req).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401 && localUser) {
            localStorageService.removeAuthStorage();
            router.navigateByUrl('/');
          }
          return throwError(() => error);
        })
      );
    
}