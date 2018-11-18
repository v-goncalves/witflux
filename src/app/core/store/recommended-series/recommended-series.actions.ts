import { RequestStatus } from '../app.model';
import { MediaSeries } from '../../media-data.model';

export class GetRecommendedSeries {
  static readonly type = '[GetRecommendedSeries] Get recommended series: start request';
  constructor() {}
}
export class GetRecommendedSeriesSuccess {
  static readonly type = '[GetRecommendedSeriesSuccess] Get recommended series: success';
  readonly requestStatus: RequestStatus = RequestStatus.SUCCESS;
  constructor(public payload: MediaSeries[]) {}
}
export class GetRecommendedSeriesError {
  static readonly type = '[GetRecommendedSeriesError] Get recommended series: Error';
  readonly requestStatus: RequestStatus = RequestStatus.ERROR;
  readonly payload: MediaSeries[] = [];
  constructor() {}
}
