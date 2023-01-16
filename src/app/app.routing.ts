import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';
import { AuthGuard } from './_helpers/auth.guard';

export const AppRoutes: Routes = [

  { path: '', component: AdminLayoutComponent, loadChildren: () => import('./home/home.module').then(m => m.HomeModule), canActivate: [AuthGuard] },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'login',
        loadChildren: () => import('./authentication/login-system-admin/login-system-admin.module').then(m => m.LoginSystemAdminModule),
      },
      {
        path: 'admin/register',
        loadChildren: () => import('./authentication/register-system-admin/register-system-admin.module')
          .then(m => m.RegisterSystemAdminModule),
      }
    ]
  },
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
         canActivate: [AuthGuard]
      },
      {
        path: 'change-password',
        loadChildren: () => import('./change-password/change-password.module').then(m => m.ChangePasswordModule),
        // canActivate: [AuthGuard]
      },
      {
        path: 'aew-package-type',
        loadChildren: () => import('./aew-package-type/aew-package-type.module').then(m => m.AEWPackageTypeModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'aew-grade-list',
        loadChildren: () => import('./aew-grade-list/aew-grade-list.module').then(m => m.AEWGradeListModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'aew-category-list',
        loadChildren: () => import('./aew-category-list/aew-category-list.module').then(m => m.AEWCategoryListModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'aew-package-list',
        loadChildren: () => import('./aew-package-list/aew-package-list.module').then(m => m.AEWPackageListModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'aew-benefit-list/:package_id',
        loadChildren: () => import('./aew-benefit-list/aew-benefit-list.module').then(m => m.PackageBenefitListModule),
        // canActivate: [AuthGuard]
      },
      {
        path: 'aew-news-list',
        loadChildren: () => import('./aew-news-list/aew-news-list.module').then(m => m.AEWNewsListModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'aew-topic-list',
        loadChildren: () => import('./aew-topic-list/aew-topic-list.module').then(m => m.AEWTopicListModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'aew-expert-list',
        loadChildren: () => import('./aew-expert-list/aew-expert-list.module').then(m => m.AEWExpertListModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'school-list',
        loadChildren: () => import('./school-list/school-list.module').then(m => m.SchoolListModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'aew-payment-list',
        loadChildren: () => import('./aew-payment-list/aew-payment-list.module').then(m => m.AEWPaymentListModule),
        canActivate: [AuthGuard]
      },
      
    ]
  },
  {
    path: '**',
    redirectTo: '/'
  }
];
