const {makeInvoker} = require('awilix-express');
const ResponseCodes = require('../../routes/helpers/responseCodes');

/**
 * @class ContractsController
 */
const ContractsController = ({contractManagerService}) => ({

    getTransaction: async (req, res, next) => {
        let tokenId = req.params.tokenId;
        let transaction = await contractManagerService.getTransaction(tokenId);
        res.status(ResponseCodes.Ok).json({transaction});
    },

    getMaterial: async (req, res, next) => {
        let tokenId = req.params.tokenId;
        let material = await contractManagerService.getMaterial(tokenId);
        res.status(ResponseCodes.Ok).json({material});
    },

    getProduct: async (req, res, next) => {
        let tokenId = req.params.tokenId;
        let product = await contractManagerService.getProduct(tokenId);
        res.status(ResponseCodes.Ok).json({product});
    },

    createTransaction: async (req, res, next) => {
        let txHash = await contractManagerService.createTransaction(req.body.txId, req.body.from, req.body.to, req.body.status, req.body.type, req.body.created_for, req.body.created_at, req.body.amount);
        res.status(ResponseCodes.Ok).json({txHash});
    },

    createProduct: async (req, res, next) => {
        let txHash = await contractManagerService.createProduct(req.body.tokenId, req.body.name, req.body.type, req.body.length, req.body.weight, req.body.height);
        res.status(ResponseCodes.Ok).json({txHash});
    },

    createMaterial: async (req, res, next) => {
        let txHash = await contractManagerService.createMaterial(req.body.tokenId, req.body.name, req.body.description, req.body.type, req.body.created_at);
        res.status(ResponseCodes.Ok).json({txHash});
    }
});

module.exports = makeInvoker(ContractsController);