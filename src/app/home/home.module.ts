import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { HeroComponent } from './components/hero/hero.component';
import { MediaGalleryModule } from '../shared/media-gallery/media-gallery.module';
import { HeroContainerModule } from '../shared/hero-container/hero-container.module';
import { MainContainerModule } from '../shared/main-container/main-container.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    HomeComponent,
    HeroComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MainContainerModule,
    MediaGalleryModule,
    HeroContainerModule
  ],
  exports: [HomeComponent]
})
export class HomeModule { }
