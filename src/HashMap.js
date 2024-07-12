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

    set(key, value) {
        // create new node for key-value pair
        const kvpNode = new Node(key, value);

        // convert key to hash
        const hashCode = this.hash(key);

        // store value in array index that matches hashCode
        let tmp = this.buckets[hashCode];
        
        // if this is the first node added to the bucket, then add node. Else, traverse through the linked list and append node.
        if (!tmp) {
            // track how full the array is
            this.buckets[hashCode] = kvpNode;
            this.size = this.length;
            return;
        } else {
            // special case - if there is already only one node we need to separately check if the values match.
            if (tmp.key === kvpNode.key) {
                return tmp.value = kvpNode.value;
            }
            while (tmp.next) {
                // check if key already exists, in which case we just need to replace value
                if (tmp.key === kvpNode.key) {
                    return tmp.value = kvpNode.value;
                }
                tmp = tmp.next;
            }
            // track how full the array is
            tmp.next = kvpNode;
            this.size = this.length;
            return;
        }

        // update size of array
    }
    get length() {
        let count = 0;
        // loop through array of buckets, if bucket contains one or more nodes, count those nodes
        this.buckets.forEach(node => {
            let tmp = node;
            while (tmp) {
                count++;
                tmp = tmp.next;
            }
        })
        return count;
    }
}