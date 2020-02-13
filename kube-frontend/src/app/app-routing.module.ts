import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClustersComponent } from './components/clusters/clusters.component';
import { ResourcesComponent } from './components/resources/resources.component';

const routes: Routes = [
  {
    path: '',
    component: ClustersComponent,
  },
  {
    path: ':clusterId/resources',
    component: ResourcesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
