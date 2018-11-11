import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MediaGalleryComponent } from './media-gallery.component';
import { GalleryContainerModule } from '../gallery-container/gallery-container.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [MediaGalleryComponent],
  imports: [
    CommonModule,
    RouterModule,
    GalleryContainerModule
  ],
  exports: [MediaGalleryComponent]
})
export class MediaGalleryModule { }
