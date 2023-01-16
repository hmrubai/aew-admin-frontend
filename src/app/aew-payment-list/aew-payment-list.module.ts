import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AEWPaymentListComponent } from './aew-payment-list.component';
import { AEWPaymentListRoutes } from './aew-payment-list.routing';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  imports: [
      CommonModule,
      RouterModule.forChild(AEWPaymentListRoutes),
      SharedModule

  ],
  declarations: [AEWPaymentListComponent]
})

export class AEWPaymentListModule {}
