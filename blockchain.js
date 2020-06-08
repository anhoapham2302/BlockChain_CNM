const Block = require('./block');
const Transaction = require('./transaction');

module.exports = class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 4;
        this.pendingTransaction = [];
        this.miningReward = 100;
    }

    createGenesisBlock(){
        return new Block(0, new Date().getTime(), "Genesis Block", "0");
    }

    getLastestBlock(){
        return this.chain[this.chain.length-1];
    }

    addBlock(newBlock){
        if(this.chain.length === 0){
            this.chain = [this.createGenesisBlock()]
        }
        else{
        newBlock.index = this.getLastestBlock().index + 1;
        newBlock.previousHash = this.getLastestBlock().hash;
        newBlock.timestamp = new Date().getTime();
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
        }
    }

    mineTransaction(miningRewardAddress){
        this.addBlock(new Block(null, null, this.pendingTransaction));
        var tx = new Transaction('system', miningRewardAddress, this.miningReward)
        this.pendingTransaction.push(tx);
    }

    addTransaction(transaction){
        if(!transaction.fromAddress || !transaction.toAddress){
            throw new Error('Transaction must include from address and to address!');
        }
        if(!transaction.isValid()){
            throw new Error('Cannot add transaction to chain');
        }
        this.pendingTransaction.push(transaction);
    }

    getBalanceOfAddress(address){
        let balance = 0;
        for (const block of this.chain){
            for (const trans of block.data){
                if(trans.fromAddress === address){
                    balance -= trans.amount;
                }

                if(trans.toAddress === address){
                    balance += trans.amount;
                }
            }
        }
        return balance;
    }

    isChainValid(){
        for (let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i-1];

            if(!currentBlock.hasValidTransaction()){
                return false;
            }

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
