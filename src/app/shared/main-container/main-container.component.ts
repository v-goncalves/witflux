import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-main-container',
  template: `<ng-content></ng-content>`,
  styleUrls: ['./main-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainContainerComponent { }
