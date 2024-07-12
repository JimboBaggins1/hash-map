import { Node } from "./NodeClass";

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
        return (tmp.value = kvpNode.value);
      }
      while (tmp.next) {
        // check if key already exists, in which case we just need to replace value
        if (tmp.key === kvpNode.key) {
          return (tmp.value = kvpNode.value);
        }
        tmp = tmp.next;
      }
      // track how full the array is
      tmp.next = kvpNode;
      this.size = this.length;
      if (this.size > this.capacity * this.loadFactor) {
        // increase capacity when load factor is exceeded
        this.capacity *= 2;
        this.buckets.length = this.capacity;

        // redistribute existing kvps in new buckets
        const kvpArr = this.entries();
        this.clear();
        kvpArr.forEach(([key, value]) => {
          this.set(key, value);
        });
      }
      return;
    }

    // update size of array
  }

  get(key) {
    const hashCode = this.hash(key);

    // find all KVPs stored in this bucket
    let tmp = this.buckets[hashCode];

    while (tmp) {
      if (tmp.key === key) {
        return tmp.value;
      }
      tmp = tmp.next;
    }
    return null;
  }

  has(key) {
    const hashCode = this.hash(key);

    // find all KVPs stored in this bucket
    let tmp = this.buckets[hashCode];

    while (tmp) {
      if (tmp.key === key) {
        return true;
      }
      tmp = tmp.next;
    }
    return false;
  }

  remove(key) {
    const hashCode = this.hash(key);

    // find all KVPs stored in this bucket
    let tmp = this.buckets[hashCode];
    let prev = null;

    // check that node to be removed exists
    if (tmp) {
      // special case - only one node in bucket, and we want to remove this node
      if (!tmp.next && tmp.key === key) {
        this.buckets[hashCode] = undefined;
        this.size = this.length;
        return;
      }

      // special case - if there are multiple nodes in bucket, and we want to remove the head node
      if (tmp.key === key) {
        this.buckets[hashCode] = tmp.next;
        this.size = this.length;
        return;
      }

      // general case - if there are n nodes in bucket (n > 1), and we want to remove a node in range 1 to n
      while (tmp.next) {
        prev = tmp;
        tmp = tmp.next;
        if (tmp.key === key) {
          prev.next = tmp.next;
          this.size = this.length;
          return;
        }
      }
    }

    return false;
  }

  get length() {
    let count = 0;
    // loop through array of buckets, if bucket contains one or more nodes, count those nodes
    this.buckets.forEach((node) => {
      let tmp = node;
      while (tmp) {
        count++;
        tmp = tmp.next;
      }
    });
    return count;
  }

  clear() {
    for (let i = 0; i < this.buckets.length; i++) {
      this.buckets[i] = undefined;
    }

    // update size
    this.size = this.length;
  }

  keys() {
    let keyArr = [];
    this.buckets.forEach((node) => {
      let tmp = node;
      while (tmp) {
        keyArr.push(tmp.key);
        tmp = tmp.next;
      }
    });
    return keyArr;
  }

  values() {
    let valuesArr = [];
    this.buckets.forEach((node) => {
      let tmp = node;
      while (tmp) {
        valuesArr.push(tmp.value);
        tmp = tmp.next;
      }
    });
    return valuesArr;
  }

  entries() {
    let kvpArr = [];
    this.buckets.forEach((node) => {
      let tmp = node;
      while (tmp) {
        kvpArr.push([tmp.key, tmp.value]);
        tmp = tmp.next;
      }
    });
    return kvpArr;
  }
}
