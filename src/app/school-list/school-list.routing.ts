import { Routes } from '@angular/router';

import { SchoolListComponent } from './school-list.component';

export const SchoolListRoutes: Routes = [{
  path: '',
  component: SchoolListComponent,
  data: {
    breadcrumb: 'School List',
    icon: 'icofont-home bg-c-blue',
    status: false
  }
}];
