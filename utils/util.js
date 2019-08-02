let {
  NEW_URL,
  version } = require('../config/config.js');

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime
}

function json2Form(json){
  var str = [];
  for(var p in json){
    str.push(encodeURIComponent(p)+"="+encodeURIComponent(json[p]));
  }
  return str.join("&");
}

/*
  extend原型
*/
function extend() {
  var target = arguments[0] || {}; //目标对象
  var e = false; //是否进行深拷贝
  var h = 1; //参数个数
  var n = arguments.length; //实际传入的参数个数
  var temp; // 临时保存源参数
  if (typeof target === "boolean") {
    e = arguments[0];
    target = arguments[1] || {};
    //skip the boolean and target
    h = 2;
  }
  // Handle case when target is a string or something (possible in deep copy)
  if (typeof target !== "object" && typeof target !== "function") {
    target = {};
  }
  // extend object itself if only one argument is passed
  if (n === h) {
    target = this;
    --h;
  }
  for (; h < n; h++) {
    temp = arguments[h];
    if (typeof temp !== undefined) {
      for (var t in temp) {
        var src = target[t];
        var copy = temp[t];
        if (target === copy) {
          continue;
        }
        if (
          e &&
          temp[t] &&
          typeof temp[t] === "object" &&
          !temp[t].nodeType
        ) {
          //进行深拷贝
          target[t] = extend(e, src || {}, temp[t]);
        } else {
          //浅拷贝
          if (temp[t] !== undefined) {
            target[t] = temp[t];
          }
        }
      }
    }
  }
  return target;
}


function arrayToString(fileData) {
  var dataString = "";
  console.log(fileData);
  for (var i = 0; i < fileData.length; i++) {
    dataString += String.fromCharCode(fileData[i]);
  }
  console.log(dataString);
  return dataString
}

module.exports = {
  json2Form:json2Form,
  extend,
  arrayToString
}
