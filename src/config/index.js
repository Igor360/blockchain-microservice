module.exports = {
    port: process.env.APP_PORT || '3002',
    name: process.env.APP_NAME || 'TRON_APP',
    host: process.env.APP_HOST || '0.0.0.0',
    debug: process.env.DEBUG || false,
    mode: process.env.NODE_ENV || 'production',
};