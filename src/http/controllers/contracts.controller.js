"use strict"

const {makeInvoker} = require('awilix-express');
const ResponseCodes = require('../../routes/helpers/responseCodes');

const ContractsController = ({contractService}) => ({
    info: async (req, res, next) => {
        let address = req.params.address;
        let contract = await contractService.contractBaseData(address);
        res.status(ResponseCodes.Ok).json({contract});
    },
    balanceOf: async (req, res, next) => {
        let contractAddress = req.params.contract;
        let address = req.params.address;
        let balance = await contractService.balanceOf(contractAddress, address);
        res.status(ResponseCodes.Ok).json({balance: balance === undefined ? 0 : balance.toNumber()});
    },
    contractName: async (req, res, next) => {
        let address = req.params.address;
        let name = await contractService.nameByAddress(address);
        res.status(ResponseCodes.Ok).json({name});
    },
    contractSymbol: async (req, res, next) => {
        let address = req.params.address;
        let symbol = await contractService.symbolByAddress(address);
        res.status(ResponseCodes.Ok).json({symbol});
    },
    contractDecimals: async (req, res, next) => {
        let address = req.params.address;
        let decimals = await contractService.decimalByAddress(address);
        res.status(ResponseCodes.Ok).json({decimals});
    },
    totalSupplyContract: async (req, res, next) => {
        let address = req.params.address;
        let totalSupply = (await contractService.totalSupplyByAddress(address)).toNumber();
        res.status(ResponseCodes.Ok).json({totalSupply});
    },
    transferFrom: async (req, res, next) => {
        let contract = req.params.contract;
        let fromAddress = req.body.from;
        let toAddress = req.body.to;
        let amount = req.body.amount;
        let txHash = await contractService.transferFrom(contract, fromAddress, toAddress, amount);
        res.status(ResponseCodes.Ok).json({txHash});
    },
    transfer: async (req, res, next) => {
        let contract = req.params.contract;
        let toAddress = req.body.to;
        let amount = req.body.amount;
        let txHash = await contractService.transfer(contract, toAddress, amount);
        res.status(ResponseCodes.Ok).json({txHash});
    },
    approve: async (req, res, next) => {
        let contract = req.params.contract;
        let toAddress = req.body.to;
        let amount = req.body.amount;
        let txHash = await contractService.approve(contract, toAddress, amount);
        res.status(ResponseCodes.Ok).json({txHash});
    },
    allowance: async (req, res, next) => {
        let contract = req.params.contract;
        let ownerAddress = req.params.owner;
        let spenderAddress = req.params.spender;
        let allowance = (await contractService.allowance(contract, ownerAddress, spenderAddress));
        res.status(ResponseCodes.Ok).json({allowance});
    }
});

module.exports = makeInvoker(ContractsController);