import routes from './routes';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

// Exported static site renderer:
module.exports = function render(locals, callback) {
  const Route = routes[locals.path].default;
  callback(null, '<!DOCTYPE html>' + renderToStaticMarkup(<Route {...locals} />));
};
