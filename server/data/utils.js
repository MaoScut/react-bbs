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
module.exports = {
  writeAll,
  readAll,
};
