import {Component, OnInit, OnDestroy} from '@angular/core';
import {UserService} from '../services/user.service';
import {Subscription} from 'rxjs/Rx';

@Component({
  moduleId: module.id,
  templateUrl: 'user.component.html',
  styleUrls: ['user.component.scss']
})

export class UserComponent implements OnInit, OnDestroy{

  user:any = {};
  obs:Subscription;

  constructor(private userService: UserService) {}

  logout(): void {
    return this.userService.logout();
  }

  ngOnInit() {
    this.obs = this.userService.getCurrentUser()
      .subscribe((user:any) => this.user = user);
  }

  ngOnDestroy() {
    this.obs.unsubscribe();
    this.user = null;
  }
}
