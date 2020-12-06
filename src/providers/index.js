module.exports = (container) => {
    container.register(require('./services.provider')(container));
};