# Analytics

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.3.2.
create database named 'analyst' and password 'password' which run on port '5432' in postgres
## Development server

Run 3 terminal with following cmds :-
1.  npm run client-watch
2.  npm run server
3.  ./ngrok 3000

##API's
request '/list' of type 'get' to see all page visits:-
following query parameters can be possible:-
  "userId": "1", (optional)
  "fromDate": "2018-04-13", (optional)
  "toDate": "01-01-2019", (optional)
  "pageUrl": "http://ab3d7c37.ngrok.io/", (optional)
  "country": "india", (optional)
  "browserName": "chrome", (optional)
  "limit": "10", (optional)
  "skip": "0" (optional)

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
