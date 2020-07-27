## FilmChain movies app

This repository (fc-frontend) contains a react app corresponding with the front end app for FilmChain movies app.

This app was created using create-react-app https://github.com/facebook/create-react-app.

It use @apollo/client (https://github.com/apollographql/apollo-client) to connect with our backend (https://github.com/matoscano/fc-backend).

Also include custom css for the style, mostly using styled-components approach (https://styled-components.com/)

It use storybook for preview our UI components(https://storybook.js.org/). Also use react testing library to test our components(https://testing-library.com/)

## ⚛️ How to run locally

Using the command `yarn start` the app runs in development mode.

`IMPORTANT`: We need to provide the url of our backend. Provide a .env file with the valid REACT_APP_FC_API_URL key.

## 🚀 Ready to deploy

Using the command `yarn build` builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!
