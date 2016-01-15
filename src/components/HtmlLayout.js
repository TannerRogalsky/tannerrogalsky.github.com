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
            <title>Site Title</title>
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
