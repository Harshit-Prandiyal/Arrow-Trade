const coins =[
    {
        "id": "bitcoin",
        "symbol": "btc",
        "name": "Bitcoin",
        "image": "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579",
        "current_price": 29266.45,
        "price_change_percentage_24h": -0.05647
    },
    {
        "id": "ethereum",
        "symbol": "eth",
        "name": "Ethereum",
        "image": "https://assets.coingecko.com/coins/images/279/large/ethereum.png?1595348880",
        "current_price": 1874.41,
        "price_change_percentage_24h": 0.1432
    },
    {
        "id": "tether",
        "symbol": "usdt",
        "name": "Tether",
        "image": "https://assets.coingecko.com/coins/images/325/large/Tether.png?1668148663",
        "current_price": 1,
        "price_change_percentage_24h": 0.04107
    },
    {
        "id": "ripple",
        "symbol": "xrp",
        "name": "XRP",
        "image": "https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png?1605778731",
        "current_price": 0.72,
        "price_change_percentage_24h": 1.30334
    },
    {
        "id": "binancecoin",
        "symbol": "bnb",
        "name": "BNB",
        "image": "https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png?1644979850",
        "current_price": 242.32,
        "price_change_percentage_24h": 0.30525
    },
    {
        "id": "usd-coin",
        "symbol": "usdc",
        "name": "USD Coin",
        "image": "https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png?1547042389",
        "current_price": 1,
        "price_change_percentage_24h": -0.01245
    },
    {
        "id": "staked-ether",
        "symbol": "steth",
        "name": "Lido Staked Ether",
        "image": "https://assets.coingecko.com/coins/images/13442/large/steth_logo.png?1608607546",
        "current_price": 1874.48,
        "price_change_percentage_24h": 0.21961
    },
    {
        "id": "dogecoin",
        "symbol": "doge",
        "name": "Dogecoin",
        "image": "https://assets.coingecko.com/coins/images/5/large/dogecoin.png?1547792256",
        "current_price": 0.08,
        "price_change_percentage_24h": 2.31499
    },
    {
        "id": "cardano",
        "symbol": "ada",
        "name": "Cardano",
        "image": "https://assets.coingecko.com/coins/images/975/large/cardano.png?1547034860",
        "current_price": 0.31,
        "price_change_percentage_24h": 1.67054
    },
    {
        "id": "solana",
        "symbol": "sol",
        "name": "Solana",
        "image": "https://assets.coingecko.com/coins/images/4128/large/solana.png?1640133422",
        "current_price": 24.92,
        "price_change_percentage_24h": -0.48624
    },
    {
        "id": "tron",
        "symbol": "trx",
        "name": "TRON",
        "image": "https://assets.coingecko.com/coins/images/1094/large/tron-logo.png?1547035066",
        "current_price": 0.08,
        "price_change_percentage_24h": -2.25745
    },
    {
        "id": "litecoin",
        "symbol": "ltc",
        "name": "Litecoin",
        "image": "https://assets.coingecko.com/coins/images/2/large/litecoin.png?1547033580",
        "current_price": 94.45,
        "price_change_percentage_24h": 3.77696
    },
    {
        "id": "matic-network",
        "symbol": "matic",
        "name": "Polygon",
        "image": "https://assets.coingecko.com/coins/images/4713/large/matic-token-icon.png?1624446912",
        "current_price": 0.71,
        "price_change_percentage_24h": -0.06287
    },
    {
        "id": "polkadot",
        "symbol": "dot",
        "name": "Polkadot",
        "image": "https://assets.coingecko.com/coins/images/12171/large/polkadot.png?1639712644",
        "current_price": 5.21,
        "price_change_percentage_24h": -0.46068
    },
    {
        "id": "shiba-inu",
        "symbol": "shib",
        "name": "Shiba Inu",
        "image": "https://assets.coingecko.com/coins/images/11939/large/shiba.png?1622619446",
        "current_price": 0,
        "price_change_percentage_24h": 3.55359
    },
    {
        "id": "uniswap",
        "symbol": "uni",
        "name": "Uniswap",
        "image": "https://assets.coingecko.com/coins/images/12504/large/uni.jpg?1687143398",
        "current_price": 6.41,
        "price_change_percentage_24h": 5.51309
    },
    {
        "id": "wrapped-bitcoin",
        "symbol": "wbtc",
        "name": "Wrapped Bitcoin",
        "image": "https://assets.coingecko.com/coins/images/7598/large/wrapped_bitcoin_wbtc.png?1548822744",
        "current_price": 29317.45,
        "price_change_percentage_24h": 0.00028
    },
    {
        "id": "bitcoin-cash",
        "symbol": "bch",
        "name": "Bitcoin Cash",
        "image": "https://assets.coingecko.com/coins/images/780/large/bitcoin-cash-circle.png?1594689492",
        "current_price": 242.68,
        "price_change_percentage_24h": 1.2316
    },
    {
        "id": "avalanche-2",
        "symbol": "avax",
        "name": "Avalanche",
        "image": "https://assets.coingecko.com/coins/images/12559/large/Avalanche_Circle_RedWhite_Trans.png?1670992574",
        "current_price": 13.25,
        "price_change_percentage_24h": 0.232
    },
    {
        "id": "stellar",
        "symbol": "xlm",
        "name": "Stellar",
        "image": "https://assets.coingecko.com/coins/images/100/large/Stellar_symbol_black_RGB.png?1552356157",
        "current_price": 0.16,
        "price_change_percentage_24h": 0.24388
    },
    {
        "id": "chainlink",
        "symbol": "link",
        "name": "Chainlink",
        "image": "https://assets.coingecko.com/coins/images/877/large/chainlink-new-logo.png?1547034700",
        "current_price": 7.74,
        "price_change_percentage_24h": -0.02067
    },
    {
        "id": "dai",
        "symbol": "dai",
        "name": "Dai",
        "image": "https://assets.coingecko.com/coins/images/9956/large/Badge_Dai.png?1687143508",
        "current_price": 1,
        "price_change_percentage_24h": -0.01068
    },
    {
        "id": "the-open-network",
        "symbol": "ton",
        "name": "Toncoin",
        "image": "https://assets.coingecko.com/coins/images/17980/large/ton_symbol.png?1670498136",
        "current_price": 1.19,
        "price_change_percentage_24h": -8.42811
    },
    {
        "id": "leo-token",
        "symbol": "leo",
        "name": "LEO Token",
        "image": "https://assets.coingecko.com/coins/images/8418/large/leo-token.png?1558326215",
        "current_price": 3.99,
        "price_change_percentage_24h": 1.34139
    },
    {
        "id": "binance-usd",
        "symbol": "busd",
        "name": "Binance USD",
        "image": "https://assets.coingecko.com/coins/images/9576/large/BUSD.png?1568947766",
        "current_price": 1,
        "price_change_percentage_24h": 0.06105
    },
    {
        "id": "true-usd",
        "symbol": "tusd",
        "name": "TrueUSD",
        "image": "https://assets.coingecko.com/coins/images/3449/large/tusd.png?1618395665",
        "current_price": 1,
        "price_change_percentage_24h": -0.0075
    },
    {
        "id": "monero",
        "symbol": "xmr",
        "name": "Monero",
        "image": "https://assets.coingecko.com/coins/images/69/large/monero_logo.png?1547033729",
        "current_price": 162.21,
        "price_change_percentage_24h": -0.4983
    },
    {
        "id": "cosmos",
        "symbol": "atom",
        "name": "Cosmos Hub",
        "image": "https://assets.coingecko.com/coins/images/1481/large/cosmos_hub.png?1555657960",
        "current_price": 9.02,
        "price_change_percentage_24h": 0.22705
    },
    {
        "id": "ethereum-classic",
        "symbol": "etc",
        "name": "Ethereum Classic",
        "image": "https://assets.coingecko.com/coins/images/453/large/ethereum-classic-logo.png?1547034169",
        "current_price": 18.45,
        "price_change_percentage_24h": 0.08239
    },
    {
        "id": "okb",
        "symbol": "okb",
        "name": "OKB",
        "image": "https://assets.coingecko.com/coins/images/4463/large/WeChat_Image_20220118095654.png?1642471050",
        "current_price": 42.74,
        "price_change_percentage_24h": 0.10194
    },
    {
        "id": "filecoin",
        "symbol": "fil",
        "name": "Filecoin",
        "image": "https://assets.coingecko.com/coins/images/12817/large/filecoin.png?1602753933",
        "current_price": 4.4,
        "price_change_percentage_24h": 0.14849
    },
    {
        "id": "internet-computer",
        "symbol": "icp",
        "name": "Internet Computer",
        "image": "https://assets.coingecko.com/coins/images/14495/large/Internet_Computer_logo.png?1620703073",
        "current_price": 4.3,
        "price_change_percentage_24h": 0.11593
    },
    {
        "id": "hedera-hashgraph",
        "symbol": "hbar",
        "name": "Hedera",
        "image": "https://assets.coingecko.com/coins/images/3688/large/hbar.png?1637045634",
        "current_price": 0.05,
        "price_change_percentage_24h": -0.33062
    },
    {
        "id": "lido-dao",
        "symbol": "ldo",
        "name": "Lido DAO",
        "image": "https://assets.coingecko.com/coins/images/13573/large/Lido_DAO.png?1609873644",
        "current_price": 1.93,
        "price_change_percentage_24h": -0.78876
    },
    {
        "id": "mantle",
        "symbol": "mnt",
        "name": "Mantle",
        "image": "https://assets.coingecko.com/coins/images/30980/large/token-logo.png?1689320029",
        "current_price": 0.52,
        "price_change_percentage_24h": 0.59052
    },
    {
        "id": "quant-network",
        "symbol": "qnt",
        "name": "Quant",
        "image": "https://assets.coingecko.com/coins/images/3370/large/5ZOu7brX_400x400.jpg?1612437252",
        "current_price": 112.61,
        "price_change_percentage_24h": 3.80708
    },
    {
        "id": "crypto-com-chain",
        "symbol": "cro",
        "name": "Cronos",
        "image": "https://assets.coingecko.com/coins/images/7310/large/cro_token_logo.png?1669699773",
        "current_price": 0.06,
        "price_change_percentage_24h": 0.28388
    },
    {
        "id": "aptos",
        "symbol": "apt",
        "name": "Aptos",
        "image": "https://assets.coingecko.com/coins/images/26455/large/aptos_round.png?1666839629",
        "current_price": 7.08,
        "price_change_percentage_24h": 0.12625
    },
    {
        "id": "arbitrum",
        "symbol": "arb",
        "name": "Arbitrum",
        "image": "https://assets.coingecko.com/coins/images/16547/large/photo_2023-03-29_21.47.00.jpeg?1680097630",
        "current_price": 1.18,
        "price_change_percentage_24h": -0.06836
    },
    {
        "id": "vechain",
        "symbol": "vet",
        "name": "VeChain",
        "image": "https://assets.coingecko.com/coins/images/1167/large/VET_Token_Icon.png?1680067517",
        "current_price": 0.02,
        "price_change_percentage_24h": -0.15072
    },
    {
        "id": "near",
        "symbol": "near",
        "name": "NEAR Protocol",
        "image": "https://assets.coingecko.com/coins/images/10365/large/near.jpg?1683515160",
        "current_price": 1.41,
        "price_change_percentage_24h": 0.54364
    },
    {
        "id": "maker",
        "symbol": "mkr",
        "name": "Maker",
        "image": "https://assets.coingecko.com/coins/images/1364/large/Mark_Maker.png?1585191826",
        "current_price": 1276.65,
        "price_change_percentage_24h": 3.79059
    },
    {
        "id": "optimism",
        "symbol": "op",
        "name": "Optimism",
        "image": "https://assets.coingecko.com/coins/images/25244/large/Optimism.png?1660904599",
        "current_price": 1.58,
        "price_change_percentage_24h": 5.5044
    },
    {
        "id": "aave",
        "symbol": "aave",
        "name": "Aave",
        "image": "https://assets.coingecko.com/coins/images/12645/large/AAVE.png?1601374110",
        "current_price": 73.93,
        "price_change_percentage_24h": 2.22175
    },
    {
        "id": "the-graph",
        "symbol": "grt",
        "name": "The Graph",
        "image": "https://assets.coingecko.com/coins/images/13397/large/Graph_Token.png?1608145566",
        "current_price": 0.11,
        "price_change_percentage_24h": -0.36334
    },
    {
        "id": "rocket-pool-eth",
        "symbol": "reth",
        "name": "Rocket Pool ETH",
        "image": "https://assets.coingecko.com/coins/images/20764/large/reth.png?1637652366",
        "current_price": 2020.39,
        "price_change_percentage_24h": 0.18714
    },
    {
        "id": "frax",
        "symbol": "frax",
        "name": "Frax",
        "image": "https://assets.coingecko.com/coins/images/13422/large/FRAX_icon.png?1679886922",
        "current_price": 1,
        "price_change_percentage_24h": -0.02281
    },
    {
        "id": "havven",
        "symbol": "snx",
        "name": "Synthetix Network",
        "image": "https://assets.coingecko.com/coins/images/3406/large/SNX.png?1598631139",
        "current_price": 2.8,
        "price_change_percentage_24h": -0.07752
    },
    {
        "id": "algorand",
        "symbol": "algo",
        "name": "Algorand",
        "image": "https://assets.coingecko.com/coins/images/4380/large/download.png?1547039725",
        "current_price": 0.11,
        "price_change_percentage_24h": 0.3194
    },
    {
        "id": "eos",
        "symbol": "eos",
        "name": "EOS",
        "image": "https://assets.coingecko.com/coins/images/738/large/eos-eos-logo.png?1547034481",
        "current_price": 0.75,
        "price_change_percentage_24h": 0.28544
    },
    {
        "id": "elrond-erd-2",
        "symbol": "egld",
        "name": "MultiversX",
        "image": "https://assets.coingecko.com/coins/images/12335/large/egld-token-logo.png?1673490885",
        "current_price": 32.55,
        "price_change_percentage_24h": -0.33393
    },
    {
        "id": "the-sandbox",
        "symbol": "sand",
        "name": "The Sandbox",
        "image": "https://assets.coingecko.com/coins/images/12129/large/sandbox_logo.jpg?1597397942",
        "current_price": 0.43,
        "price_change_percentage_24h": 0.47476
    },
    {
        "id": "blockstack",
        "symbol": "stx",
        "name": "Stacks",
        "image": "https://assets.coingecko.com/coins/images/2069/large/Stacks_logo_full.png?1604112510",
        "current_price": 0.6,
        "price_change_percentage_24h": 0.29334
    },
    {
        "id": "immutable-x",
        "symbol": "imx",
        "name": "ImmutableX",
        "image": "https://assets.coingecko.com/coins/images/17233/large/immutableX-symbol-BLK-RGB.png?1665110648",
        "current_price": 0.76,
        "price_change_percentage_24h": 1.57962
    },
    {
        "id": "axie-infinity",
        "symbol": "axs",
        "name": "Axie Infinity",
        "image": "https://assets.coingecko.com/coins/images/13029/large/axie_infinity_logo.png?1604471082",
        "current_price": 6.19,
        "price_change_percentage_24h": 1.60623
    },
    {
        "id": "theta-token",
        "symbol": "theta",
        "name": "Theta Network",
        "image": "https://assets.coingecko.com/coins/images/2538/large/theta-token-logo.png?1548387191",
        "current_price": 0.8,
        "price_change_percentage_24h": 0.55761
    },
    {
        "id": "whitebit",
        "symbol": "wbt",
        "name": "WhiteBIT Token",
        "image": "https://assets.coingecko.com/coins/images/27045/large/wbt_token.png?1667923752",
        "current_price": 5.51,
        "price_change_percentage_24h": -0.25291
    },
    {
        "id": "tezos",
        "symbol": "xtz",
        "name": "Tezos",
        "image": "https://assets.coingecko.com/coins/images/976/large/Tezos-logo.png?1547034862",
        "current_price": 0.84,
        "price_change_percentage_24h": 0.16631
    },
    {
        "id": "xdce-crowd-sale",
        "symbol": "xdc",
        "name": "XDC Network",
        "image": "https://assets.coingecko.com/coins/images/2912/large/xdc-icon.png?1633700890",
        "current_price": 0.06,
        "price_change_percentage_24h": 2.45819
    },
    {
        "id": "usdd",
        "symbol": "usdd",
        "name": "USDD",
        "image": "https://assets.coingecko.com/coins/images/25380/large/UUSD.jpg?1651823371",
        "current_price": 1,
        "price_change_percentage_24h": 0.04053
    },
    {
        "id": "kaspa",
        "symbol": "kas",
        "name": "Kaspa",
        "image": "https://assets.coingecko.com/coins/images/25751/large/kaspa-icon-exchanges.png?1653891958",
        "current_price": 0.04,
        "price_change_percentage_24h": -0.48003
    },
    {
        "id": "apecoin",
        "symbol": "ape",
        "name": "ApeCoin",
        "image": "https://assets.coingecko.com/coins/images/24383/large/apecoin.jpg?1647476455",
        "current_price": 1.97,
        "price_change_percentage_24h": -0.02417
    },
    {
        "id": "decentraland",
        "symbol": "mana",
        "name": "Decentraland",
        "image": "https://assets.coingecko.com/coins/images/878/large/decentraland-mana.png?1550108745",
        "current_price": 0.39,
        "price_change_percentage_24h": 0.77803
    },
    {
        "id": "fantom",
        "symbol": "ftm",
        "name": "Fantom",
        "image": "https://assets.coingecko.com/coins/images/4001/large/Fantom_round.png?1669652346",
        "current_price": 0.24,
        "price_change_percentage_24h": -0.01945
    },
    {
        "id": "bitcoin-cash-sv",
        "symbol": "bsv",
        "name": "Bitcoin SV",
        "image": "https://assets.coingecko.com/coins/images/6799/large/BSV.png?1558947902",
        "current_price": 35.52,
        "price_change_percentage_24h": 0.11256
    },
    {
        "id": "injective-protocol",
        "symbol": "inj",
        "name": "Injective",
        "image": "https://assets.coingecko.com/coins/images/12882/large/Secondary_Symbol.png?1628233237",
        "current_price": 7.97,
        "price_change_percentage_24h": -0.82287
    },
    {
        "id": "render-token",
        "symbol": "rndr",
        "name": "Render",
        "image": "https://assets.coingecko.com/coins/images/11636/large/rndr.png?1638840934",
        "current_price": 1.79,
        "price_change_percentage_24h": -0.05828
    },
    {
        "id": "bitget-token",
        "symbol": "bgb",
        "name": "Bitget Token",
        "image": "https://assets.coingecko.com/coins/images/11610/large/icon_colour.png?1690515455",
        "current_price": 0.46,
        "price_change_percentage_24h": 0.73546
    },
    {
        "id": "curve-dao-token",
        "symbol": "crv",
        "name": "Curve DAO",
        "image": "https://assets.coingecko.com/coins/images/12124/large/Curve.png?1597369484",
        "current_price": 0.73,
        "price_change_percentage_24h": 0.16287
    },
    {
        "id": "neo",
        "symbol": "neo",
        "name": "NEO",
        "image": "https://assets.coingecko.com/coins/images/480/large/NEO_512_512.png?1594357361",
        "current_price": 8.8,
        "price_change_percentage_24h": 0.89042
    },
    {
        "id": "flow",
        "symbol": "flow",
        "name": "Flow",
        "image": "https://assets.coingecko.com/coins/images/13446/large/5f6294c0c7a8cda55cb1c936_Flow_Wordmark.png?1631696776",
        "current_price": 0.59,
        "price_change_percentage_24h": 0.59138
    },
    {
        "id": "gala",
        "symbol": "gala",
        "name": "GALA",
        "image": "https://assets.coingecko.com/coins/images/12493/large/GALA-COINGECKO.png?1600233435",
        "current_price": 0.02,
        "price_change_percentage_24h": 0.24151
    },
    {
        "id": "kava",
        "symbol": "kava",
        "name": "Kava",
        "image": "https://assets.coingecko.com/coins/images/9761/large/kava.png?1663638871",
        "current_price": 0.88,
        "price_change_percentage_24h": 0.96605
    },
    {
        "id": "ecash",
        "symbol": "xec",
        "name": "eCash",
        "image": "https://assets.coingecko.com/coins/images/16646/large/Logo_final-22.png?1628239446",
        "current_price": 0,
        "price_change_percentage_24h": -0.39772
    },
    {
        "id": "gatechain-token",
        "symbol": "gt",
        "name": "Gate",
        "image": "https://assets.coingecko.com/coins/images/8183/large/gate.png?1687143308",
        "current_price": 4.18,
        "price_change_percentage_24h": -0.65025
    },
    {
        "id": "rocket-pool",
        "symbol": "rpl",
        "name": "Rocket Pool",
        "image": "https://assets.coingecko.com/coins/images/2090/large/rocket_pool_%28RPL%29.png?1637662441",
        "current_price": 29.6,
        "price_change_percentage_24h": 1.16397
    },
    {
        "id": "radix",
        "symbol": "xrd",
        "name": "Radix",
        "image": "https://assets.coingecko.com/coins/images/4374/large/Radix.png?1629701658",
        "current_price": 0.06,
        "price_change_percentage_24h": -0.38705
    },
    {
        "id": "kucoin-shares",
        "symbol": "kcs",
        "name": "KuCoin",
        "image": "https://assets.coingecko.com/coins/images/1047/large/sa9z79.png?1610678720",
        "current_price": 5.86,
        "price_change_percentage_24h": -0.47344
    },
    {
        "id": "pepe",
        "symbol": "pepe",
        "name": "Pepe",
        "image": "https://assets.coingecko.com/coins/images/29850/large/pepe-token.jpeg?1682922725",
        "current_price": 0,
        "price_change_percentage_24h": -0.9167
    },
    {
        "id": "paxos-standard",
        "symbol": "usdp",
        "name": "Pax Dollar",
        "image": "https://assets.coingecko.com/coins/images/6013/large/Pax_Dollar.png?1629877204",
        "current_price": 1,
        "price_change_percentage_24h": 0.10976
    },
    {
        "id": "chiliz",
        "symbol": "chz",
        "name": "Chiliz",
        "image": "https://assets.coingecko.com/coins/images/8834/large/CHZ_Token_updated.png?1675848257",
        "current_price": 0.08,
        "price_change_percentage_24h": 0.64807
    },
    {
        "id": "klay-token",
        "symbol": "klay",
        "name": "Klaytn",
        "image": "https://assets.coingecko.com/coins/images/9672/large/klaytn.png?1660288824",
        "current_price": 0.16,
        "price_change_percentage_24h": 0.7905
    },
    {
        "id": "gmx",
        "symbol": "gmx",
        "name": "GMX",
        "image": "https://assets.coingecko.com/coins/images/18323/large/arbit.png?1631532468",
        "current_price": 55.88,
        "price_change_percentage_24h": -1.60401
    },
    {
        "id": "compound-governance-token",
        "symbol": "comp",
        "name": "Compound",
        "image": "https://assets.coingecko.com/coins/images/10775/large/COMP.png?1592625425",
        "current_price": 72.22,
        "price_change_percentage_24h": 0.38511
    },
    {
        "id": "iota",
        "symbol": "miota",
        "name": "IOTA",
        "image": "https://assets.coingecko.com/coins/images/692/large/IOTA_Swirl.png?1604238557",
        "current_price": 0.18,
        "price_change_percentage_24h": 0.6342
    },
    {
        "id": "pax-gold",
        "symbol": "paxg",
        "name": "PAX Gold",
        "image": "https://assets.coingecko.com/coins/images/9519/large/paxgold.png?1687143101",
        "current_price": 1947.8,
        "price_change_percentage_24h": -0.03816
    },
    {
        "id": "tether-gold",
        "symbol": "xaut",
        "name": "Tether Gold",
        "image": "https://assets.coingecko.com/coins/images/10481/large/Tether_Gold.png?1668148656",
        "current_price": 1958.77,
        "price_change_percentage_24h": -0.06084
    },
    {
        "id": "terra-luna",
        "symbol": "lunc",
        "name": "Terra Luna Classic",
        "image": "https://assets.coingecko.com/coins/images/8284/large/01_LunaClassic_color.png?1653547790",
        "current_price": 0,
        "price_change_percentage_24h": 0.0831
    },
    {
        "id": "compound-ether",
        "symbol": "ceth",
        "name": "cETH",
        "image": "https://assets.coingecko.com/coins/images/10643/large/ceth.png?1687143191",
        "current_price": 37.63,
        "price_change_percentage_24h": 0.09119
    },
    {
        "id": "frax-share",
        "symbol": "fxs",
        "name": "Frax Share",
        "image": "https://assets.coingecko.com/coins/images/13423/large/Frax_Shares_icon.png?1679886947",
        "current_price": 6.42,
        "price_change_percentage_24h": -1.48602
    },
    {
        "id": "tokenize-xchange",
        "symbol": "tkx",
        "name": "Tokenize Xchange",
        "image": "https://assets.coingecko.com/coins/images/4984/large/TKX_-_Logo_-_RGB-15.png?1672912391",
        "current_price": 5.8,
        "price_change_percentage_24h": -4.34395
    },
    {
        "id": "frax-ether",
        "symbol": "frxeth",
        "name": "Frax Ether",
        "image": "https://assets.coingecko.com/coins/images/28284/large/frxETH_icon.png?1679886981",
        "current_price": 1874.85,
        "price_change_percentage_24h": 0.27465
    },
    {
        "id": "flex-coin",
        "symbol": "flex",
        "name": "FLEX Coin",
        "image": "https://assets.coingecko.com/coins/images/9108/large/coinflex_logo.png?1628750583",
        "current_price": 4.62,
        "price_change_percentage_24h": 5.51103
    },
    {
        "id": "bittorrent",
        "symbol": "btt",
        "name": "BitTorrent",
        "image": "https://assets.coingecko.com/coins/images/22457/large/btt_logo.png?1643857231",
        "current_price": 0,
        "price_change_percentage_24h": 0.15501
    },
    {
        "id": "casper-network",
        "symbol": "cspr",
        "name": "Casper Network",
        "image": "https://assets.coingecko.com/coins/images/15279/large/casper.PNG?1620341020",
        "current_price": 0.04,
        "price_change_percentage_24h": -1.87058
    },
    {
        "id": "huobi-token",
        "symbol": "ht",
        "name": "Huobi",
        "image": "https://assets.coingecko.com/coins/images/2822/large/huobi-token-logo.png?1547036992",
        "current_price": 2.71,
        "price_change_percentage_24h": 0.5082
    },
    {
        "id": "mina-protocol",
        "symbol": "mina",
        "name": "Mina Protocol",
        "image": "https://assets.coingecko.com/coins/images/15628/large/JM4_vQ34_400x400.png?1621394004",
        "current_price": 0.45,
        "price_change_percentage_24h": 0.30986
    },
    {
        "id": "sui",
        "symbol": "sui",
        "name": "Sui",
        "image": "https://assets.coingecko.com/coins/images/26375/large/sui_asset.jpeg?1683114182",
        "current_price": 0.63,
        "price_change_percentage_24h": 0.49834
    },
    {
        "id": "trust-wallet-token",
        "symbol": "twt",
        "name": "Trust Wallet",
        "image": "https://assets.coingecko.com/coins/images/11085/large/Trust.png?1588062702",
        "current_price": 0.91,
        "price_change_percentage_24h": 2.43824
    },
    {
        "id": "conflux-token",
        "symbol": "cfx",
        "name": "Conflux",
        "image": "https://assets.coingecko.com/coins/images/13079/large/3vuYMbjN.png?1631512305",
        "current_price": 0.18,
        "price_change_percentage_24h": 2.34681
    }
];

module.exports={coins };