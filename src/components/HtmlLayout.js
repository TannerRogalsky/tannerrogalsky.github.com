import React from 'react';
import googleAnalytics from 'raw!../client/googleAnalytics.js';

export default function HtmlLayout(ComposedComponent) {
  return class Comp extends React.Component {
    render() {
      return (
        <html>
          <head>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Tanner Rogalsky</title>
            <link href="/styles.css" rel="stylesheet" />
            <script dangerouslySetInnerHTML={{ __html: googleAnalytics }} />
          </head>
          <body>
            <ComposedComponent {...this.props} />
          </body>
        </html>
      );
    }
  };
}
