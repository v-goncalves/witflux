import { Component, Input } from '@angular/core';
import { MediaDetails } from '../../../shared/store/media.model';

@Component({
  selector: 'app-hero-details',
  templateUrl: './hero-details.component.html',
  styleUrls: ['./hero-details.component.scss']
})
export class HeroDetailsComponent {
  @Input() mediaDetails: MediaDetails;
}
