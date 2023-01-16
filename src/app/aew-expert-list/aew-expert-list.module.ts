import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AEWExpertListComponent } from './aew-expert-list.component';
import { AEWExpertListRoutes } from './aew-expert-list.routing';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  imports: [
      CommonModule,
      RouterModule.forChild(AEWExpertListRoutes),
      SharedModule

  ],
  declarations: [AEWExpertListComponent]
})

export class AEWExpertListModule {}
