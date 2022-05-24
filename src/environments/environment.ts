// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // ws_url: 'https://pripod.com/bizconnect-api',
  // img_baseurl: 'https://pripod.com/bizconnect-api/',
  // cardurl : 'https://pripod.com/bizconnect',
  cardurl : 'http://localhost:4200/',
  ws_url: 'http://localhost:4000',
  img_baseurl: 'http://localhost:4000/',
  store_id: "5d0ca4c89f21de0314f98f24",
  google_id:"782390903775-8ug6n0ttdr2ort8bu50ei4nblifhhir8.apps.googleusercontent.com",
  facebook_id: "",
  instagram_id: "3154264299.1677ed0.8ae4dd21a5f14cddbf22a4acab719039",
  ccavenue_payment_url: "https://test.ccavenue.com/transaction/transaction.do?command=initiateTransaction",
  server_public_key: null
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
