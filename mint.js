require('dotenv').config()

const HDWalletProvider = require("truffle-hdwallet-provider");
const web3 = require("web3");
const MNEMONIC = process.env.MNEMONIC;
const NODE_API_KEY = process.env.INFURA_KEY || process.env.ALCHEMY_KEY;
const isInfura = !!process.env.INFURA_KEY;
const FACTORY_CONTRACT_ADDRESS = process.env.FACTORY_CONTRACT_ADDRESS;
// const NFT_CONTRACT_ADDRESS = process.env.NFT_CONTRACT_ADDRESS;
const OWNER_ADDRESS = process.env.OWNER_ADDRESS;
const NETWORK = process.env.NETWORK;
const NUM_CREATURES = 40;
// const NUM_LOOTBOXES = 4;
// const DEFAULT_OPTION_ID = 0;
// const LOOTBOX_OPTION_ID = 2;
// const proofJson = require('./zokrates/code/square/proof.json');
// const { proof, inputs } = proofJson;

if (!MNEMONIC || !NODE_API_KEY || !OWNER_ADDRESS || !NETWORK) {
  console.error(
    "Please set a mnemonic, Alchemy/Infura key, owner, network, and contract address."
  );
  return;
}

const NFT_ABI = [
  {
    constant: false,
    inputs: [
      {
        name: "_to",
        type: "address",
      },
    ],
    name: "mintTo",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
];

const FACTORY_ABI = require('./eth-contracts/build/contracts/ERC721MintableComplete.json');
// console.log('abi', FACTORY_ABI)
async function main() {
  const network =
    NETWORK === "mainnet" || NETWORK === "live" ? "mainnet" : "rinkeby";
  const provider = new HDWalletProvider(
    MNEMONIC,
    isInfura
      ? "https://" + network + ".infura.io/v3/" + NODE_API_KEY
      : "https://eth-" + network + ".alchemyapi.io/v2/" + NODE_API_KEY
  );
  const web3Instance = new web3(provider);

  if (FACTORY_CONTRACT_ADDRESS) {
    const factoryContract = new web3Instance.eth.Contract(
      FACTORY_ABI.abi,
      FACTORY_CONTRACT_ADDRESS,
      { gasLimit: "1000000" }
    );

    const result = await factoryContract.methods
        .mint(OWNER_ADDRESS, 40)
        .send({ from: OWNER_ADDRESS });
      console.log("Minted creature. Transaction: " + result.transactionHash);

    // Creatures issued directly to the owner.
    // for (var i = 35; i < NUM_CREATURES; i++) {
    //   const result = await factoryContract.methods
    //     .mint(OWNER_ADDRESS, i)
    //     .send({ from: OWNER_ADDRESS });
    //   console.log("Minted creature. Transaction: " + result.transactionHash);
    //   // try {
    //   // } catch(ex) {
    //   //   console.log('ex', ex)
    //   // }
    // }
  } else {
    console.error(
      "Add NFT_CONTRACT_ADDRESS or FACTORY_CONTRACT_ADDRESS to the environment variables"
    );
  }
}

main();