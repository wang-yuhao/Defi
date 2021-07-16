import { Contract, Provider } from 'ethers-multicall';
import { ethers } from 'ethers';

const erc20Abi = require('erc-20-abi')

const infuraKey = '504bf3b648ee4afa9b8ef68e82d0d5b5';
const provider = new ethers.providers.InfuraProvider('mainnet', infuraKey);

const daiAddress = '0x6b175474e89094c44da98b954eedeac495271d0f';

async function call() {
  const ethcallProvider = new Provider(provider);

  await ethcallProvider.init(); // Only required when `chainId` is not provided in the `Provider` constructor

  const daiContract = new Contract(daiAddress, erc20Abi);

  const uniswapDaiPool = '0x2a1530c4c41db0b0b2bb646cb5eb1a67b7158667';

  const ethBalanceCall = ethcallProvider.getEthBalance(uniswapDaiPool);
  const daiBalanceCall = daiContract.balanceOf(uniswapDaiPool);
  console.log('daiBalanceCall', daiBalanceCall);
  const [ethBalance, daiBalance] = await ethcallProvider.all([ethBalanceCall, daiBalanceCall]);

  console.log('ETH Balance:', ethBalance.toString());
  console.log('DAI Balance:', daiBalance.toString());
}

call();
