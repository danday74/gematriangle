import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrianglesRoutingModule } from './triangles-routing.module';
import { TrianglesComponent } from './triangles.component';


@NgModule({
  declarations: [TrianglesComponent],
  imports: [
    CommonModule,
    TrianglesRoutingModule
  ]
})
export class TrianglesModule { }
