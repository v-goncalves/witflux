import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { MediaMovie, MediaSeries } from '../../shared/store/media.model';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private readonly apiConfiguration = environment.api;
  private readonly imageBaseUrl = this.apiConfiguration.imageBaseUrl;
  private readonly maxResults = 10;

  constructor(
    private http: HttpClient
  ) { }

  getMostPopularMovies(): Observable<MediaMovie[]> {
    return this.http.get(this.apiConfiguration.getMostPopularMovies)
      .pipe(
        switchMap(({results}: any) => of (
          results
            .splice(0, this.maxResults)
            .map(item => this.parseMediaMovie(item))
        )),
        catchError(() => of ([]))
      );
  }

  getRecommendedSeries(): Observable<MediaSeries[]> {
    return this.http.get(this.apiConfiguration.getRecommendedSeries)
      .pipe(
        switchMap(({results}: any) => of (
          results
            .splice(0, this.maxResults)
            .map(item => this.parseMediaSeries(item))
        )),
        catchError(() => of ([]))
      );
  }

  private parseMediaMovie(item: any): MediaMovie {
    return {
      ...this.parseMediaSeries(item),
      score: item.vote_average
    };
  }

  private parseMediaSeries(item: any): MediaSeries {
    return {
      id: item.id,
      title: item.name,
      imageBaseUrl: this.imageBaseUrl,
      imageFile: item.poster_path,
    };
  }
}
