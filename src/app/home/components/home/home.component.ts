import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HomeService } from '../../services/home.service';
import { Observable } from 'rxjs';
import { MediaMovie, MediaSeries } from '../../../shared/store/media.model';


@Component({
  selector: 'app-main-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {

  movieGallery: Observable<MediaMovie[]> = this.homeService.getMostPopularMovies();
  seriesGallery: Observable<MediaSeries[]> = this.homeService.getRecommendedSeries();

  constructor(
    private homeService: HomeService,
  ) { }
}
