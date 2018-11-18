import { MediaDetail, MediaType } from '../../media-data.model';
import { RequestStatus } from '../app.model';

export class GetMediaDetails {
  static readonly type = '[GetDetails] Get details: start request';
  constructor(public payload: {id: string, mediaType: MediaType}) {}
}
export class GetMediaDetailsSuccess {
  static readonly type = '[GetDetailsSuccess] Get details: success';
  readonly requestStatus: RequestStatus = RequestStatus.SUCCESS;
  constructor(public payload: {id: string; data: MediaDetail}) {}
}
export class GetMediaDetailsError {
  static readonly type = '[GetDetailsError] Get details: error';
  readonly requestStatus: RequestStatus = RequestStatus.ERROR;
  constructor(public payload: {id: string, data: void}) {}
}
