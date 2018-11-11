import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-hero-container',
  template: `<ng-content></ng-content>`,
  styleUrls: ['./hero-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroContainerComponent { }
