// The multicall

import { Contract, Provider } from './src';
import { ethers } from 'ethers';
//const worker = require('worker_threads.js')
const start = new Date().getTime();

const http = require('http');
const Web3HttpProvider = require('web3-providers-http');

const options = {
    keepAlive: true,
    timeout: 60000, // milliseconds,
    headers: [{name: 'Access-Control-Allow-Origin', value: '*'}],
    withCredentials: false,
    //agent: {http: http.Agent(...), baseUrl: ''}
};

const web3Provider = new Web3HttpProvider('https://http-mainnet.hecochain.com', options);
const provider = new ethers.providers.Web3Provider(web3Provider)

const hrc20Abi = require('./abi/mdx_factory_pair_abi.json');
const pairs_all = require('./pairs.json');

async function call(pairs) {

  const ethcallProvider = new Provider(provider);
  await ethcallProvider.init();

  const contractCallArray = [];
  pairs.forEach(function(pair){
    const singleContract = new Contract(pair["address"], hrc20Abi);
    const singleContractCall = singleContract.getReserves();
    contractCallArray.push(singleContractCall)
  });

  const dataArray = await ethcallProvider.all(contractCallArray);

  var end = new Date().getTime();
  var time = end - start;
  console.log('Execution time: ' + time);
}

var i = 0
const pairStep = 3000
while (i < pairs_all.length) {
  if (i + pairStep > pairs_all.length){
    call(pairs_all.slice(i,pairs_all.length));
    console.log(i)
  } else{
    call(pairs_all.slice(i, i + pairStep));
    console.log(i)
  }
  i = i  + pairStep;
}


