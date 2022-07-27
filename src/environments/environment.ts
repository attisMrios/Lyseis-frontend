// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyC0i5T3S-To_y5-gV8PBFPv-ltcS2Lks1E",
    authDomain: "mr-lyseis.firebaseapp.com",
    projectId: "mr-lyseis",
    storageBucket: "mr-lyseis.appspot.com",
    messagingSenderId: "821496510698",
    appId: "1:821496510698:web:3a738c428713a529513f93",
    measurementId: "G-HY8KN02QY4"
  },
  lyseis: {
    base_url: 'http://localhost:3000'
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
