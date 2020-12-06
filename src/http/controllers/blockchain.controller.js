"use strict"

const {makeInvoker} = require('awilix-express');
const ResponseCodes = require('../../routes/helpers/responseCodes');

const BlockChainController = ({tronWebService}) => ({
    getBalance: async (req, res, next) => {
        let address = req.params.address;
        let balance = await tronWebService.getBalance(address);
        res.status(ResponseCodes.Ok).json({balance});
    },
    getAccount: async (req, res, next) => {
        let address = req.params.address;
        let account = await tronWebService.getAccount(address);
        res.status(ResponseCodes.Ok).json({account});
    },
    getBlockByHash: async (req, res, next) => {
        let hash = req.params.hash;
        let block = await tronWebService.getBlockByHash(hash);
        res.status(ResponseCodes.Ok).json({block});
    },
    getTokenById: async (req, res, next) => {
        let tokenId = req.params.tokenId;
        let token = await tronWebService.getTokenById(tokenId);
        res.status(ResponseCodes.Ok).json({token});
    },
});

module.exports = makeInvoker(BlockChainController);