const dotenv = require('dotenv-defaults');

function setup() {
  /* Sets up the environment variables from your .env file */
  dotenv.config();
}

module.exports = setup;
