module.exports = {
    ownerAddress: process.env.OWNER_ADDRESS || '0x',
    address: process.env.CONTRACT_ADDRESS || '0x',
    abi: require('./ethereum/contract.abi.json') || null,
};