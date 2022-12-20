import { Routes } from '@angular/router';

import { AEWPackageListComponent } from './aew-package-list.component';

export const AEWPackageListRoutes: Routes = [{
  path: '',
  component: AEWPackageListComponent,
  data: {
    breadcrumb: 'Package List',
    icon: 'icofont-home bg-c-blue',
    status: false
  }
}];
