"use strict";
// The multicall
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var ethers_multicall_1 = require("ethers-multicall");
var ethers_1 = require("ethers");
var http = require('http');
var Web3HttpProvider = require('web3-providers-http');
var options = {
    keepAlive: true,
    timeout: 20000,
    //headers: [{name: 'Access-Control-Allow-Origin', value: '*'},{...}],
    withCredentials: false
};
var web3Provider = new Web3HttpProvider('https://http-mainnet.hecochain.com', { timeout: 600 });
var provider = new ethers_1.ethers.providers.Web3Provider(web3Provider);
//const infuraKey = '14abaf422f2649989c72f561aef24046';
//const provider = new ethers.providers.InfuraProvider('mainnet', infuraKey);
var hrc20Abi = require('./abi/mdx_factory_pair_abi.json');
var pairs = require('./pairs.json');
var myAddress = '0x5293fEb1fc5c934C7a263ab73D6ee70517F46E84';
function call() {
    return __awaiter(this, void 0, void 0, function () {
        var ethcallProvider, iface, daiContract, uniswapDaiPool, ethBalanceCall, daiBalanceCall, data, daiBalance, dairesult;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    ethcallProvider = new ethers_multicall_1.Provider(provider);
                    return [4 /*yield*/, ethcallProvider.init()];
                case 1:
                    _a.sent();
                    iface = new ethers_1.ethers.utils.Interface(hrc20Abi);
                    daiContract = new ethers_multicall_1.Contract(myAddress, hrc20Abi);
                    uniswapDaiPool = "0xdDE0D948B0597F08878620f1Afd3070dC7243386";
                    ethBalanceCall = ethcallProvider.getEthBalance(uniswapDaiPool);
                    daiBalanceCall = daiContract.getReserves();
                    //console.log(ethcallProvider)
                    console.log('daiBalanceCall', daiBalanceCall);
                    return [4 /*yield*/, ethcallProvider.all([daiBalanceCall])];
                case 2:
                    data = _a.sent();
                    daiBalance = data[0];
                    console.log('eth balance', daiBalance.toString());
                    return [4 /*yield*/, provider.call({
                            // ENS public resovler address
                            to: "0x5293fEb1fc5c934C7a263ab73D6ee70517F46E84",
                            // `function addr(namehash("ricmoo.eth")) view returns (address)`
                            data: iface.encodeFunctionData('getReserves', [])
                        })];
                case 3:
                    dairesult = _a.sent();
                    console.log("getReserves:", parseInt(iface.decodeFunctionResult("getReserves", dairesult).reserve0._hex.toString(), 16));
                    return [2 /*return*/];
            }
        });
    });
}
call();
