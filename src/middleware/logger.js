const logger = store => next => (action) => {
  console.log('dispatching', action);
  const result = next(action);
  console.log('nextState', store.getState());
  // return result;
};
export default logger;

