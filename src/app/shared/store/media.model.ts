export interface MediaSeries {
  id: string;
  title: string;
  imageBaseUrl: string;
  imageFile: string;
}

export interface MediaMovie extends MediaSeries {
  score: string;
}

export interface MediaCastDetails {
  id: string;
  name: string;
  character: string;
  imageFile: string;
}

export interface MediaDetails {
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
