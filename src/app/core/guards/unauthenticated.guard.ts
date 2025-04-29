import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { LocalstorageService } from "../../shared/services/local-storage.service";
import { inject } from "@angular/core";

export const UnauthenticadedGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
    const storageService = inject(LocalstorageService);
    const router = inject(Router);
    if (storageService.getUserStorage()) {
        router.navigateByUrl('/matchmaking/generate');
        return false;
    }
    return true;
}