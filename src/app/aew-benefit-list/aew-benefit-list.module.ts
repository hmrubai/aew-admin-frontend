import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { PackageBenefitListComponent } from './aew-benefit-list.component';
import { PackageBenefitListRoutes } from './aew-benefit-list.routing';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  imports: [
      CommonModule,
      RouterModule.forChild(PackageBenefitListRoutes),
      SharedModule

  ],
  declarations: [PackageBenefitListComponent]
})

export class PackageBenefitListModule {}
