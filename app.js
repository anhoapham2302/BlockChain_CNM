const express = require('express')
const app = express();
const Block = require('./block')
const Blockchain = require('./blockchain')

let wallet = new Blockchain();
wallet.addBlock(new Block(1, "10/2/2012", {amout: 4}));



app.get('/', (req, res) => {
  res.send(JSON.stringify(wallet,null,4))
});

app.listen(8000, () => {
  console.log(JSON.stringify(wallet,null,4))
});