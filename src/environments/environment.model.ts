export interface Environment {
  production: boolean;
  api: {
    imageBaseUrl: string;
    getConfiguration: string;
    getMostPopularMovies: string;
    getRecommendedSeries: string;
    getMovieDetails: string;
    getSeriesDetails: string;
  };
}
