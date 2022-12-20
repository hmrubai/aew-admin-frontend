import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AEWPackageListComponent } from './aew-package-list.component';
import { AEWPackageListRoutes } from './aew-package-list.routing';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  imports: [
      CommonModule,
      RouterModule.forChild(AEWPackageListRoutes),
      SharedModule

  ],
  declarations: [AEWPackageListComponent]
})

export class AEWPackageListModule {}
