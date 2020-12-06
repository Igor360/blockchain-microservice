const router = require('express').Router();

/**
 * Register contract routes
 */
router.use('/contract', require('./contract.api'));
router.use('/transactions', require('./transactions.api'));
router.use('/wallet', require('./wallet.api'));

module.exports = router;