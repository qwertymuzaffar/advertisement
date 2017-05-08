import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {AuthToken} from './auth.token.service';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()

export class AdvertService {

  constructor(private http:Http,
              private authToken: AuthToken) {}

  create(data:any): Observable<any> {
    return this.http.post('http://localhost:3000/adverts/new', data, {
      headers: this.authToken.getHeaders()
    })
      .map(res => res.json());
  }

  /*delete(id:number):Observable<any> {

  }*/

}
