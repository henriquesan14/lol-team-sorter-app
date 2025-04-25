import { HttpErrorResponse, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { LocalstorageService } from "../../shared/services/local-storage.service";
import { environment } from "../../../environments/environment";
import { inject } from "@angular/core";
import { catchError, finalize, switchMap, throwError } from "rxjs";
import { AuthService } from "../../shared/services/auth.service";
import { Router } from "@angular/router";

let isRefreshing = false;
export const AccessTokenInterceptor = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const localStorageService = inject(LocalstorageService);
  const authService = inject(AuthService);
  const router = inject(Router);
  const localUser = localStorageService.getAuthStorage();
  const n = environment.apiUrl.length;
  const requestToAPI = req.url.substring(0, n) === environment.apiUrl;

  const addAuthHeader = (token: string) =>
    req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

  const handle401 = (error: HttpErrorResponse) => {
    const refreshToken = localUser?.refreshToken;

    if (error.status === 401 && refreshToken && !isRefreshing) {
      isRefreshing = true;

      return authService.refreshToken({ refreshToken }).pipe(
        switchMap((auth) => {
          localStorageService.setAuthStorage(auth);
          const retryReq = addAuthHeader(auth.accessToken);
          return next(retryReq);
        }),
        catchError((refreshErr) => {
          localStorageService.removeAuthStorage();
          router.navigateByUrl('/');
          return throwError(() => refreshErr);
        }),
        finalize(() => {
          isRefreshing = false;
        })
      );
    }

    return throwError(() => error);
  };

  const authReq = requestToAPI && localUser ? addAuthHeader(localUser.accessToken) : req;
  return next(authReq).pipe(catchError(handle401));

}