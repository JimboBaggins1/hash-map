import { Node } from "./Node";

export class HashMap {
    constructor(initialCapacity = 16, loadFactor = 0.75) {
        this.loadFactor = loadFactor;
        this.capacity = initialCapacity;
        this.buckets = new Array(this.initialCapacity);
        this.size = 0;
    }

    hash(key) {
        let hashCode = 0;
           
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
          hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
        }
     
        return hashCode;
    }
}