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
            <style>
              {
                `
                p {
                  font-family: medium-content-serif-font,Georgia,Cambria,Times New Roman,Times,serif;
                  font-weight: 400;
                  font-style: normal;
                }

                .layoutSingleColumn {
                  width: 700px;
                  margin: 0 auto;
                }
                `
              }
            </style>
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
