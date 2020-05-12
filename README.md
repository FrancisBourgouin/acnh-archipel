# AniPelago - Animal Crossing Community Turnip-Sharing App

Welcome to the AniPelago, where New Horizons islanders band together to form an archipelago to share and keep track of turnip prices.

## Installation

Install server and client project directories by running

`yarn run init`

Ensure that you have MongoDB installed. If you have mongo running as a service, you can simply start the app. Otherwise, run `yarn run mongo` to start the mongo service locally.

With your mongo service running, run `yarn run seed-db` to seed your database.

## Running the App

To run both environments in a single terminal window, run `yarn run dev`.

Alternatively, you may run `yarn run server` and `yarn run client` in unique tabs/windows to run and monitor them separately (suggested for development).

## Tech stack

### Client

-   React (https://create-react-app.dev/)
-   Sass (SCSS) (https://sass-lang.com/)
-   Tachyons (https://tachyons.io/)
-   Tesseract (https://tesseract.projectnaptha.com/)
-   Chart.js (https://www.chartjs.org/)
-   URQL (https://github.com/FormidableLabs/urql)

### Backend

-   Express.js (https://expressjs.com/)
-   Express GraphQL (https://github.com/graphql/express-graphql)
-   MongoDB (https://www.mongodb.com/)

### Scaffolding / Testing

-   Storybook (https://storybook.js.org/)
-   Jest (https://jestjs.io/)
-   react-testing-library (https://testing-library.com/docs/react-testing-library/)
-   Cypress (https://www.cypress.io/)

## Deployment Stack

-   Netlify (Client)
-   Heroku (Backend)
-   Atlas (Database)
