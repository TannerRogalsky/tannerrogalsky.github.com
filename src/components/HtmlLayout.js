import React from 'react';

export default function HtmlLayout(ComposedComponent) {
  return class Comp extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      return (
        <html>
          <head>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Tanner Rogalsky</title>
            <link href="/styles.css" rel="stylesheet" />
          </head>
          <body>
            <ComposedComponent {...this.props}/>
          </body>
        </html>
      );
    }
  };
}
