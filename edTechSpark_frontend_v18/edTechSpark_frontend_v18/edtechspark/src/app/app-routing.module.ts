import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { adminAuthGuard } from './guards/admin-auth.guard';
import { userAuthGuard } from './guards/user-auth.guard';

const routes: Routes = [
  {
    path: 'admin', canActivate: [adminAuthGuard]
    , loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'user', canActivate: [userAuthGuard]
    , loadChildren: () => import('./user/user.module').then(m => m.UserModule)
  },
  { path: '', loadChildren: () => import('./public/public.module').then(m => m.PublicModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
