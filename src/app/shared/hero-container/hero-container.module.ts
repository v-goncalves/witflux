import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroContainerComponent } from './hero-container.component';

@NgModule({
  declarations: [HeroContainerComponent],
  imports: [
    CommonModule
  ],
  exports: [HeroContainerComponent]
})
export class HeroContainerModule { }
