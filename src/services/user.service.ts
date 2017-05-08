import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {AuthToken} from './auth.token.service';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()

export class UserService {

  private constUrl:string = "http://localhost:3000/api/v1/me";

  constructor(private http:Http,
              private authToken: AuthToken) {}

  getCurrentUser(): Observable<any> {
    return this.http.get(this.constUrl, {
      headers: this.authToken.getHeaders()
    })
      .map(res => res.json());
  };

  isLoggedIn(): boolean {
    if(this.authToken.getToken()) {
      return true;
    }else {
      return false;
    }
  }

  logout(): void {
    return this.authToken.setToken();
  }

}
