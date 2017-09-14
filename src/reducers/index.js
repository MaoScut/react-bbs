import { combineReducers } from 'redux';
import articles from './articles';
import privateArticles from './privateArticles';
import auth from './auth';
import error from './error';
import pop from './pop';
import edit from './edit';
import article from './article';

const root = combineReducers({
  articles,
  privateArticles,
  auth,
  error,
  pop,
  edit,
  article,
});
export default root;
