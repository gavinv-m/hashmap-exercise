// Exports to main.js
export default function hashMap() {
  const loadFactor = 0.75;
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

  const returnArray = function returnRequestedType(list, type) {
    if (list.nextNode === null) {
      return [list[type]];
    }

    const array = returnArray(list.nextNode, type);
    array.push(list[type]);
    return array;
  };

  const returnEntryArray = function returnPairs(list) {
    const array = [];
    while (list !== null) {
      const { key, value } = list;
      const pairsArray = [key, value];
      array.push(pairsArray);
      list = list.nextNode;
    }

    return array;
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

  const extract = function extractFromHashMap(type) {
    const array = [];
    hashMap.forEach((bucket) => {
      if (bucket !== undefined) {
        array.push(...returnArray(bucket, type));
      }
    });
    return array;
  };

  const keys = function returnKeys() {
    return extract('key');
  };

  const values = function returnValues() {
    return extract('value');
  };

  const entries = function returnEntries() {
    const array = [];
    hashMap.forEach((bucket) => {
      if (bucket !== undefined) {
        array.push(...returnEntryArray(bucket));
      }
    });

    return array;
  };

  return {
    hashMap,
    set,
    get,
    has,
    remove,
    length,
    clear,
    keys,
    values,
    entries,
  };
}
