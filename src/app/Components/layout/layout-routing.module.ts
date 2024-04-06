import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { DashBoardComponent } from './Pages/dash-board/dash-board.component';
import { PersonalComponent } from './Pages/personal/personal.component';
import { HijoComponent } from './Pages/hijo/hijo.component';

const routes: Routes = [{
  path:"",
  component:LayoutComponent,
  children: [
    {
      path: "dashboard", component: DashBoardComponent
    },
    {
      path: "personal", component: PersonalComponent
    },
    {
      path: "personal/:id/hijos", component: HijoComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
