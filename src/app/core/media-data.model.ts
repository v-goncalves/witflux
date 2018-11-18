export enum MediaType {
  MOVIE,
  SERIES
}

// Series
export interface MediaSeries {
  id: string;
  title: string;
  imageBaseUrl: string;
  imageFile: string;
}

// Movie
export interface MediaMovie extends MediaSeries {
  score: string;
}

// sub-part of details
export interface MediaCastDetails {
  id: string;
  name: string;
  character: string;
  imageFile: string;
}

// media details (movie & series)
export interface MediaDetail {
  mediaType: MediaType;
  title: string;
  overview: string;
  year: string;
  directorName: string;
  writerName: string;
  voteAverage: number;
  imageBaseUrl: string;
  posterImageFile: string;
  backdropImageFile: string;
  movieFacts: {
    label: string;
    ariaLabel: string;
    value: string
  }[];
  cast: MediaCastDetails[];
}
