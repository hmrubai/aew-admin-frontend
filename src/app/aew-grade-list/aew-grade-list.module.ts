import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AEWGradeListComponent } from './aew-grade-list.component';
import { AEWGradeListRoutes } from './aew-grade-list.routing';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  imports: [
      CommonModule,
      RouterModule.forChild(AEWGradeListRoutes),
      SharedModule

  ],
  declarations: [AEWGradeListComponent]
})

export class AEWGradeListModule {}
