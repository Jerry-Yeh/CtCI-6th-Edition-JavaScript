export default class HashTable {
  storage: any[];
  constructor(size: number) {
    this.storage = new Array(size);
  }

  private hash(key: string) {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash += key.charCodeAt(i);
    }
    return hash % this.storage.length;
  }

  print() {
    console.log(this.storage);
  }

  set(key: string, value: any) {
    const address = this.hash(key);
    const bucket = this.storage[address];

    if (!bucket) {
      this.storage[address] = [
        [key, value]
      ];
    } else {
      let inserted = false;
      for (let i = 0; i < bucket; i++) {
        if (bucket[i][0] === key) {
          bucket[i][1] = value;
          inserted = true;
        }
      }

      if (!inserted) {
        bucket.push([key, value]);
      }
    }


    return this.storage;
  }

  get(key: string): any {
    const address = this.hash(key);
    const bucket = this.storage[address];

    if (bucket) {
      for (let i = 0; i < bucket.length; i++) {
        const [_key, value] = bucket[i];
        if (_key === key) {
          return value;
        }
      }
    }

    return undefined;
  }

  remove(key: string) {
    const address = this.hash(key);
    const bucket = this.storage[address];

    if (bucket[0][0] === key && bucket.length === 1) {
      delete this.storage[address];
    } else {
      for (let i = 0; i < bucket.length; i++) {
        if (bucket[i][0] === key) {
          delete bucket[i];
        }
      }
    }
  }

  keys() {
    let keys: any[] = [];
    for (let i = 0; i < this.storage.length; i++) {
      const bucket = this.storage[i];
      if (bucket) {
        for (let j = 0; j < bucket.length; j++) {
          const [key] = bucket[j];
          keys.push(key);
        }
      }
    }

    return keys;
  }
}

const myHashTable = new HashTable(2);
myHashTable.set('grapes', 10000);
// myHashTable.set('apples', 54);
// myHashTable.set('oranges', 2);

console.log('storage', myHashTable.storage);
