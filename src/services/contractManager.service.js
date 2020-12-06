import ContractService from "./contract.service";

/**
 * @class ContractManagerService
 * @description Service for call functions from Manger.sol contract
 */
class ContractManagerService extends ContractService {

    async createTransaction(txId, from, to, status, _type, created_for, created_at, amount) {
        let data = this.contract.methods.createTransaction(txId, from, to, status, _type, created_for, created_at, amount).encodeABI();
        return await this.generateRawTxAndBroadcast(data);
    }

    async getTransaction(txId) {
        return await this.contract.methods.getTransaction(txId).call();
    }

    async createProduct(tokenId, name, _type, length, weight, height) {
        let data = this.contract.methods.createProduct(tokenId, name, _type, length, weight, height).encodeABI();
        return await this.generateRawTxAndBroadcast(data);
    }

    async getProduct(tokenId) {
        return await this.contract.methods.getProduct(tokenId).call();
    }

    async createMaterial(tokenId, name, description, _type, created_at) {
        let data = this.contract.methods.createMaterial(tokenId, name, description, _type, created_at).encodeABI();
        return await this.generateRawTxAndBroadcast(data);
    }

    async getMaterial(tokenId) {
        return await this.contract.methods.getMaterial(tokenId).call();
    }

}

export default ContractManagerService;