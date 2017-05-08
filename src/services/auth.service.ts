import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()

export class AuthService {

  private constUrl:string = "http://localhost:3000/api/v1";

  constructor(private http:Http) {}

  signIn(userData:any): Observable<any> {
    return this.http.post(`${this.constUrl}/user/signin`, userData)
      .map(res => res.json());
  };

  signUp(userData:any): Observable<any> {
    return this.http.post(`${this.constUrl}/user/signup`, userData)
      .map(res => res.json());
  };

  update(data:any): Observable<any> {
    return this.http.put(`${this.constUrl}/user/update`, data)
  }
}
