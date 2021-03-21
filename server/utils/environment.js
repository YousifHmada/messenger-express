const isProduction = () => process.env.NODE_ENV === 'production';

const isDevelopment = () => process.env.NODE_ENV === 'development';

const isTest = () => process.env.NODE_ENV === 'test';

module.exports = {
  isProduction,
  isDevelopment,
  isTest,
};
