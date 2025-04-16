import { HttpErrorResponse } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
    toastr = inject(ToastrService);
  
    handleErrors(res: HttpErrorResponse): void {
    
      if (res.error.errors) {
        for (const [key, value] of Object.entries(res.error.errors)) {
          this.toastr.error(`${key}: ${value}`, 'Erro!');
        }
      }
      else if (res.error.detail) {
        this.toastr.error(`${res.error.detail}`, 'Erro!');
      }
       else if (res.error.message) {
        this.toastr.error(`${res.error.message}`, 'Erro!');
      }
      else {
        this.toastr.error('Ocorreu um erro.', 'Erro!');
      }
    }
  }