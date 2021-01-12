import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPanelComponent } from './main-panel/main-panel.component';
import { SingleBookPanelComponent } from './single-book-panel/single-book-panel.component';

const routes: Routes = [
  {path: "", component: MainPanelComponent},
  {path: "autor", component: SingleBookPanelComponent},
  {path: "libro", component: SingleBookPanelComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
