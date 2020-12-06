module.exports = {
    address: process.env.WALLET_ADDRESS || '0x',
    privateKey: process.env.WALLET_PRIVATE || '07109d36b34c77d3a1323f7f6d6c0c0c0272d7f0a6aeb6e4cfda54d9cda37ee2',
    addressRegex: /^0x[a-fA-F0-9]{40}$/, // Ethereum address regex
};