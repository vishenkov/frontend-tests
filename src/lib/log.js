import debug from 'debug';

export default (entity) => {
  const debugLevel = `app:${entity}`;
  localStorage.debug = debugLevel;
  return debug(debugLevel);
};
