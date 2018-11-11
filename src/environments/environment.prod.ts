import { Environment } from './environment.model';

const apiKey = 'e673b23d22533e6b53cb40bab8e81d92';
export const environment: Environment = {
  production: true,
  api: {
    imageBaseUrl: 'https://image.tmdb.org/t/p/',
    getConfiguration: 'https://api.themoviedb.org/3/configuration?api_key=${apiKey}',
    getMostPopularMovies: `https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}`,
    getRecommendedSeries: `https://api.themoviedb.org/3/trending/tv/week?api_key=${apiKey}`,
    getMovieDetails: 'https://api.themoviedb.org/3/movie/{{ID-DO-FILME}}?api_key=${apiKey}&language=en-US&append_to_response=credits',
    getSeriesDetails: `https://api.themoviedb.org/3/tv/<id>?api_key=${apiKey}&language=en-US&append_to_response=credits`
  }
};
