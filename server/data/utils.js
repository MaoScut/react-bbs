const fs = require('fs');

function readAll(p) {
  return new Promise((resolve, reject) => {
    fs.readFile(p, 'utf8', (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
}

// 写入后返回数组
function writeAll(arr, p) {
  return new Promise((resolve, reject) => {
    fs.writeFile(p, JSON.stringify(arr, null, 2), (e) => {
      if (e) reject(e);
      resolve(arr);
    });
  });
}

// 连接两个表
function linkTable(mainTable, assistantTable, mainProperty, assisProperty) {
  // 返回obj的arr
  return arr;
}
// 检查某个obj是否具有指定的属性
// obj：要检查的对象
// props：数组，元素是该obj需要具有的属性
// 返回结果
// 只要是具有这些属性就返回true，（多了属性也返回true）
// 缺少任何一个就抛出异常
function checkProperty(obj, props) {
  const lackProps = [];
  props.forEach((prop) => {
    if (obj[prop] === undefined) lackProps.push(prop);
  });
  if (lackProps.length === 0) return true;
  const errorMessage = `缺少属性：${lackProps.join(',')}`;
  throw new Error(errorMessage);
}

function checkArrayElementProperty(arr, props) {
  return arr.every(obj => checkProperty(obj, props));
}

function cutObj(obj, props) {
  const newObj = {};
  props.forEach((prop) => {
    newObj[prop] = obj[prop];
  });
  return newObj;
}

function createError(message, type) {
  return {
    message,
    type,
  };
}

module.exports = {
  writeAll,
  readAll,
  checkProperty,
  checkArrayElementProperty,
  createError,
  cutObj,
};
