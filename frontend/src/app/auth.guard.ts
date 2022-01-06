import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private localStorageService: LocalStorageService){}
  canActivate():boolean{
    if (this.localStorageService.getItem('userprofile')) {  
      return true;  
    }  
    this.router.navigateByUrl('/login');
    return false;

  }
  
}
