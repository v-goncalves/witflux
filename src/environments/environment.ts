// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { Environment } from './environment.model';

const apiKey = 'e673b23d22533e6b53cb40bab8e81d92';
export const environment: Environment = {
  production: false,
  api: {
    imageBaseUrl: 'https://image.tmdb.org/t/p/',
    getConfiguration: 'https://api.themoviedb.org/3/configuration?api_key=${apiKey}',
    getMostPopularMovies: `https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}`,
    getRecommendedSeries: `https://api.themoviedb.org/3/trending/tv/week?api_key=${apiKey}`,
    getMovieDetails: `https://api.themoviedb.org/3/movie/<id>?api_key=${apiKey}&language=en-US&append_to_response=credits`,
    getSeriesDetails: `https://api.themoviedb.org/3/tv/<id>?api_key=${apiKey}&language=en-US&append_to_response=credits`
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
