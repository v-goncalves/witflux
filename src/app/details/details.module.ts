import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsComponent } from './components/details/details.component';
import { RouterModule, Routes } from '@angular/router';
import { HeroDetailsComponent } from './components/hero-details/hero-details.component';
import { HeroContainerModule } from '../shared/hero-container/hero-container.module';
import { GalleryContainerModule } from '../shared/gallery-container/gallery-container.module';
import { MainContainerModule } from '../shared/main-container/main-container.module';

const routes: Routes = [
  {
    path: ':type/:id',
    component: DetailsComponent
  }
];

@NgModule({
  declarations: [DetailsComponent, HeroDetailsComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MainContainerModule,
    HeroContainerModule,
    GalleryContainerModule
  ]
})
export class DetailsModule { }
