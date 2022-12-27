import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AEWNewsListComponent } from './aew-news-list.component';
import { AEWNewsListRoutes } from './aew-news-list.routing';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  imports: [
      CommonModule,
      RouterModule.forChild(AEWNewsListRoutes),
      SharedModule

  ],
  declarations: [AEWNewsListComponent]
})

export class AEWNewsListModule {}
