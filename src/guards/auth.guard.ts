import {Injectable} from '@angular/core';
import {Router, CanActivate} from '@angular/router';

@Injectable()

export class AuthGuard implements CanActivate{

  constructor(private router: Router) {}

  canActivate() {
    if(window.localStorage.getItem('token')) {
      return true;
    }else {
      this.router.navigate(['/user/signup']);
      return false;
    }
  }

}
