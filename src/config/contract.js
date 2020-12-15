module.exports = {
    ownerAddress: process.env.OWNER_ADDRESS || '0xaF0bEC0FE0e81aB05D61F1720Fdd7092B617A64c',
    address: process.env.CONTRACT_ADDRESS || '0x8d03a219084Fd866cE7ed552A6ff804fCbFaB56C',
    abi: require('./ethereum/contract.abi.json') || null,
};