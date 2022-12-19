import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home.component';
import { HomeRoutes } from './home.routing';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  imports: [
      CommonModule,
      RouterModule.forChild(HomeRoutes),
      SharedModule
  ],
  declarations: [HomeComponent]
})

export class HomeModule {}
