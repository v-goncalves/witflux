import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MediaDetail } from '../../../core/media-data.model';

@Component({
  selector: 'app-hero-details',
  templateUrl: './hero-details.component.html',
  styleUrls: ['./hero-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroDetailsComponent {
  @Input() mediaDetails: MediaDetail;
}
