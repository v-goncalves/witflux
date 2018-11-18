import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MediaMovie, MediaSeries } from '../../../core/media-data.model';
import { Select, Store } from '@ngxs/store';
import { MostPopularMoviesState } from '../../../core/store/most-popular-movies/most-popular-movies.state';
import { RecommendedSeriesState } from '../../../core/store/recommended-series/recommended-series.state';
import { GetMostPopularMovies } from '../../../core/store/most-popular-movies/most-popular-movies.actions';
import { GetRecommendedSeries } from '../../../core/store/recommended-series/recommended-series.actions';


@Component({
  selector: 'app-main-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {

  @Select(MostPopularMoviesState.selectMostPopularMovies()) movieGallery: MediaMovie[];
  @Select(RecommendedSeriesState.selectRecommendedSeries()) seriesGallery: MediaSeries[];

  constructor(
    private store: Store) {
    this.store.dispatch(GetMostPopularMovies);
    this.store.dispatch(GetRecommendedSeries);
  }
}
