import { Routes } from '@angular/router'

export const routes: Routes = [
  {
    path: 'constants',
    loadChildren: () => import('./routes/constants/constants.module').then(mod => mod.ConstantsModule)
  },
  {
    path: 'triangles',
    loadChildren: () => import('./routes/triangles/triangles.module').then(mod => mod.TrianglesModule)
  },
  {path: '**', redirectTo: 'triangles'}
]
