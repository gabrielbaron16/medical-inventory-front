import { NgModule } from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {UnauthorizedGuard} from './guards/unauthorized/unauthorized.guard';
import {SessionGuard} from './guards/session/session.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: './components/categories/categories.module#CategoriesModule',
    canActivate: [UnauthorizedGuard]
  },
  {
    path: 'login',
    loadChildren: './components/login/login.module#LoginModule',
    canActivate: [SessionGuard]
  },
  {
    path: 'users',
    loadChildren: './components/users/users.module#UsersModule',
    canActivate: [UnauthorizedGuard]
  },
  {
    path: 'categories',
    loadChildren: './components/categories/categories.module#CategoriesModule',
    canActivate: [UnauthorizedGuard]
  },
  {
    path: 'departments',
    loadChildren: './components/departments/departments.module#DepartmentsModule',
    canActivate: [UnauthorizedGuard]
  },
  {
    path: 'presentations',
    loadChildren: './components/presentations/presentations.module#PresentationsModule',
    canActivate: [UnauthorizedGuard]
  },
  {
    path: 'brands',
    loadChildren: './components/brands/brands.module#BrandsModule',
    canActivate: [UnauthorizedGuard]
  },
  {
    path: 'items',
    loadChildren: './components/items/items.module#ItemsModule',
    canActivate: [UnauthorizedGuard]
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
