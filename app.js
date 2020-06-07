const express = require('express')
const app = express();
const Block = require('./block')
const Blockchain = require('./blockchain')

let wallet = new Blockchain();

app.get('/', (req, res) => {
  res.send(JSON.stringify(wallet.chain,null,4))
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