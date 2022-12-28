import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { SchoolListComponent } from './school-list.component';
import { SchoolListRoutes } from './school-list.routing';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  imports: [
      CommonModule,
      RouterModule.forChild(SchoolListRoutes),
      SharedModule

  ],
  declarations: [SchoolListComponent]
})

export class SchoolListModule {}
