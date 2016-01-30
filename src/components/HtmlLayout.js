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
            <title>Site Title</title>
            <link href='/styles.css' rel='stylesheet' />
          </head>
          <body>
            <div>
              <ComposedComponent {...this.props}/>
            </div>
          </body>
        </html>
      );
    }
  };
}
