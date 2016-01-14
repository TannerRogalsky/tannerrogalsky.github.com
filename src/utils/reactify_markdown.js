import React from 'react';

const reactifyMarkdown = function(markdown) {
  return <div dangerouslySetInnerHTML={{
    __html: markdown
  }} />;
};

export default reactifyMarkdown;
