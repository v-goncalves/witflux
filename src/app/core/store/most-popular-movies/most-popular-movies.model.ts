import { MediaMovie } from '../../media-data.model';
import { RequestStatus } from '../app.model';

export interface MostPopularMoviesModel {
  requestStatus: RequestStatus;
  data: MediaMovie[];
}
