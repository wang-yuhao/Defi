"use strict";
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
var erc20Abi = require('erc-20-abi');
var infuraKey = '504bf3b648ee4afa9b8ef68e82d0d5b5';
var provider = new ethers_1.ethers.providers.InfuraProvider('mainnet', infuraKey);
var daiAddress = '0x6b175474e89094c44da98b954eedeac495271d0f';
function call() {
    return __awaiter(this, void 0, void 0, function () {
        var ethcallProvider, daiContract, uniswapDaiPool, ethBalanceCall, daiBalanceCall, _a, ethBalance, daiBalance;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    ethcallProvider = new ethers_multicall_1.Provider(provider);
                    return [4 /*yield*/, ethcallProvider.init()];
                case 1:
                    _b.sent(); // Only required when `chainId` is not provided in the `Provider` constructor
                    daiContract = new ethers_multicall_1.Contract(daiAddress, erc20Abi);
                    uniswapDaiPool = '0x2a1530c4c41db0b0b2bb646cb5eb1a67b7158667';
                    ethBalanceCall = ethcallProvider.getEthBalance(uniswapDaiPool);
                    daiBalanceCall = daiContract.balanceOf(uniswapDaiPool);
                    console.log('daiBalanceCall', daiBalanceCall);
                    return [4 /*yield*/, ethcallProvider.all([ethBalanceCall, daiBalanceCall])];
                case 2:
                    _a = _b.sent(), ethBalance = _a[0], daiBalance = _a[1];
                    console.log('ETH Balance:', ethBalance.toString());
                    console.log('DAI Balance:', daiBalance.toString());
                    return [2 /*return*/];
            }
        });
    });
}
call();
