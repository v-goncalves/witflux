import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { switchMap, } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { MediaCastDetails, MediaDetail, MediaType } from '../media-data.model';

@Injectable({
  providedIn: 'root'
})
export class DetailsApiService {
  private readonly apiConfiguration = environment.api;
  private readonly imageBaseUrl = this.apiConfiguration.imageBaseUrl;
  private readonly maxResultsCastItems = 10;

  constructor(
    private http: HttpClient
  ) {}

  getDetails(id: string, mediaType: MediaType): Observable<MediaDetail> {
    const url = mediaType === MediaType.MOVIE ? this.apiConfiguration.getMovieDetails :
      this.apiConfiguration.getSeriesDetails;
    return this.http.get(url.replace('<id>', id))
      .pipe(
        switchMap((data: any) => of (
          this.parseDetails(data, mediaType)
        ))
      );
  }

  private parseDetails(data: any, mediaType: MediaType): MediaDetail {
    const releaseDate: any = this.parseReleaseDate(new Date(data.release_date || data.last_air_date));
    const language = this.parseLanguage(data);
    const budgetValue = this.parseBudgetValue(data.budget || '');
    const genresValue = data.genres.map(i => i.name).join(', ');
    const cast: MediaCastDetails[] = this.parseCast(data);

    return {
      mediaType: mediaType,
      title: data.original_title || data.title,
      overview: data.overview,
      year: data.release_date && new Date(data.release_date).getFullYear().toString() || '',
      directorName: this.parseDirectorName(data),
      writerName: this.parseWriterName(data),
      voteAverage: data.vote_average,
      imageBaseUrl: this.imageBaseUrl,
      backdropImageFile: data.backdrop_path,
      posterImageFile: data.poster_path,
      movieFacts: [
        {
          label: 'Status',
          ariaLabel: `Movie Status: ${data.status}`,
          value: data.status
        },
        {
          label: 'Date',
          ariaLabel: `Movie Release Date: ${releaseDate}`,
          value: releaseDate
        },
        {
          label: 'Language',
          ariaLabel: `Movie Language: ${language}`,
          value: language
        },
        {
          label: 'Runtime',
          ariaLabel: data.runtime ? `Total Runtime: ${data.runtime} minutes` : '-',
          value: data.runtime ? (data.runtime + ' minutes') : '-'
        },
        {
          label: 'Budget',
          ariaLabel: `Movie Budget: ${budgetValue}`,
          value: budgetValue
        },
        {
          label: 'Genres',
          ariaLabel: `Movie Genres: ${genresValue}`,
          value: genresValue
        }
      ],
      cast: cast
    };
  }

  private parseReleaseDate(releaseDate: Date): string {
    const day: number = releaseDate.getDate();
    const dayString: string = day + (day > 3 && 'th' || day === 1 && '1st' || day === 2 && 'nd' || 'rd');
    return [releaseDate.toLocaleString( 'en-us', { month: 'long' }), dayString,
      releaseDate.getFullYear()].join(' ');
  }

  private parseLanguage(originalData: any): string {
    try {
      return originalData.spoken_languages.filter(r => r.iso_639_1 === originalData.original_language)[0].name;
    } catch (e) {
      return originalData.original_language;
    }
  }

  private parseBudgetValue(budget: string) {
    return budget ? ('$' + budget.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')) : '-';
  }

  private parseCast(originalData: any): MediaCastDetails[] {
    return originalData.credits.cast.slice(0, this.maxResultsCastItems)
      .map(castItem => ({
        id: castItem && castItem.cast_id,
        name: castItem && castItem.name,
        character: castItem && castItem.character,
        imageFile: castItem && castItem.profile_path,
      }));
  }

  private parseDirectorName(originalData: any): string {
    return this.parseCrewNameByJob(originalData, 'Director');
  }

  private parseWriterName(originalData: any): string {
    return this.parseCrewNameByJob(originalData, 'Writer');
  }

  private parseCrewNameByJob(originalData: any, crewJob): string {
    try {
      const [{name}] = originalData.credits.crew.filter(i => i.job === crewJob);
      return name;
    } catch (e) {
      return '';
    }
  }

}
