"use strict"

const {makeInvoker} = require('awilix-express');
const ResponseCodes = require('../../routes/helpers/responseCodes');

const TransactionsController = ({tronWebService, tronAPIService}) => ({
    sendTrx: async (req, res, next) => {
        let from = req.body.from;
        let to = req.body.to;
        let amount = req.body.amount;
        let txHash = await tronWebService.sendTrx(from, to, amount);
        res.status(ResponseCodes.Ok).json({txHash});
    },
    sendTrxFrom: async (req, res, next) => {
        let from = req.body.from;
        let to = req.body.to;
        let amount = req.body.amount;
        let privateKey = req.body.privateKey;
        let txHash = await tronWebService.sendTrxFrom(from, to, amount, privateKey);
        res.status(ResponseCodes.Ok).json({txHash});
    },
    transaction: async (req, res, next) => {
        let hash = req.params.hash;
        let transaction = await tronWebService.getTx(hash);
        res.status(ResponseCodes.Ok).json({transaction});
    },
    transactions: async (req, res, next) => {
        let address = req.params.address;
        let transactions = await tronAPIService.getTxByAddress(address);
        res.status(ResponseCodes.Ok).json({transactions});
    },
    transactionsTRC20: async (req, res, next) => {
        let address = req.params.address;
        let transactions = await tronAPIService.getTRC20TxByAddress(address);
        res.status(ResponseCodes.Ok).json({transactions});
    }
});

module.exports = makeInvoker(TransactionsController);