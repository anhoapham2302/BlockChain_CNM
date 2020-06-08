const express = require('express')
const app = express();
app.use(express.urlencoded());
app.use(express.json());
const Block = require('./block')
const Blockchain = require('./blockchain')
const Transaction = require('./transaction')
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');
var exphbs = require('express-handlebars');
var hbs_sections = require('express-handlebars-sections');

const myKey = ec.keyFromPrivate('b5bbce2b72aa682620a6352051677191376bdec5ee97fd55812354770174a9d5');
const myWalletAddress = myKey.getPublic('hex');
let wallet = new Blockchain();
let tx = new Transaction(null, null, 0);
app.engine('hbs', exphbs({
  defaultLayout: 'main.hbs',
  layoutsDir: 'views/_layouts',
  helpers: {
      section: hbs_sections()
  }
}));
app.set('view engine', 'hbs');
app.get('/', (req, res) => {
  var p = wallet.chain;
  Promise.all(p).then(rows => {
    res.render('home', {
        block: rows,
    })  
})
.catch(err=>{
    console.log(err);
});
});

app.get('/add', (req, res) => {
  wallet.addBlock(new Block(null, null, null));
  var p = wallet.chain;
  Promise.all(p).then(rows => {
    res.render('home', {
        block: rows,
    })  
})
.catch(err=>{
    console.log(err);
});
console.log(JSON.stringify(wallet.chain,null,4))
});

app.get('/createtransaction',(req, res)=>{
  Promise.all([myWalletAddress]).then(rows=>{
    res.render('createtransaction',{
      tran: rows,
    })
  })
})
app.post('/createtransaction', (req, res)=>{
  console.log(req.body.fromadd)
  tx = new Transaction(req.body.fromadd, req.body.toadd, req.body.amt);
  tx.signTransaction(myKey);
  wallet.addTransaction(tx);
  res.redirect('miningtransaction')
.catch(err=>{
    console.log(err);
});
})

app.get('/miningtransaction', (req, res)=>{

  var p = tx;
  Promise.all([p]).then(rows => {
    res.render('miningtransaction', {
        tran: rows,
    })  
})
.catch(err=>{
    console.log(err);
});
});

app.get('/pending', (req, res)=>{

  wallet.mineTransaction(myWalletAddress);
  res.redirect('/')

 
});

app.get('/minependingtransaction', (req, res)=>{

  // wallet.mineTransaction(myWalletAddress);

  res.send(JSON.stringify(wallet.pendingTransaction,null,4))
 
});

app.get('/info', (req, res)=>{

  // wallet.mineTransaction(myWalletAddress);
  wallet.getBalanceOfAddress(myWalletAddress);
  res.send(JSON.stringify("Your balance is:" ,wallet.pendingTransaction,null,4))
 
});

app.listen(8000, () => {
});