import { combineReducers } from 'redux';
import privateArticles from './privateArticles';
import topics from './topics';
import auth from './auth';
import error from './error';
import editor from './editor';
// import article from './article';
import detail from './detail';

const root = combineReducers({
  // privateArticles,
  auth,
  error,
  editor,
  detail,
  topics,
});
export default root;
