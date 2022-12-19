import { Routes } from '@angular/router';

import { AEWPackageTypeComponent } from './aew-package-type.component';

export const AEWPackageTypeRoutes: Routes = [{
  path: '',
  component: AEWPackageTypeComponent,
  data: {
    breadcrumb: 'Syllabus List',
    icon: 'icofont-home bg-c-blue',
    status: false
  }
}];
