import routes from '../src/routes.js';
import fs from 'fs';

fs.writeFile('src/routes.json', JSON.stringify(Object.keys(routes), null, 2))
