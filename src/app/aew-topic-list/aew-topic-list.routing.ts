import { Routes } from '@angular/router';

import { AEWTopicListComponent } from './aew-topic-list.component';

export const AEWTopicListRoutes: Routes = [{
  path: '',
  component: AEWTopicListComponent,
  data: {
    breadcrumb: 'Topic List',
    icon: 'icofont-home bg-c-blue',
    status: false
  }
}];
