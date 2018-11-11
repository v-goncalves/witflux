import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryContainerComponent } from './gallery-container.component';

@NgModule({
  declarations: [GalleryContainerComponent],
  imports: [
    CommonModule
  ],
  exports: [GalleryContainerComponent]
})
export class GalleryContainerModule { }
