import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AEWCategoryListComponent } from './aew-category-list.component';
import { AEWCategoryListRoutes } from './aew-category-list.routing';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  imports: [
      CommonModule,
      RouterModule.forChild(AEWCategoryListRoutes),
      SharedModule

  ],
  declarations: [AEWCategoryListComponent]
})

export class AEWCategoryListModule {}
