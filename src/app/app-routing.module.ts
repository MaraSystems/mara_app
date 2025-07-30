import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/features/home.module').then(
      (m) => m.HomeModule
    )
  },
  {
    path: '404',
    loadChildren: () => import('./notfound/notfound.module').then(
      (m) => m.NotfoundModule
    )
  },
  {
    path: '**',
    redirectTo: '404'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      {
        anchorScrolling: 'enabled',
        scrollPositionRestoration: 'enabled',
        scrollOffset: [0, 100]
      }
    )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
