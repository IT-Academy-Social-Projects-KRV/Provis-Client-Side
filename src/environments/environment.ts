// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { SweetAlertPosition } from "sweetalert2";

export const environment = {
  production: false,
  apiUrl: 'https://localhost:5001',
  imageSettings: {
    maxSize: 10, //Mb
    imageTypes: [
    'jpg',
    'jpeg',
    'pjpeg',
    'x-png',
    'gif',
    'png'
    ]
  },
  alertSettings:{
    timer: 1200, //ms
    position: 'top-end' as SweetAlertPosition,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
