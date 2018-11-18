import { MediaDetail } from '../../media-data.model';
import { RequestStatus } from '../app.model';

export interface DetailsModel {
  [id: string]: {
    requestStatus: RequestStatus;
    data: MediaDetail;
  };
}
