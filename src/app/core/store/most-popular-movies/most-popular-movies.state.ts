import { Action, Selector, State, StateContext } from '@ngxs/store';
import { MostPopularMoviesModel } from './most-popular-movies.model';
import { appStoreName, RequestStatus } from '../app.model';
import { MediaApiService } from '../../media-api-services/media-api.service';
import { catchError } from 'rxjs/operators';
import { MediaMovie } from '../../media-data.model';
import { GetMostPopularMovies, GetMostPopularMoviesError, GetMostPopularMoviesSuccess } from './most-popular-movies.actions';
import { GetMediaDetails } from '../details/details.actions';

export const mostPopularMoviesName = 'mostPopularMovies';
@State<MostPopularMoviesModel>({
  name: mostPopularMoviesName,
  defaults: <MostPopularMoviesModel>{
    requestStatus: RequestStatus.NOT_DONE,
    data: null
  }
})
export class MostPopularMoviesState {
  constructor(
    private mediaService: MediaApiService
  ) {}

  @Selector()
  static selectMostPopularMovies() {
    return (state: { [appStoreName]: MostPopularMoviesModel }) => state &&
      state[appStoreName] && state[appStoreName][mostPopularMoviesName] &&
      state[appStoreName][mostPopularMoviesName].data;
  }

  @Action(GetMostPopularMovies, { cancelUncompleted: true })
  getMostPopularMovies(ctx: StateContext<MostPopularMoviesModel>) {
    const oldCtx = ctx.getState();

    if (oldCtx.requestStatus === RequestStatus.IN_PROGRESS) {
      return;
    }

    ctx.patchState({
      ...oldCtx,
      requestStatus: RequestStatus.IN_PROGRESS
    });

    // the request
    this.mediaService.getMostPopularMovies()
      .pipe(
        catchError(() => ctx.dispatch(new GetMostPopularMoviesError()))
      )
      .subscribe((movie: MediaMovie[]) => ctx.dispatch(new GetMostPopularMoviesSuccess(movie)));
  }

  @Action(GetMostPopularMoviesSuccess)
  private getMostPopularMoviesSuccess(ctx: StateContext<MostPopularMoviesModel>, action: GetMostPopularMoviesSuccess) {
    this.getMostPopularMoviesRequestResponse(ctx, action);
  }

  @Action(GetMostPopularMoviesError)
  private GetMostPopularMoviesError(ctx: StateContext<MostPopularMoviesModel>, action: GetMostPopularMoviesSuccess) {
    this.getMostPopularMoviesRequestResponse(ctx, action);
  }

  private getMostPopularMoviesRequestResponse(ctx: StateContext<MostPopularMoviesModel>, action: GetMostPopularMoviesSuccess |
    GetMostPopularMoviesError) {
    const oldCtx = ctx.getState();
    ctx.patchState({
      ...oldCtx,
      requestStatus: action.requestStatus,
      data: [...action.payload]
    });
  }
}
