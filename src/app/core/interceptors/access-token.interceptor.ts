import { HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { LocalstorageService } from "../../shared/services/local-storage.service";
import { environment } from "../../../environments/environment";
import { inject } from "@angular/core";

export const AccessTokenInterceptor = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
    const localStorageService = inject(LocalstorageService);
    const localUser = localStorageService.getAuthStorage();
    const n = environment.apiUrl.length;
    const requestToAPI = req.url.substring(0, n) === environment.apiUrl;
    if(requestToAPI && localUser){
        const clonedRequest = req.clone({
            setHeaders: {
                'Authorization': `Bearer ${localUser.accessToken}`
            }
        });
        return next(clonedRequest);
    }else{
        return next(req);
    }  
}