import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AEWTopicListComponent } from './aew-topic-list.component';
import { AEWTopicListRoutes } from './aew-topic-list.routing';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  imports: [
      CommonModule,
      RouterModule.forChild(AEWTopicListRoutes),
      SharedModule

  ],
  declarations: [AEWTopicListComponent]
})

export class AEWTopicListModule {}
