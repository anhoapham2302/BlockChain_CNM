const Block = require('./block');

module.exports = class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock(){
        return new Block(0, new Date().getTime(), "Genesis Block", "0", 0);
    }

    getLastestBlock(){
        return this.chain[this.chain.length-1];
    }

    addBlock(newBlock){
        newBlock.index = this.getLastestBlock().index + 1;
        newBlock.nonce = this.getLastestBlock().nonce + 1;
        newBlock.previousHash = this.getLastestBlock().hash;
        newBlock.timestamp = new Date().getTime();
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }

    isChainValid(){
        for (let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i-1];

            if(currentBlock.hash !== currentBlock.calculateHash){
                return false;
            }

            if(currentBlock.previousHash !== previousBlock.hash){
                return false;
            }
        }
        return true;
    }
}
