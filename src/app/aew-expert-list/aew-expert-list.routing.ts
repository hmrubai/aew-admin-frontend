import { Routes } from '@angular/router';

import { AEWExpertListComponent } from './aew-expert-list.component';

export const AEWExpertListRoutes: Routes = [{
  path: '',
  component: AEWExpertListComponent,
  data: {
    breadcrumb: 'Expert List',
    icon: 'icofont-home bg-c-blue',
    status: false
  }
}];
