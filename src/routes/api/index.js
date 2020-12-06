const router = require('express').Router();

/**
 * Register contract routes
 */
router.use('/contract', require('./contract.api'));
router.use('/blockchain', require('./blockchain.api'));
router.use('/transactions', require('./transactions.api'));

module.exports = router;