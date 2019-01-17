import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TopComponentComponent } from './top-component/top-component.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'top' },
  { path: 'top', component: TopComponentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    { enableTracing: false, useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const RoutingComponents = [
  TopComponentComponent,
];