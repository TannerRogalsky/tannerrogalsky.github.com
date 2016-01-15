import React from 'react';

const reactifyMarkdown = function reactifyMarkdown(markdown) {
  return <div dangerouslySetInnerHTML={{ __html: markdown }} />;
};

export default reactifyMarkdown;
