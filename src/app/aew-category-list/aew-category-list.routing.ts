import { Routes } from '@angular/router';

import { AEWCategoryListComponent } from './aew-category-list.component';

export const AEWCategoryListRoutes: Routes = [{
  path: '',
  component: AEWCategoryListComponent,
  data: {
    breadcrumb: 'Category List',
    icon: 'icofont-home bg-c-blue',
    status: false
  }
}];
