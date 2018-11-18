import { State } from '@ngxs/store';
import { DetailsState } from './details/details.state';
import { MostPopularMoviesState } from './most-popular-movies/most-popular-movies.state';
import { RecommendedSeriesState } from './recommended-series/recommended-series.state';
import { AppModel, appStoreName } from './app.model';

@State<AppModel>({
  name: appStoreName,
  defaults: <AppModel>{
    version: '1.0.0'
  },
  children: [MostPopularMoviesState, RecommendedSeriesState, DetailsState]
})
export class AppState {}
