/**
 * A configuration object for which conditions a Handler should be activated.
 */
type HandlerConfig = {
  regexp: RegExp;
  ignoreBots?: boolean;
};

export default HandlerConfig;
