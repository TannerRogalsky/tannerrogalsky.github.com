import routes from './routes';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

// Exported static site renderer:
module.exports = function render(locals, callback) {
  const route = routes[locals.path]();
  const Element = route.element;
  const props = route.props;
  callback(null, `<!DOCTYPE html>${renderToStaticMarkup(<Element {...locals} {...props} />)}`);
};
