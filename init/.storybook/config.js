import { configure } from '@kadira/storybook';

const req = require.context('../demo', true, /.*.js/);

function loadStories() {
  req.keys().forEach(req);
}

configure(loadStories, module);
