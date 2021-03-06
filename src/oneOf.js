const core = require('./core.js');

const _oneOf = core.createType(config => {
  const { required = false, options = [] } = config;

  const def = {
    type: 'oneOf',
    required: core.stringify(required),
    options,
  };

  const construct = value => value;

  const validate = (value, props) => {
    const isRequired = (typeof required === 'function') ? required(props) : required;
    if (isRequired && core.isUndefined(value)) return core.error('propertype-required');
    if (core.isUndefined(value)) return;
    if (!options.includes(value)) return core.error('propertype-oneof-options');
  };

  const output = construct;
  output.construct = construct;
  output.def = def;
  output.validate = validate;

  return output;
});

module.exports = _oneOf;
