import { RequestStatus } from '../app.model';
import { MediaMovie } from '../../media-data.model';

export class GetMostPopularMovies {
  static readonly type = '[GetMostPopularMovies] Get most popular movies: start request';
  constructor() {}
}
export class GetMostPopularMoviesSuccess {
  static readonly type = '[GetMostPopularMoviesSuccess] Get most popular movies: success';
  readonly requestStatus: RequestStatus = RequestStatus.SUCCESS;
  constructor(public payload: MediaMovie[]) {}
}
export class GetMostPopularMoviesError {
  static readonly type = '[GetMostPopularMoviesError] Get most popular movies: Error';
  readonly requestStatus: RequestStatus = RequestStatus.ERROR;
  readonly payload: MediaMovie[] = [];
  constructor() {}
}
