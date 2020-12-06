const router = require('express').Router();

const WalletController = require('../../http/controllers/wallet.controller');
const CheckEthereumAddressParam = require('../../http/requests/checkEthereumAddress.request');
const CheckAddressAndAmountParam = require('../../http/requests/checkAddressAndAmountParam.request');

router.get('/balance/:address', CheckEthereumAddressParam.validate, WalletController('checkWalletBalance') /* #swagger.tags = ['wallet'] */);
router.get('/balance/:address/:amount', CheckAddressAndAmountParam.validate, WalletController('checkNeededBalance') /* #swagger.tags = ['wallet'] */);

module.exports = router;
