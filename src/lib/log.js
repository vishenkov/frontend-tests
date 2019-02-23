import debug from 'debug';

export default (entity) => {
  const debugLevel = `app:${entity}`;
  return debug(debugLevel);
};
