import {Injectable} from '@angular/core';
import {Headers} from '@angular/http';

@Injectable()

export class AuthToken {
  getToken(): string {
    return window.localStorage.getItem('token');
  }

  setToken(token?): void {
    if(token) {
      window.localStorage.setItem('token', token);
    }else {
      window.localStorage.removeItem('token');
    }
  }

  getHeaders(): Headers {
    let headers = new Headers();
    headers.append('x-access-token', this.getToken());
    return headers;
  }
}
