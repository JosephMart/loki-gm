/**
 * A configuration object for which conditions a Handler should be activated.
 */
type HandlerConfig = {
  regexp: Readonly<RegExp>;
  ignoreBots?: Readonly<boolean>;
};

export default HandlerConfig;
