import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from '../layout/layout.component';
import { DashBoardComponent } from './Pages/dash-board/dash-board.component';
import { PersonalComponent } from './Pages/personal/personal.component';
import { SharedModule } from '../../Reutilizable/shared/shared.module';
import { ModalPersonalComponent } from './Modales/modal-personal/modal-personal.component';
import { HijoComponent } from './Pages/hijo/hijo.component';
import { ModalHijoComponent } from './Modales/modal-hijo/modal-hijo.component';

@NgModule({
  declarations: [
    LayoutComponent,
    DashBoardComponent,
    PersonalComponent,
    ModalPersonalComponent,
    HijoComponent,
    ModalHijoComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    SharedModule
  ],
  exports:[
    LayoutComponent
  ]
})
export class LayoutModule { }
