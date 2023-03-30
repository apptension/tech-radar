![Apptension Tech Radar](./public/images/og_image.png)

## Overview

Bootstrapped with [Create React App (by Apptension)](https://github.com/apptension/react-scripts-apptension).

The Tech Radar is a tool to support production teams at Apptension in presenting in front of the clients and candidates what technologies, tools, and methods they use internally. It also allows to pick the best stacks for our future projects based on shared experience levels and trends we pursue.

![Filtered Radar](./images/radar.png)

![Technology Details](./images/radar_tech.png)

## What is the Tech Radar?

The Tech Radar is a list of technologies along with their assessment result presented as 4 rings with the following meanings:

**In use** - Technologies we have high confidence in. Technologies with a usage culture in our production environment, low risk and recommended to be widely used.

**Proven** - Technologies that work really well to solve real problems in projects. We've worked with them and they've proven to be effective. These technologies are slightly more risky. Some of our engineers walked this path and will share knowledge and experiences.

**Promising** - Technologies that are promising and have clear potential to add value to our work. They're worth to invest some time and effort to research and prototype to see if it has an impact. These technologies have higher risks, they are often brand new and highly unproven in our organisation.

**Phased out** - Technologies not recommended to be used for new projects. Technologies that we think are not (yet) worth to (further) invest in. These technologies should not be used for new projects, but usually can be continued for existing projects.

## Features

- Technical Radar with technologies in 4 categories and 4 adoption levels
- Search to filter out elements on the radar
- Filtering by adoption levels and teams who use specific technologies/tools
- Details view with logo, description, alternatives and links
- Mobile support

## Data source

Apptension Tech Radar uses Contentful CMS for data storage and will not work locally right from the start as required keys are not provided in the source code.

To connect your own Contentful space see `.env.example` file for required keys and `src/shared/hooks/useContentfulData.ts` along with `src/shared/services/api/contentful.ts` to see how we pull Contentful data currently.

Or connect your own preferable CMS or other data source.

For reference of data models used in the tech radar see types defined in `src/shared/components/radar/radar.types.ts`.

You can also import the data models into your own Contentful space with `contentful-cli` (see export file `contentful-export-2022-04-18.json`).

## Backend

**These steps are not required to run Tech radar itself properly**

Repository also comes with backend service in form of Firebase functions. In order to start using it please introduce yourself with the official Firebase Functions documentation:
![Setting up Firebase Functions](https://firebase.google.com/docs/functions/get-started?hl=pl)

Then:

Go to the Firebase functions directory:

```Shell
cd functions/
```

Install dependencies with npm:

```Shell
yarn install
```

Run functions in emulator environment:

```Shell
npm run serve
```

In order for Firebase Functions to work properly you will also need to:

- Update Firebase config in `src/shared/services/firebase.ts` with your own application config.

- Environment variables for Airtable API key in `functions/src/services/airtable.ts` and CORS handler in `functions/src/utils/corsHandler.ts` are coming from Firebase config.
  Please take a look at `.runtimeconfig.example.json` to see the required structure for it and upload them to your Firebase account following these instructions: [Setting Firebase config](https://firebase.google.com/docs/functions/config-env?hl=pl#environment_configuration)

## Usage

### Node version

`>= 15.0.1`

`.nvmrc` file is added

### Run development environment

Install dependencies with yarn (or npm):

```Shell
yarn install
```

Run development server:

```Shell
yarn start
```

Open [http://localhost:3000](http://localhost:300) to view it in the browser.

The page will reload if you make edits.  
You will also see any lint errors in the console.

### Tag Version in the Title

The tag version in the title is taken from **package.json** file.

`"version": "2.0" => Tech Radar 2.0`

### Other available scripts

#### `yarn test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `yarn build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point, you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However, we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

#### `yarn extract-intl language1, language2, [...]`

Automatically generates `.json` files with messages gathered from the application.

#### `yarn lint`

Lints your JavaScript.

#### `yarn plop`

Generate Redux module (reducer, saga, selectors, action types, action creators, tests):

```Shell
yarn plop module
```

Generate Redux container and its react component in the specified path:

```Shell
yarn plop container
```

Generate React component (class or function) in the specified path

```Shell
yarn plop component
```

## Licence

© 2022 Apptension Sp. z o.o.

Built and maintained by Apptension.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NON-INFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
