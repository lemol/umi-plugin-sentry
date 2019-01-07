import React, { Component } from 'react';
import * as Sentry from '@sentry/browser';

const options = // <% LoadSentryOptions %>
;

const beforeSend = (event, hint) => {
  console.error(hint.originalException || hint.syntheticException);
  return event;
};

Sentry.init({
  dsn: options.dsn,
  ...(
    !options.log ? {} : { beforeSend }
  ),
});

export default class SentryBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error });
    Sentry.withScope(scope => {
      Object.keys(errorInfo).forEach(key => {
        scope.setExtra(key, errorInfo[key]);
      });

      if (options.tags) {
        Object.keys(options.tags).forEach(key => {
          scope.setTag(key, options.tags[key]);
        });
      }

      Sentry.captureException(error);
    });
  }

  render() {
    if (this.state.error) {
      //render fallback UI
      return (
        <a onClick={() => Sentry.showReportDialog()}>Report feedback</a>
      );
    } else {
      //when there's not an error, render children untouched
      return this.props.children;
    }
  }
}
