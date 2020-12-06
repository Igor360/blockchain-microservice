"use strict"

import contractConfigs from '../config/contract';
import BadRequestException from '../exceptions/BadRequestException';
import BigNumber from "bignumber.js";
import InvalidAddressException from "../exceptions/ethereum/InvalidAddressException";

/**
 * @class ContractService
 */
class ContractService {

    constructor({container}) {
        this.init(container);
    }

    init(container) {
        this.web3 = container.resolve('web3Service');
        this.nonceService = container.resolve('nonceService');
        this.walletService = container.resolve('walletService');
        this.contract = this.web3.contractInstance(contractConfigs.address, contractConfigs.abi);
    }

    // Getters and Setters

    /**
     * Return contract address
     * @returns {*}
     */
    get address() {
        return contractConfigs.address;
    }

    /**
     * Get contract owner address
     * @returns {*}
     */
    get ownerAddress() {
        return this.walletService.ownerAddress;
    }

    /**
     * Return tx count for contract
     * @returns {Promise<number>}
     */
    get transactionsCount() {
        return this.web3.eth.getTransactionCount(contractConfigs.address);
    }

    get nonce() {
        return this.nonceService.getNonceValue;
    }

    // Methods


    async #generateContractRawTx(data) {
        let nonce = await this.checkNonce(this.nonce);
        let rawTxObject = await this.web3.prepareRawTx(nonce, this.ownerAddress, this.address, '0x0', data);
        let singedTx = await this.walletService.singTx(rawTxObject);
        return {singedTx, rawTxObject};
    }

    /**
     * Check DB nonce
     * @param nonce
     * @returns {Promise<void>}
     */
    async checkNonce(nonce) {

        let blockChainNonce = await this.getTxCount();
        if (blockChainNonce) {
            blockChainNonce = Number(blockChainNonce) - 1;
            if (blockChainNonce <= nonce && (Number(blockChainNonce) + 2) >= nonce) {
                nonce = await this.#increaseFileNonce(blockChainNonce);
            }
        }
        return nonce;
    }

    async #increaseFileNonce(newNonce) {
        let nonce = Number(newNonce) + 1;
        this.nonceService.write(nonce);
        return nonce;
    }

    /**
     * Convert value to amount given contract decimals
     * @param amount
     * @returns {Promise<BigNumber>}
     */
    async #convertAmount(amount) {
        let decimals = await this.decimals;
        return new BigNumber(Number(amount) * (10 ** decimals));
    }

    /**
     * Convert big number to string
     * @param number
     * @returns {string}
     */
    #convertBigNumber(number) {
        let amount = new BigNumber(Number(number));
        return amount.toFixed();
    }

    /**
     * Validate amount
     * @param amount
     */
    #checkAmountOnUndefined(amount) {
        if (isNaN(amount) || amount === undefined) {
            throw new BadRequestException("Invalid amount");
        }
    }

    /**
     * Validate address
     * @param address
     */
    #checkIfEthAddress(address) {
        if (!this.web3.isEthereumAddress(address)) {
            throw new InvalidAddressException("Invalid address format");
        }
    }


    async #generateRawTxAndBroadcast(data) {
        let {rawTxObject, singedTx} = await this.#generateContractRawTx(data);
        let res = await this.web3.broadcast(singedTx);
        if (this.web3.isTxHash(res.result)) {
            this.nonceService.increase(); // increase nonce in file
        } else {
            // if (res && res.error) {
            //     this.nonceService.increase(); // increase nonce in file
            // }
            await this.#syncNonce(); // sync nonce with count tx for contract address
        }
        return res;
    }

    /**
     * Increase gasPrice, gasLimit for tx and resend transaction
     * @param rawTxObject
     * @returns {Promise<{rawTxObject: *, response: unknown, singedTx: string}>}
     */
    async resendTransactionAndIncreaseGas(rawTxObject) {
        if (rawTxObject === undefined) {
            return;
        }
        rawTxObject.gasPrice = await this.web3.increaseTxGasPrice(rawTxObject.gasPrice);
        rawTxObject.gasLimit = this.web3.increaseTxGasLimit(rawTxObject.gasLimit);
        let singedTx = await this.walletService.singTx(rawTxObject);
        let response = await this.web3.broadcast(singedTx);
        return {rawTxObject, response, singedTx};
    }

    /**
     * Sync nonce with contract current value
     * @returns {Promise<void>}
     */
    async #syncNonce() {
        let count = await this.getTxCount();
        this.nonceService.write(count);
    }

    /**
     * Return contract tx count
     * @returns {Promise<number>}
     */
    async getTxCount() {
        return await this.web3.transactionCountForAddress(this.ownerAddress);
    }
}

export default ContractService;