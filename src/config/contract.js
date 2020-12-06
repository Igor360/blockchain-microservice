module.exports = {
    ownerAddress: process.env.OWNER_ADDRESS || '0xaF0bEC0FE0e81aB05D61F1720Fdd7092B617A64c',
    address: process.env.CONTRACT_ADDRESS || '0x',
    abi: require('./ethereum/contract.abi.json') || null,
};