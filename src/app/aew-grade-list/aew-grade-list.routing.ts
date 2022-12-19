import { Routes } from '@angular/router';

import { AEWGradeListComponent } from './aew-grade-list.component';

export const AEWGradeListRoutes: Routes = [{
  path: '',
  component: AEWGradeListComponent,
  data: {
    breadcrumb: 'Grade List',
    icon: 'icofont-home bg-c-blue',
    status: false
  }
}];
