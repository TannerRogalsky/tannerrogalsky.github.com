import fs from 'fs';

const postName = process.argv[2];
if (postName === undefined) {
  throw new Error('Must pass a post name via CLI.');
}

const leftPad = function leftPad(s) {
  const str = `0${s}`;
  return str.substring(str.length - 2, str.length);
};

const blogDataDir = 'src/data/blog/';
const date = new Date();
const formattedDate = `${date.getFullYear()}-${leftPad(date.getMonth())}-${leftPad(date.getDate())}`;
const blogFileName = `${formattedDate}-${postName.toLowerCase().replace(/ /g, '-')}`;

fs.writeFileSync(`${blogDataDir}/${blogFileName}.js`, `
import reactifyMarkdown from '../../utils/reactify_markdown';
import markdown from './markdown/${blogFileName}.markdown';

export default {
  title: '${postName}',
  date: '${date.toISOString()}',
  comments: true,
  categories: [],
  content: reactifyMarkdown(markdown),
};
`);

fs.writeFileSync(`${blogDataDir}/markdown/${blogFileName}.markdown`, '');
