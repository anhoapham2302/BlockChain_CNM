const SHA256 = require('crypto-js/sha256')

module.exports = class Block{
        constructor(index, timestamp, data, previousHash, nonce) {
            this.index = index;
            this.previousHash = previousHash;
            this.timestamp = timestamp;
            this.data = data;
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
    }
    