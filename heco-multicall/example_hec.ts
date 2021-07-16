// The multicall

import { Contract, Provider } from 'ethers-multicall';
import { ethers } from 'ethers';

const http = require('http');
const Web3HttpProvider = require('web3-providers-http');

const options = {
    keepAlive: true,
    timeout: 20000, // milliseconds,
    //headers: [{name: 'Access-Control-Allow-Origin', value: '*'},{...}],
    withCredentials: false,
    //agent: {http: http.Agent(...), baseUrl: ''}
};

const web3Provider = new Web3HttpProvider('https://http-mainnet.hecochain.com', {timeout:600});
const provider = new ethers.providers.Web3Provider(web3Provider)

//const infuraKey = '14abaf422f2649989c72f561aef24046';
//const provider = new ethers.providers.InfuraProvider('mainnet', infuraKey);

const hrc20Abi = require('./abi/mdx_factory_pair_abi.json');
const pairs = require('./pairs.json');

const myAddress = '0x5293fEb1fc5c934C7a263ab73D6ee70517F46E84'



async function call() {
  //const { chainId } = await provider.getNetwork();
  //console.log("chainId:", chainId)
  const ethcallProvider = new Provider(provider);
  await ethcallProvider.init();
  const iface = new ethers.utils.Interface(hrc20Abi);

  const daiContract = new Contract(myAddress, hrc20Abi);

  const uniswapDaiPool = "0xdDE0D948B0597F08878620f1Afd3070dC7243386"

  const ethBalanceCall = ethcallProvider.getEthBalance(uniswapDaiPool);
  const daiBalanceCall = daiContract.getReserves();

  //console.log(ethcallProvider)
  console.log('daiBalanceCall', daiBalanceCall);
  const data = await ethcallProvider.all([daiBalanceCall]);
  //const ethBalance = data[0];
  const daiBalance = data[0];

  console.log('eth balance', daiBalance.toString());
  
  //console.log('dai balance', data);

  const dairesult = await provider.call({
  // ENS public resovler address
  to: "0x5293fEb1fc5c934C7a263ab73D6ee70517F46E84",

  // `function addr(namehash("ricmoo.eth")) view returns (address)`
  data: iface.encodeFunctionData('getReserves', [] )
});
  console.log("getReserves:", parseInt(iface.decodeFunctionResult("getReserves",dairesult).reserve0._hex.toString(), 16));


}

call();
