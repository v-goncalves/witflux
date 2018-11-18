import { MediaSeries } from '../../media-data.model';
import { RequestStatus } from '../app.model';

export interface RecommendedSeriesModel {
  requestStatus: RequestStatus;
  data: MediaSeries[];
}
