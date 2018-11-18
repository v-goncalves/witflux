import { Action, Selector, State, StateContext } from '@ngxs/store';
import { AppModel, appStoreName, RequestStatus } from '../app.model';
import { MediaApiService } from '../../media-api-services/media-api.service';
// import { appStoreName } from '../app.state';
import { catchError } from 'rxjs/operators';
import { MediaSeries } from '../../media-data.model';
import { RecommendedSeriesModel } from './recommended-series.model';
import { GetRecommendedSeries, GetRecommendedSeriesError, GetRecommendedSeriesSuccess } from './recommended-series.actions';
import { GetMediaDetails } from '../details/details.actions';

export const recommendedSeriesName = 'recommendedSeries';
@State<RecommendedSeriesModel>({
  name: recommendedSeriesName,
  defaults: <RecommendedSeriesModel>{
    requestStatus: RequestStatus.NOT_DONE,
    data: null
  }
})
export class RecommendedSeriesState {
  constructor(
    private mediaService: MediaApiService
  ) {}

  @Selector()
  static selectRecommendedSeries() {
    return (state: { [appStoreName]: AppModel }) =>
      state && state[appStoreName] && state[appStoreName][recommendedSeriesName] &&
      state[appStoreName][recommendedSeriesName].data;
  }

  @Action(GetRecommendedSeries, { cancelUncompleted: true })
  getRecommendedSeries(ctx: StateContext<RecommendedSeriesModel>) {
    const oldCtx = ctx.getState();

    if (oldCtx.requestStatus === RequestStatus.IN_PROGRESS) {
      return;
    }

    ctx.patchState({
      ...oldCtx,
      requestStatus: RequestStatus.IN_PROGRESS
    });

    // the request
    this.mediaService.getRecommendedSeries()
      .pipe(
        catchError(() => ctx.dispatch(new GetRecommendedSeriesError()))
      )
      .subscribe((series: MediaSeries[]) => ctx.dispatch(new GetRecommendedSeriesSuccess(series)));
  }

  @Action(GetRecommendedSeriesSuccess)
  private getRecommendedSeriesSuccess(ctx: StateContext<RecommendedSeriesModel>, action: GetRecommendedSeriesSuccess) {
    this.getRecommendedSeriesRequestResponse(ctx, action);
  }

  @Action(GetRecommendedSeriesError)
  private getRecommendedSeriesError(ctx: StateContext<RecommendedSeriesModel>, action: GetRecommendedSeriesError) {
    this.getRecommendedSeriesRequestResponse(ctx, action);
  }

  private getRecommendedSeriesRequestResponse(ctx: StateContext<RecommendedSeriesModel>, action: GetRecommendedSeriesSuccess |
    GetRecommendedSeriesError) {
    const oldCtx = ctx.getState();
    ctx.patchState({
      ...oldCtx,
      requestStatus: action.requestStatus,
      data: [...action.payload]
    });
  }
}
