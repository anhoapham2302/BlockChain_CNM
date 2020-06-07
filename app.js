const express = require('express')
const app = express();
const Block = require('./block')
const Blockchain = require('./blockchain')
const Transaction = require('./transaction')

let wallet = new Blockchain();

app.get('/', (req, res) => {
  res.send(JSON.stringify(wallet.chain,null,4))
});

app.get('/transaction', (req, res) => {
  wallet.createTransaction(new Transaction('address1', 'address2', 100));
  wallet.mineTransaction('anhoa-address');
  res.send(JSON.stringify(wallet.chain,null,4))
});

app.get('/info', (req, res) => {
  res.send(JSON.stringify(wallet.getBalanceOfAddress('anhoa-address'),null,4))
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