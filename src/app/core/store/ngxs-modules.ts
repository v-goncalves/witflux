import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { environment } from '../../../environments/environment';
import { AppState } from './app.state';
import { MostPopularMoviesState } from './most-popular-movies/most-popular-movies.state';
import { RecommendedSeriesState } from './recommended-series/recommended-series.state';
import { DetailsState } from './details/details.state';

const ngxsDevModules = environment.production ? [] : [NgxsReduxDevtoolsPluginModule.forRoot()];
export const ngxsModules = [
  NgxsModule.forRoot([AppState, MostPopularMoviesState, RecommendedSeriesState, DetailsState]),
  ...ngxsDevModules
];
