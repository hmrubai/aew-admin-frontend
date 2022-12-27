import { Routes } from '@angular/router';

import { AEWNewsListComponent } from './aew-news-list.component';

export const AEWNewsListRoutes: Routes = [{
  path: '',
  component: AEWNewsListComponent,
  data: {
    breadcrumb: 'News List',
    icon: 'icofont-home bg-c-blue',
    status: false
  }
}];
