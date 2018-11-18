import { Action, Selector, State, StateContext } from '@ngxs/store';
import { DetailsModel } from './details.model';
import { DetailsApiService } from '../../media-api-services/details-api.service';
import { AppModel, appStoreName, RequestStatus } from '../app.model';
import { catchError, refCount, tap } from 'rxjs/operators';
import { MediaDetail } from '../../media-data.model';
import { GetMediaDetails, GetMediaDetailsError, GetMediaDetailsSuccess } from './details.actions';

const detailsName = 'details';
@State<DetailsModel>({
  name: 'details',
  defaults: <DetailsModel>{}
})
export class DetailsState {
  constructor(
    private detailsApiService: DetailsApiService
  ) {}

  @Selector([])
  static selectDetailsById(id: string) {
    return (state: { [appStoreName]: AppModel }) => state && state[appStoreName] &&
      state[appStoreName][detailsName] && state[appStoreName][detailsName][id] &&
      state[appStoreName][detailsName][id].data;
  }

  @Action(GetMediaDetails)
  getMediaDetails(ctx: StateContext<DetailsModel>, action: GetMediaDetails) {
    const oldCtx: DetailsModel = ctx.getState();
    const {id, mediaType} = action.payload;

    if (oldCtx.details && oldCtx.details[id] && oldCtx.details[id].requestStatus === RequestStatus.IN_PROGRESS) {
      return;
    }

    const detailsItem: DetailsModel = {
      [id]: {
        data: oldCtx.details && oldCtx.details[id] ? oldCtx.details[id].data : null,
        requestStatus: RequestStatus.IN_PROGRESS
      }
    };
    ctx.patchState({
      ...oldCtx,
      ...detailsItem
    });

    // the request
    this.detailsApiService.getDetails(id, mediaType)
      .pipe(
        catchError(() => ctx.dispatch(new GetMediaDetailsError({id, data: null})))
      )
      .subscribe((data: MediaDetail) => ctx.dispatch(new GetMediaDetailsSuccess({id, data})));
  }

  @Action(GetMediaDetailsSuccess)
  private getMediaDetailsSuccess(ctx: StateContext<DetailsModel>, action: GetMediaDetailsSuccess) {
    this.getMediaDetailsRequestResponse(ctx, action);
  }

  @Action(GetMediaDetailsError)
  private getMediaDetailsError(ctx: StateContext<DetailsModel>, action: GetMediaDetailsSuccess) {
    this.getMediaDetailsRequestResponse(ctx, action);
  }

  private getMediaDetailsRequestResponse(ctx: StateContext<DetailsModel>, action: GetMediaDetailsSuccess | GetMediaDetailsSuccess) {
    const oldCtx = ctx.getState();
    const {id, data } = action.payload;
    ctx.patchState({
      ...oldCtx,
      [id]: {
        requestStatus: action.requestStatus,
        data: data
      }
    });
  }
}
