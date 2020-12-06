const router = require('express').Router();
const TransactionsController = require('../../http/controllers/transactions.controller');

router.post('/send/TRX', TransactionsController('sendTrx') /* #swagger.tags = ['transactions'] */);
router.post('/sendFrom/TRX', TransactionsController('sendTrxFrom') /* #swagger.tags = ['transactions'] */);
router.get('/:hash/info', TransactionsController('transaction') /* #swagger.tags = ['transactions'] */);
router.get('/for/:address', TransactionsController('transactions') /* #swagger.tags = ['transactions'] */);
router.get('/for/:address/TRC20', TransactionsController('transactionsTRC20') /* #swagger.tags = ['transactions'] */);

module.exports = router;