module.exports = {
    address: process.env.WALLET_ADDRESS || '0xaF0bEC0FE0e81aB05D61F1720Fdd7092B617A64c',
    privateKey: process.env.WALLET_PRIVATE || '05d8d504e8f8f833fc0fe934654d457f8ba33d45463d43152569706dcc222780',
    addressRegex: /^0x[a-fA-F0-9]{40}$/, // Ethereum address regex
    memoricPhrase: "raise hire purity glow boil wrap wheel raise error chimney divide inmate"
};