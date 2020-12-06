const router = require('express').Router();
const ContractsController = require('../../http/controllers/contracts.controller');

router.get('/:address/info', ContractsController('info') /* #swagger.tags = ['contract'] */);
router.get('/:address/name', ContractsController('contractName') /* #swagger.tags = ['contract'] */);
router.get('/:address/symbol', ContractsController('contractSymbol') /* #swagger.tags = ['contract'] */);
router.get('/:address/decimals', ContractsController('contractDecimals') /* #swagger.tags = ['contract'] */);
router.get('/:address/totalSupply', ContractsController('totalSupplyContract') /* #swagger.tags = ['contract'] */);
router.post('/:contract/transferFrom', ContractsController('transferFrom') /* #swagger.tags = ['contract'] */);
router.post('/:contract/transfer', ContractsController('transfer') /* #swagger.tags = ['contract'] */);
router.post('/:contract/approve', ContractsController('approve') /* #swagger.tags = ['contract'] */);
router.get('/:contract/allowance/:owner/:spender', ContractsController('allowance') /* #swagger.tags = ['contract'] */);
router.get('/:contract/balanceOf/:address', ContractsController('balanceOf') /* #swagger.tags = ['contract'] */);

module.exports = router;