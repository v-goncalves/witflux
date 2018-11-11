import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-gallery-container',
  template: `<ng-content></ng-content>`,
  styleUrls: ['./gallery-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GalleryContainerComponent { }
