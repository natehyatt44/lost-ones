export const contractAddress = '0x5AA2Ff4Ab706307d8B3D90A462c1ddC055655734'

export const contractAbi = [
    {
      "inputs": [
        {
          "internalType": "address[]",
          "name": "payees",
          "type": "address[]"
        },
        {
          "internalType": "uint256[]",
          "name": "shares",
          "type": "uint256[]"
        },
        {
          "internalType": "address[]",
          "name": "addresses",
          "type": "address[]"
        },
        {
          "internalType": "uint256[]",
          "name": "fees",
          "type": "uint256[]"
        },
        {
          "internalType": "uint256",
          "name": "swapAmount",
          "type": "uint256"
        }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
    },
    {
    "anonymous": false,
    "inputs": [
        {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
        },
        {
        "indexed": true,
        "internalType": "address",
        "name": "spender",
        "type": "address"
        },
        {
        "indexed": false,
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
        }
    ],
    "name": "Approval",
    "type": "event"
    },
    {
    "anonymous": false,
    "inputs": [
        {
        "indexed": true,
        "internalType": "address",
        "name": "account",
        "type": "address"
        },
        {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
        },
        {
        "indexed": true,
        "internalType": "uint256",
        "name": "blockTime",
        "type": "uint256"
        }
    ],
    "name": "Cashout",
    "type": "event"
    },
    {
    "anonymous": false,
    "inputs": [
        {
        "indexed": true,
        "internalType": "address",
        "name": "account",
        "type": "address"
        },
        {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
        },
        {
        "indexed": true,
        "internalType": "uint256",
        "name": "blockTime",
        "type": "uint256"
        }
    ],
    "name": "Compound",
    "type": "event"
    },
    {
    "anonymous": false,
    "inputs": [
        {
        "indexed": true,
        "internalType": "contract IERC20",
        "name": "token",
        "type": "address"
        },
        {
        "indexed": false,
        "internalType": "address",
        "name": "to",
        "type": "address"
        },
        {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
        }
    ],
    "name": "ERC20PaymentReleased",
    "type": "event"
    },
    {
    "anonymous": false,
    "inputs": [
        {
        "indexed": true,
        "internalType": "address",
        "name": "newLiquidityWallet",
        "type": "address"
        },
        {
        "indexed": true,
        "internalType": "address",
        "name": "oldLiquidityWallet",
        "type": "address"
        }
    ],
    "name": "LiquidityWalletUpdated",
    "type": "event"
    },
    {
    "anonymous": false,
    "inputs": [
        {
        "indexed": true,
        "internalType": "address",
        "name": "operator",
        "type": "address"
        },
        {
        "indexed": false,
        "internalType": "uint256",
        "name": "previousRate",
        "type": "uint256"
        },
        {
        "indexed": false,
        "internalType": "uint256",
        "name": "newRate",
        "type": "uint256"
        }
    ],
    "name": "MaxTransferAmountRateUpdated",
    "type": "event"
    },
    {
    "anonymous": false,
    "inputs": [
        {
        "indexed": true,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
        },
        {
        "indexed": true,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
        }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
    },
    {
    "anonymous": false,
    "inputs": [
        {
        "indexed": false,
        "internalType": "address",
        "name": "account",
        "type": "address"
        },
        {
        "indexed": false,
        "internalType": "uint256",
        "name": "shares",
        "type": "uint256"
        }
    ],
    "name": "PayeeAdded",
    "type": "event"
    },
    {
    "anonymous": false,
    "inputs": [
        {
        "indexed": false,
        "internalType": "address",
        "name": "from",
        "type": "address"
        },
        {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
        }
    ],
    "name": "PaymentReceived",
    "type": "event"
    },
    {
    "anonymous": false,
    "inputs": [
        {
        "indexed": false,
        "internalType": "address",
        "name": "to",
        "type": "address"
        },
        {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
        }
    ],
    "name": "PaymentReleased",
    "type": "event"
    },
    {
    "anonymous": false,
    "inputs": [
        {
        "indexed": true,
        "internalType": "address",
        "name": "pair",
        "type": "address"
        },
        {
        "indexed": true,
        "internalType": "bool",
        "name": "value",
        "type": "bool"
        }
    ],
    "name": "SetAutomatedMarketMakerPair",
    "type": "event"
    },
    {
    "anonymous": false,
    "inputs": [
        {
        "indexed": false,
        "internalType": "uint256",
        "name": "tokensSwapped",
        "type": "uint256"
        },
        {
        "indexed": false,
        "internalType": "uint256",
        "name": "ethReceived",
        "type": "uint256"
        },
        {
        "indexed": false,
        "internalType": "uint256",
        "name": "tokensIntoLiqudity",
        "type": "uint256"
        }
    ],
    "name": "SwapAndLiquify",
    "type": "event"
    },
    {
    "anonymous": false,
    "inputs": [
        {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
        },
        {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
        },
        {
        "indexed": false,
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
        }
    ],
    "name": "Transfer",
    "type": "event"
    },
    {
    "anonymous": false,
    "inputs": [
        {
        "indexed": true,
        "internalType": "address",
        "name": "newAddress",
        "type": "address"
        },
        {
        "indexed": true,
        "internalType": "address",
        "name": "oldAddress",
        "type": "address"
        }
    ],
    "name": "UpdateJoeRouter",
    "type": "event"
    },
    {
    "anonymous": false,
    "inputs": [
        {
        "indexed": true,
        "internalType": "address",
        "name": "operator",
        "type": "address"
        },
        {
        "indexed": false,
        "internalType": "uint256",
        "name": "previousRate",
        "type": "uint256"
        },
        {
        "indexed": false,
        "internalType": "uint256",
        "name": "newRate",
        "type": "uint256"
        }
    ],
    "name": "maxBalanceAmountRateUpdated",
    "type": "event"
    },
    {
    "inputs": [],
    "name": "BURN_ADDRESS",
    "outputs": [
        {
        "internalType": "address",
        "name": "",
        "type": "address"
        }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
    },
    {
    "inputs": [],
    "name": "OLD_CONTRACT",
    "outputs": [
        {
        "internalType": "contract IERC20",
        "name": "",
        "type": "address"
        }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
    },
    {
    "inputs": [
        {
        "internalType": "address",
        "name": "owner",
        "type": "address"
        },
        {
        "internalType": "address",
        "name": "spender",
        "type": "address"
        }
    ],
    "name": "allowance",
    "outputs": [
        {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
        }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
    },
    {
    "inputs": [],
    "name": "antiBot",
    "outputs": [
        {
        "internalType": "bool",
        "name": "",
        "type": "bool"
        }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
    },
    {
    "inputs": [
        {
        "internalType": "address",
        "name": "spender",
        "type": "address"
        },
        {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
        }
    ],
    "name": "approve",
    "outputs": [
        {
        "internalType": "bool",
        "name": "",
        "type": "bool"
        }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
    },
    {
    "inputs": [
        {
        "internalType": "address",
        "name": "",
        "type": "address"
        }
    ],
    "name": "automatedMarketMakerPairs",
    "outputs": [
        {
        "internalType": "bool",
        "name": "",
        "type": "bool"
        }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
    },
    {
    "inputs": [
        {
        "internalType": "address",
        "name": "account",
        "type": "address"
        }
    ],
    "name": "balanceOf",
    "outputs": [
        {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
        }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
    },
    {
    "inputs": [],
    "name": "blocktopass",
    "outputs": [
        {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
        }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
    },
    {
    "inputs": [],
    "name": "buyTax",
    "outputs": [
        {
        "internalType": "uint16",
        "name": "",
        "type": "uint16"
        }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
    },
    {
    "inputs": [],
    "name": "cashoutFee",
    "outputs": [
        {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
        }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
    },
    {
    "inputs": [],
    "name": "currentBlock",
    "outputs": [
        {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
        }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
    },
    {
    "inputs": [],
    "name": "decimals",
    "outputs": [
        {
        "internalType": "uint8",
        "name": "",
        "type": "uint8"
        }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
    },
    {
    "inputs": [
        {
        "internalType": "address",
        "name": "spender",
        "type": "address"
        },
        {
        "internalType": "uint256",
        "name": "subtractedValue",
        "type": "uint256"
        }
    ],
    "name": "decreaseAllowance",
    "outputs": [
        {
        "internalType": "bool",
        "name": "",
        "type": "bool"
        }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
    },
    {
    "inputs": [
        {
        "internalType": "address",
        "name": "",
        "type": "address"
        }
    ],
    "name": "hasMigrate",
    "outputs": [
        {
        "internalType": "bool",
        "name": "",
        "type": "bool"
        }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
    },
    {
    "inputs": [
        {
        "internalType": "address",
        "name": "spender",
        "type": "address"
        },
        {
        "internalType": "uint256",
        "name": "addedValue",
        "type": "uint256"
        }
    ],
    "name": "increaseAllowance",
    "outputs": [
        {
        "internalType": "bool",
        "name": "",
        "type": "bool"
        }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
    },
    {
    "inputs": [
        {
        "internalType": "address",
        "name": "",
        "type": "address"
        }
    ],
    "name": "isBlacklisted",
    "outputs": [
        {
        "internalType": "bool",
        "name": "",
        "type": "bool"
        }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
    },
    {
    "inputs": [],
    "name": "isTradingEnabled",
    "outputs": [
        {
        "internalType": "bool",
        "name": "",
        "type": "bool"
        }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
    },
    {
    "inputs": [],
    "name": "joePair",
    "outputs": [
        {
        "internalType": "address",
        "name": "",
        "type": "address"
        }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
    },
    {
    "inputs": [],
    "name": "joeRouterAddress",
    "outputs": [
        {
        "internalType": "address",
        "name": "",
        "type": "address"
        }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
    },
    {
    "inputs": [],
    "name": "liquidityPoolFee",
    "outputs": [
        {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
        }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
    },
    {
    "inputs": [],
    "name": "name",
    "outputs": [
        {
        "internalType": "string",
        "name": "",
        "type": "string"
        }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
    },
    {
    "inputs": [],
    "name": "owner",
    "outputs": [
        {
        "internalType": "address",
        "name": "",
        "type": "address"
        }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
    },
    {
    "inputs": [
        {
        "internalType": "uint256",
        "name": "index",
        "type": "uint256"
        }
    ],
    "name": "payee",
    "outputs": [
        {
        "internalType": "address",
        "name": "",
        "type": "address"
        }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
    },
    {
    "inputs": [
        {
        "internalType": "address payable",
        "name": "account",
        "type": "address"
        }
    ],
    "name": "release",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
    },
    {
    "inputs": [
        {
        "internalType": "contract IERC20",
        "name": "token",
        "type": "address"
        },
        {
        "internalType": "address",
        "name": "account",
        "type": "address"
        }
    ],
    "name": "release",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
    },
    {
    "inputs": [
        {
        "internalType": "contract IERC20",
        "name": "token",
        "type": "address"
        },
        {
        "internalType": "address",
        "name": "account",
        "type": "address"
        }
    ],
    "name": "released",
    "outputs": [
        {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
        }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
    },
    {
    "inputs": [
        {
        "internalType": "address",
        "name": "account",
        "type": "address"
        }
    ],
    "name": "released",
    "outputs": [
        {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
        }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
    },
    {
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
    },
    {
    "inputs": [],
    "name": "rewardsFee",
    "outputs": [
        {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
        }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
    },
    {
    "inputs": [],
    "name": "rewardsPool",
    "outputs": [
        {
        "internalType": "address",
        "name": "",
        "type": "address"
        }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
    },
    {
    "inputs": [],
    "name": "sellTax",
    "outputs": [
        {
        "internalType": "uint16",
        "name": "",
        "type": "uint16"
        }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
    },
    {
    "inputs": [
        {
        "internalType": "address",
        "name": "account",
        "type": "address"
        }
    ],
    "name": "shares",
    "outputs": [
        {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
        }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
    },
    {
    "inputs": [],
    "name": "swapLiquifyEnabled",
    "outputs": [
        {
        "internalType": "bool",
        "name": "",
        "type": "bool"
        }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
    },
    {
    "inputs": [],
    "name": "swapTokensAmount",
    "outputs": [
        {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
        }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
    },
    {
    "inputs": [],
    "name": "symbol",
    "outputs": [
        {
        "internalType": "string",
        "name": "",
        "type": "string"
        }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
    },
    {
    "inputs": [],
    "name": "teamPool",
    "outputs": [
        {
        "internalType": "address",
        "name": "",
        "type": "address"
        }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
    },
    {
    "inputs": [],
    "name": "teamPoolFee",
    "outputs": [
        {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
        }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
    },
    {
    "inputs": [],
    "name": "totalClaimed",
    "outputs": [
        {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
        }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
    },
    {
    "inputs": [],
    "name": "totalFees",
    "outputs": [
        {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
        }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
    },
    {
    "inputs": [
        {
        "internalType": "contract IERC20",
        "name": "token",
        "type": "address"
        }
    ],
    "name": "totalReleased",
    "outputs": [
        {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
        }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
    },
    {
    "inputs": [],
    "name": "totalReleased",
    "outputs": [
        {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
        }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
    },
    {
    "inputs": [],
    "name": "totalShares",
    "outputs": [
        {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
        }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
    },
    {
    "inputs": [],
    "name": "totalSupply",
    "outputs": [
        {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
        }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
    },
    {
    "inputs": [
        {
        "internalType": "address",
        "name": "recipient",
        "type": "address"
        },
        {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
        }
    ],
    "name": "transfer",
    "outputs": [
        {
        "internalType": "bool",
        "name": "",
        "type": "bool"
        }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
    },
    {
    "inputs": [
        {
        "internalType": "address",
        "name": "sender",
        "type": "address"
        },
        {
        "internalType": "address",
        "name": "recipient",
        "type": "address"
        },
        {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
        }
    ],
    "name": "transferFrom",
    "outputs": [
        {
        "internalType": "bool",
        "name": "",
        "type": "bool"
        }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
    },
    {
    "inputs": [
        {
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
        }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
    },
    {
    "inputs": [
        {
        "internalType": "address",
        "name": "",
        "type": "address"
        }
    ],
    "name": "userLastBlockBuyTransactions",
    "outputs": [
        {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
        }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
    },
    {
    "stateMutability": "payable",
    "type": "receive",
    "payable": true
    },
    {
    "inputs": [],
    "name": "migrateOldNode",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
    },
    {
    "inputs": [
        {
        "internalType": "address[]",
        "name": "addresses_",
        "type": "address[]"
        },
        {
        "internalType": "uint256[]",
        "name": "balances_",
        "type": "uint256[]"
        }
    ],
    "name": "migrate",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
    },
    {
    "inputs": [
        {
        "internalType": "address",
        "name": "account",
        "type": "address"
        },
        {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
        }
    ],
    "name": "burn",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
    },
    {
    "inputs": [
        {
        "internalType": "address",
        "name": "newAddress",
        "type": "address"
        }
    ],
    "name": "updateJoeRouterAddress",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
    },
    {
    "inputs": [
        {
        "internalType": "uint256",
        "name": "newVal",
        "type": "uint256"
        }
    ],
    "name": "updateSwapTokensAmount",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
    },
    {
    "inputs": [
        {
        "internalType": "address payable",
        "name": "newVal",
        "type": "address"
        }
    ],
    "name": "updateTeamPool",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
    },
    {
    "inputs": [
        {
        "internalType": "address payable",
        "name": "newVal",
        "type": "address"
        }
    ],
    "name": "updateRewardsPool",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
    },
    {
    "inputs": [
        {
        "internalType": "uint256",
        "name": "newVal",
        "type": "uint256"
        }
    ],
    "name": "updateRewardsFee",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
    },
    {
    "inputs": [
        {
        "internalType": "uint256",
        "name": "newVal",
        "type": "uint256"
        }
    ],
    "name": "updateLiquidityFee",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
    },
    {
    "inputs": [
        {
        "internalType": "uint256",
        "name": "newVal",
        "type": "uint256"
        }
    ],
    "name": "updateTeamFee",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
    },
    {
    "inputs": [
        {
        "internalType": "uint256",
        "name": "newVal",
        "type": "uint256"
        }
    ],
    "name": "updateCashoutFee",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
    },
    {
    "inputs": [
        {
        "internalType": "uint256",
        "name": "newVal",
        "type": "uint256"
        }
    ],
    "name": "updateRwSwapFee",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
    },
    {
    "inputs": [
        {
        "internalType": "bool",
        "name": "newVal",
        "type": "bool"
        }
    ],
    "name": "updateSwapLiquify",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
    },
    {
    "inputs": [
        {
        "internalType": "bool",
        "name": "newVal",
        "type": "bool"
        }
    ],
    "name": "updateIsTradingEnabled",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
    },
    {
    "inputs": [
        {
        "internalType": "address",
        "name": "pair",
        "type": "address"
        },
        {
        "internalType": "bool",
        "name": "value",
        "type": "bool"
        }
    ],
    "name": "setAutomatedMarketMakerPair",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
    },
    {
    "inputs": [
        {
        "internalType": "bool",
        "name": "value",
        "type": "bool"
        }
    ],
    "name": "setAntiBot",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
    },
    {
    "inputs": [
        {
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
        }
    ],
    "name": "setBlockToPass",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
    },
    {
    "inputs": [
        {
        "internalType": "uint16",
        "name": "value",
        "type": "uint16"
        }
    ],
    "name": "setBuyTax",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
    },
    {
    "inputs": [
        {
        "internalType": "uint16",
        "name": "value",
        "type": "uint16"
        }
    ],
    "name": "setSellTax",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
    },
    {
    "inputs": [
        {
        "internalType": "address",
        "name": "account",
        "type": "address"
        },
        {
        "internalType": "bool",
        "name": "value",
        "type": "bool"
        }
    ],
    "name": "blacklistAddress",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
    },
    {
    "inputs": [
        {
        "internalType": "address",
        "name": "sender",
        "type": "address"
        }
    ],
    "name": "getBlock",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
    },
    {
    "inputs": [],
    "name": "getCurrentBlock",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
    },
    {
    "inputs": [
        {
        "internalType": "string",
        "name": "name",
        "type": "string"
        },
        {
        "internalType": "uint256",
        "name": "amount_",
        "type": "uint256"
        }
    ],
    "name": "createNodeWithTokens",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
    },
    {
    "inputs": [
        {
        "internalType": "uint256",
        "name": "blocktime",
        "type": "uint256"
        }
    ],
    "name": "cashoutReward",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
    },
    {
    "inputs": [],
    "name": "cashoutAll",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
    },
    {
    "inputs": [
        {
        "internalType": "uint256",
        "name": "blocktime",
        "type": "uint256"
        }
    ],
    "name": "compoundNodeRewards",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
    },
    {
    "inputs": [
        {
        "internalType": "uint256",
        "name": "creationTime",
        "type": "uint256"
        }
    ],
    "name": "compoundAllNodes",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
    }
];