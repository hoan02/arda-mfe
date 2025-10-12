const baseConfig = require("@workspace/eslint-config/base");

module.exports = {
  ...baseConfig,
  parserOptions: {
    ...baseConfig.parserOptions,
    project: "./tsconfig.json",
  },
};
