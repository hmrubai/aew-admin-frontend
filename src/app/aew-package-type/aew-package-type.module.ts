import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AEWPackageTypeComponent } from './aew-package-type.component';
import { AEWPackageTypeRoutes } from './aew-package-type.routing';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  imports: [
      CommonModule,
      RouterModule.forChild(AEWPackageTypeRoutes),
      SharedModule

  ],
  declarations: [AEWPackageTypeComponent]
})

export class AEWPackageTypeModule {}
