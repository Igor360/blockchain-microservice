import {asValue, asClass, asFunction} from "awilix";
import Web3Service from "../services/web3.service";
import ContractService from "../services/contract.service";
import NonceService from "../services/nonce.service";
import WalletService from "../services/wallet.service";
import ApiService from "../services/api.service";
import ContractManagerService from "../services/contractManager.service";

module.exports = (container) => ({
    web3Service: asClass(Web3Service).scoped(),
    contractService: asFunction(() => new ContractService({container})).scoped(),
    contractManagerService: asFunction(() => new ContractManagerService({container})).scoped(),
    nonceService: asClass(NonceService).scoped(),
    walletService: asFunction(() => new WalletService({container})).scoped(),
    apiService: asValue(ApiService)
});