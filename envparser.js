const dotenv = require('dotenv');

const parsedEnv = dotenv.config().parsed;

console.log(parsedEnv);

module.exports = function envparser() {
  return Object.assign(
    ...Object.keys(parsedEnv).map((key) => {
      if (typeof parsedEnv[key] !== 'string') {
        parsedEnv[key] = JSON.stringify(parsedEnv[key]);
      }
      return { [key]: parsedEnv[key] };
    }),
  );
};
