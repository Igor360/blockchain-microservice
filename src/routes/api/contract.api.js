const router = require('express').Router();
const ContractsController = require('../../http/controllers/contracts.controller');

router.get('/get/material/:tokenId', ContractsController('getMaterial') /* #swagger.tags = ['contract'] */);
router.get('/get/transaction/:tokenId', ContractsController('getTransaction') /* #swagger.tags = ['contract'] */);
router.get('/get/product/:tokenId', ContractsController('getProduct') /* #swagger.tags = ['contract'] */);
router.post('/create/transaction', ContractsController('createTransaction') /* #swagger.tags = ['contract'] */);
router.post('/create/product', ContractsController('createProduct') /* #swagger.tags = ['contract'] */);
router.post('/create/material', ContractsController('createMaterial') /* #swagger.tags = ['contract'] */);

module.exports = router;