# ajs-multiple-writekeys-demo

This demonstrates how to send data to multiple Segment sources via `analytics.js`.

The primary `analytics.js` (referred to as the "red" analytics.js in examples) uses the CDN hosted version. Since this relies heavily on global state, there can be only one instance of this. This is installed by following the normal `analytics.js` installation [docs outlined here](https://segment.com/docs/sources/website/analytics.js/quickstart/). The code for this is in [`public/index.html`](public/index.html).

The secondary `analytics.js` instances (referred to as green, yellow and blue in examples) are configured via the open source version of `analytics.js` in the [`src/App.js`](src/App.js). However, using the open source version of `analytics.js` requires configuring a lot of settings (jump [here](#configuration-options) for reference). While these are documented below, they can be cumbersome to work with. The yellow `analytics.js` serves an example of how to dynamically initialize with settings from the Segment API where possible. See [`src/Segment.js`](src/Segment.js) for details.

## Structure

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). Jump [here](#create-react-app-notes) for reference.

Here are some specific files that are helpful for this example:
* [src/App.js](src/App.js): Initializes multiple `analytics.js` for different write keys.
* [src/Segment.js](src/Segment.js): Dynamically configures `analytics.js` with Segment hosted settings where possible.
* [public/index.html](public/index.html): Initializes the default `analytics.js` instance.

### Development

This requires [Node](https://nodejs.org/en/) and [Yarn](https://yarnpkg.com/en/docs/install) to run. Once installed, run `yarn` to install dependencies, and `yarn start` to run the example.

## Configuration Options

Here's an example of using the open source version to send data to the Segment API, with most of the possible options documented. 

```js
// Import dependencies. These would typically be added via a bundler such as webpack.
import Analytics from '@segment/analytics.js-core/lib/analytics'
import SegmentIntegration from '@segment/analytics.js-integration-segmentio'

// Create a new analytics instance.
var analytics = new Analytics()

// Link all the device mode integrations that should be used for this analytics instance.
analytics.use(SegmentIntegration)

// Integration specific settings.
var settings = {
    'Segment.io': {
        // The writeKey of the Segment project to send data to. A value MUST be provided to send data to Segment.
        apiKey: 'qvEH9ExOPEVETSa8uaGWgLIrxaMO6H3t',

        // The host of the API to send data to. api.segment.io/v1 by default.
        apiHost: 'api.segment.io/v1',

        // Used by Cross Domain Analytics to see which other domains should be checked for a cross domain identifier.
        // It is an empty array by default, and requires additional setup on the Segment side.
        crossDomainIdServers: [],
        // Enable to delete any locally stored cross domain identifiers and data at runtime. false by default.
        deleteCrossDomainId: false,
        // Enable to store cross domain identifiers in localStorage in addition to cookies. false by default.
        saveCrossDomainIdInLocalStorage: false,

        // Enable to persist events to disk and retry in case of network failures. true by default.
        // This currently relies on global state, so it's recommended that only one instance (the CDN hosted one)
        // enables this at any given time.
        retryQueue: true,

        // These are flags to control whether data should be sent via cloud mode destinations or not.
        // addBundledMetadata is false by default, but always set to true on the CDN hosted version, and will need
        // to be set to true.
        addBundledMetadata: true,
        // The default behaviour in analytics.js is to assume integrations are device-mode. This allows specifying
        // which integrations should run in Cloud Mode.
        // This must be manually updated time you enable an integration in the Segment app.
        // unbundledIntegrations is an empty array by default.
        unbundledIntegrations: [ "Mixpanel" ]
    }
}

// Non-integration specific options.
var options = {
    // Whether to automatically track a page view after initialization or not. False by default.
    // It is generally recommended to disable this, and trigger page calls manually instead.
    initialPageView: false, 
    // Tracking plan settings (powered by Schema, and now Protocols). This is an empty array by default.
    // This can be left empty if not using any client side integrations, as the Segment API will also apply these
    // rules during ingestion.
    plan: {},
    // Allows disabling integrations at runtime for the CDN hosted version of Segment. It is an empty object by default.
    // This functionality can be replicated with the settings object for the open source version of analytics.js. 
    // This is typically meant for use by consent managers to disable integrations for the CDN hosted version.
    integrations: {
        Mixpanel: false,
    },
    // Configures options around telemetry data collected analytics.js, such as integration errors.
    metrics: {
        // The sampling rate of telemetry data as a floating point number.
        // This is 0.1 for the CDN hosted version of analytics.js, which corresponds to a 10% sampling rate.
        // 0 is the default for the open source version of analytics.js.
        sampleRate: 0.1,
        // How often telemetry data should be uploaded. 30 seconds by default.
        flushTimer: 30 * 1000,
        // Maximum number of data points to buffer, before dropping them. 20 by default.
        maxQueueSize:20 ,
        // The host of the server to send telemetry data to. api.segment.io/v1 by default.
        host: 'api.segment.io/v1'
    },
    // Settings that apply to how user state is stored locally.
    user: {
        // By default, user ID and traits are stored in cookies and localStorage.
        // The localStorage portion can be disabled by setting this flag to true.
        localStorageFallbackDisabled: true,
    },
    // Settings that apply to how group state is stored locally.
    group: {
        // By default, group ID and traits are stored in cookies and localStorage.
        // The localStorage portion can be disabled by setting this flag to true.
        localStorageFallbackDisabled: true
    }
}

analytics.initialize(settings, options)

analytics.track('Hello Green')
```

# create-react-app notes

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
