import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Analytics from '@segment/analytics.js-core/lib/analytics'
import SegmentIntegration from '@segment/analytics.js-integration-segmentio'

import Segment from './Segment';

class App extends Component {
  async componentDidMount() {
    // https://app.segment.com/segment-libraries/sources/multa_yellow/overview
    const analytics = await Segment('oOnSg3MIRzXGwR9eAQIbqq9gOQFii1cu')
    analytics.track('Hello World')

    // https://app.segment.com/segment-libraries/sources/multa_green/overview
    var greenAnalytics = new Analytics()
    greenAnalytics.use(SegmentIntegration)
    greenAnalytics.initialize({
      'Segment.io': {
        apiKey: 'qvEH9ExOPEVETSa8uaGWgLIrxaMO6H3t',
        retryQueue: false,
      }
    })
    greenAnalytics.track('Hello Green')

    // https://app.segment.com/segment-libraries/sources/multa_blue/overview
    var blueAnalytics = new Analytics()
    blueAnalytics.use(SegmentIntegration)
    blueAnalytics.initialize({
      'Segment.io': {
        apiKey: '41MfkgYcD76pDMi1N2BqTBnSsgeLtKSO',
        retryQueue: false,
      }
    })
    blueAnalytics.track('Hello Blue')

    // The default analytics.js instance, injected via a script tag on the window.
    var redAnalytics = window.analytics
    redAnalytics.track('Hello Red')

    // Send page calls to all instances.
    blueAnalytics.page()
    greenAnalytics.page()
    redAnalytics.page()
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
