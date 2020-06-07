const express = require('express')
const app = express();
const Block = require('./block')
const Blockchain = require('./blockchain')
const Transaction = require('./transaction')
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const myKey = ec.keyFromPrivate('b5bbce2b72aa682620a6352051677191376bdec5ee97fd55812354770174a9d5');
const myWalletAddress = myKey.getPublic('hex');
let wallet = new Blockchain();

app.get('/', (req, res) => {
  res.send(JSON.stringify(wallet.chain,null,4))
});

app.get('/transaction', (req, res) => {
  const tran = new Transaction(myWalletAddress, 'toAddress', 100);
  tran.signTransaction(myKey);
  wallet.addTransaction(tran);
  res.send(JSON.stringify(wallet.chain,null,4))
});

app.get('/info', (req, res) => {
  res.send(JSON.stringify(wallet.getBalanceOfAddress(myWalletAddress),null,4))
});


app.get('/add', (req, res) => {
  wallet.addBlock(new Block(null, null, {amout: 6}));
  res.send(JSON.stringify(wallet.chain,null,4))
});

app.get('/isvalid', (req, res) => {
  res.send(wallet.isChainValid())
});

app.listen(8000, () => {
});