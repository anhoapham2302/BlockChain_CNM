const SHA256 = require('crypto-js/sha256')
const Transaction = require('./transaction');


module.exports = class Block{
        constructor(index, timestamp, transaction, previousHash) {
            this.index = index;
            this.previousHash = previousHash;
            this.timestamp = timestamp;
            this.data = transaction;
            this.nonce = 0;
            this.hash = this.calculateHash();
        }
    
        calculateHash(){
            return SHA256(this.index + this.previousHash + this.timestamp + this.nonce + JSON.stringify(this.data)).toString();
        }

        mineBlock(difficulty){
            while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")){
                this.nonce++;
                this.hash = this.calculateHash();
            }
        }

        hasValidTransaction(){
            for(const tran of this.data){
                if(!tran.isValid()){
                    return false;
                }
            }
            return true;
        }
    }
    