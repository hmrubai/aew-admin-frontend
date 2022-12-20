import { Routes } from '@angular/router';

import { PackageBenefitListComponent } from './aew-benefit-list.component';

export const PackageBenefitListRoutes: Routes = [{
  path: '',
  component: PackageBenefitListComponent,
  data: {
    breadcrumb: 'Benefit List',
    icon: 'icofont-home bg-c-blue',
    status: false
  }
}];
