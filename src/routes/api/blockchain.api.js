const router = require('express').Router();
const BlockChainController = require('../../http/controllers/blockchain.controller');

router.get('/balanceOf/:address', BlockChainController('getBalance') /* #swagger.tags = ['blockchain'] */);
router.get('/:address', BlockChainController('getAccount') /* #swagger.tags = ['blockchain'] */);
router.get('/blockBy/:hash', BlockChainController('getBlockByHash') /* #swagger.tags = ['blockchain'] */);
router.get('/tokenBy/:tokenId', BlockChainController('getTokenById') /* #swagger.tags = ['blockchain'] */);

module.exports = router;