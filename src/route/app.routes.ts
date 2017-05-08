import {RouterModule, Routes} from '@angular/router';
import {UserComponent} from '../user/user.component';
import {AuthGuard} from '../guards/auth.guard'

const routes:Routes = [
  {
    path: 'user',
    component: UserComponent,
    canActivate: [AuthGuard]
  }
];

export const AppRoutes = RouterModule.forRoot(routes);
