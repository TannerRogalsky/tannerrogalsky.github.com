import reactifyMarkdown from '../../utils/reactify_markdown';
import markdown from './markdown/2012-09-19-favourite-lua-libraries.markdown';

export default {
  title: "My Favourite Lua Libraries",
  date: '2012-09-19 14:06',
  comments: true,
  categories: [],
  content: reactifyMarkdown(markdown)
}
