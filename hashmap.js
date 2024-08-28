// Exports to main.js
export default function hashMap() {
  let tableSize = 12;
  let numberOkKeys = 0;
  let hashMap = new Array(tableSize).fill(undefined);

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

  const traverseRemove = function traverseAndRemove(key, list, index) {
    // Not found
    if (list.nextNode === null && list.key !== key) {
      return false;
    }

    // Only node in list
    if (list.key === key && list.nextNode === null) {
      hashMap[index] = undefined;
      return true;
    }

    // Node to remove
    if (list.nextNode.key === key) {
      const remainingNodes = list.nextNode.nextNode;
      list.nextNode = remainingNodes;
      return true;
    }

    return traverseRemove(key, list.nextNode);
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
      numberOkKeys += 1;
      return;
    }

    const keyExists = updateKey(key, value, hashMap[index]);
    if (keyExists === true) {
      return;
    }

    const headNode = hashMap[index];
    const newNode = { key, value, nextNode: headNode };
    hashMap[index] = newNode;
    numberOkKeys += 1;
  };

  const get = function getKeyValue(key) {
    const list = hashMap[hash(key)];
    return traverse(key, list);
  };

  const has = function keyInMap(key) {
    const list = hashMap[hash(key)];
    return traverse(key, list) !== null;
  };

  const remove = function removeKey(key) {
    const index = hash(key);
    const list = hashMap[index];
    const result = traverseRemove(key, list, index);
    if (result === true) numberOkKeys -= 1;

    return result;
  };

  const length = function returnNumberOfKeys() {
    return numberOkKeys;
  };

  const clear = function clearHashMap() {
    hashMap = new Array(tableSize).fill(undefined);
  };

  return {
    hashMap,
    set,
    get,
    has,
    remove,
    length,
    clear,
  };
}
