// Exports to main.js
export default function hashMap() {
  let tableSize = 12;
  const hashMap = new Array(tableSize);

  const hash = function generateHashCode(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
      hashCode = hashCode % tableSize;
    }

    return hashCode;
  };

  const traverse = function traverseList(key, list) {
    if (list.key === key) {
      return list.value;
    }

    if (list.nextNode === null) {
      return null;
    }

    return traverse(key, list.nextNode);
  };

  const updateKey = function updateKeyValue(key, value, list) {
    if (list.nextNode === null) {
      return false;
    }

    if (list.key === key) {
      list.value = value;
      return true;
    }

    return updateKey(key, value, list.nextNode);
  };

  const set = function setKey(key, value) {
    const index = hash(key);

    if (hashMap[index] === undefined) {
      hashMap[index] = { key, value, nextNode: null };
      return;
    }

    const keyExists = updateKey(key, value, hashMap[index]);
    if (keyExists === true) {
      return;
    }

    const headNode = hashMap[index];
    const newNode = { key, value, nextNode: headNode };
    hashMap[index] = newNode;
  };

  const get = function getKeyValue(key) {
    const list = hashMap[hash(key)];
    return traverse(key, list);
  };

  const has = function keyInMap(key) {
    const list = hashMap[hash(key)];
    return traverse(key, list) !== null;
  };

  return {
    hashMap,
    set,
    get,
    has,
  };
}
