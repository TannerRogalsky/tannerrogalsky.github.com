import reactifyMarkdown from '../../utils/reactify_markdown';
import markdown from './markdown/2011-08-28-wtfjs.markdown';

export default {
  title: 'WTFJS',
  date: '2011-08-28 12:52',
  comments: true,
  categories: [],
  content: reactifyMarkdown(markdown),
};
