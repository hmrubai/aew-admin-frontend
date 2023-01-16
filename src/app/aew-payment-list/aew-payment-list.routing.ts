import { Routes } from '@angular/router';

import { AEWPaymentListComponent } from './aew-payment-list.component';

export const AEWPaymentListRoutes: Routes = [{
  path: '',
  component: AEWPaymentListComponent,
  data: {
    breadcrumb: 'Payment List',
    icon: 'icofont-home bg-c-blue',
    status: false
  }
}];
