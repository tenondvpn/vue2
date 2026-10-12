import { validatenull } from "./validate"
import { fileDownload } from "@/api/common"

//表单序列化
export const serialize = (data) => {
  let list = []
  Object.keys(data).forEach((ele) => {
    list.push(`${ele}=${data[ele]}`)
  })
  return list.join("&")
}
export const getObjType = (obj) => {
  var toString = Object.prototype.toString
  var map = {
    "[object Boolean]": "boolean",
    "[object Number]": "number",
    "[object String]": "string",
    "[object Function]": "function",
    "[object Array]": "array",
    "[object Date]": "date",
    "[object RegExp]": "regExp",
    "[object Undefined]": "undefined",
    "[object Null]": "null",
    "[object Object]": "object"
  }
  if (obj instanceof Element) {
    return "element"
  }
  return map[toString.call(obj)]
}
export const getViewDom = () => {
  return window.document.getElementById("avue-view").getElementsByClassName("el-scrollbar__wrap")[0]
}
/**
 * 对象深拷贝
 */
export const deepClone = (data) => {
  var type = getObjType(data)
  var obj
  if (type === "array") {
    obj = []
  } else if (type === "object") {
    obj = {}
  } else {
    //不再具有下一层次
    return data
  }
  if (type === "array") {
    for (var i = 0, len = data.length; i < len; i++) {
      obj.push(deepClone(data[i]))
    }
  } else if (type === "object") {
    for (var key in data) {
      obj[key] = deepClone(data[key])
    }
  }
  return obj
}
/**
 * 设置灰度模式
 */
export const toggleGrayMode = (status) => {
  if (status) {
    document.body.className = document.body.className + " grayMode"
  } else {
    document.body.className = document.body.className.replace(" grayMode", "")
  }
}
/**
 * 设置主题
 */
export const setTheme = (name) => {
  document.body.className = name
}

/**
 * 加密处理
 */
export const encryption = (params) => {
  let { data, type, param, key } = params
  let result = JSON.parse(JSON.stringify(data))
  if (type == "Base64") {
    param.forEach((ele) => {
      result[ele] = btoa(result[ele])
    })
  } else if (type == "Aes") {
    param.forEach((ele) => {
      result[ele] = window.CryptoJS.AES.encrypt(result[ele], key).toString()
    })
  }
  return result
}

/**
 * 浏览器判断是否全屏
 */
export const fullscreenToggel = () => {
  if (fullscreenEnable()) {
    exitFullScreen()
  } else {
    reqFullScreen()
  }
}
/**
 * esc监听全屏
 */
export const listenfullscreen = (callback) => {
  function listen() {
    callback()
  }

  document.addEventListener("fullscreenchange", function () {
    listen()
  })
  document.addEventListener("mozfullscreenchange", function () {
    listen()
  })
  document.addEventListener("webkitfullscreenchange", function () {
    listen()
  })
  document.addEventListener("msfullscreenchange", function () {
    listen()
  })
}
/**
 * 浏览器判断是否全屏
 */
export const fullscreenEnable = () => {
  var isFullscreen = document.isFullScreen || document.mozIsFullScreen || document.webkitIsFullScreen
  return isFullscreen
}

/**
 * 浏览器全屏
 */
export const reqFullScreen = () => {
  if (document.documentElement.requestFullScreen) {
    document.documentElement.requestFullScreen()
  } else if (document.documentElement.webkitRequestFullScreen) {
    document.documentElement.webkitRequestFullScreen()
  } else if (document.documentElement.mozRequestFullScreen) {
    document.documentElement.mozRequestFullScreen()
  }
}
/**
 * 浏览器退出全屏
 */
export const exitFullScreen = () => {
  if (document.documentElement.requestFullScreen) {
    document.exitFullScreen()
  } else if (document.documentElement.webkitRequestFullScreen) {
    document.webkitCancelFullScreen()
  } else if (document.documentElement.mozRequestFullScreen) {
    document.mozCancelFullScreen()
  }
}
/**
 * 递归寻找子类的父类
 */

export const findParent = (menu, id) => {
  for (let i = 0; i < menu.length; i++) {
    if (menu[i].children.length != 0) {
      for (let j = 0; j < menu[i].children.length; j++) {
        if (menu[i].children[j].id == id) {
          return menu[i]
        } else {
          if (menu[i].children[j].children.length != 0) {
            return findParent(menu[i].children[j].children, id)
          }
        }
      }
    }
  }
}
/**
 * 判断2个对象属性和值是否相等
 */

/**
 * 动态插入css
 */

export const loadStyle = (url) => {
  const link = document.createElement("link")
  link.type = "text/css"
  link.rel = "stylesheet"
  link.href = url
  const head = document.getElementsByTagName("head")[0]
  head.appendChild(link)
}
/**
 * 判断路由是否相等
 */
export const diff = (obj1, obj2) => {
  delete obj1.close
  var o1 = obj1 instanceof Object
  var o2 = obj2 instanceof Object
  if (!o1 || !o2) {
    /*  判断不是对象  */
    return obj1 === obj2
  }

  if (Object.keys(obj1).length !== Object.keys(obj2).length) {
    return false
    //Object.keys() 返回一个由对象的自身可枚举属性(key值)组成的数组,例如：数组返回下表：let arr = ["a", "b", "c"];console.log(Object.keys(arr))->0,1,2;
  }

  for (var attr in obj1) {
    var t1 = obj1[attr] instanceof Object
    var t2 = obj2[attr] instanceof Object
    if (t1 && t2) {
      return diff(obj1[attr], obj2[attr])
    } else if (obj1[attr] !== obj2[attr]) {
      return false
    }
  }
  return true
}
/**
 * 根据字典的value显示label
 */
export const findByvalue = (dic, value) => {
  let result = ""
  if (validatenull(dic)) return value
  if (typeof value == "string" || typeof value == "number" || typeof value == "boolean") {
    let index = 0
    index = findArray(dic, value)
    if (index != -1) {
      result = dic[index].label
    } else {
      result = value
    }
  } else if (value instanceof Array) {
    result = []
    let index = 0
    value.forEach((ele) => {
      index = findArray(dic, ele)
      if (index != -1) {
        result.push(dic[index].label)
      } else {
        result.push(value)
      }
    })
    result = result.toString()
  }
  return result
}
/**
 * 根据字典的value查找对应的index
 */
export const findArray = (dic, value) => {
  for (let i = 0; i < dic.length; i++) {
    if (dic[i].value == value) {
      return i
    }
  }
  return -1
}
/**
 * 生成随机len位数字
 */
export const randomLenNum = (len, date) => {
  let random = ""
  random = Math.ceil(Math.random() * 100000000000000)
    .toString()
    .substr(0, len ? len : 4)
  if (date) random = random + Date.now()
  return random
}
/**
 * 打开小窗口
 */
export const openWindow = (url, title, w, h) => {
  // Fixes dual-screen position                            Most browsers       Firefox
  const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : screen.left
  const dualScreenTop = window.screenTop !== undefined ? window.screenTop : screen.top

  const width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width
  const height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height

  const left = width / 2 - w / 2 + dualScreenLeft
  const top = height / 2 - h / 2 + dualScreenTop
  const newWindow = window.open(
    url,
    title,
    "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=yes, copyhistory=no, width=" + w + ", height=" + h + ", top=" + top + ", left=" + left
  )

  // Puts focus on the newWindow
  if (window.focus) {
    newWindow.focus()
  }
}

/**
 * 获取顶部地址栏地址
 */
export const getTopUrl = () => {
  return window.location.origin
}

/**
 * 获取url参数
 * @param name 参数名
 */
export const getQueryString = (name) => {
  let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i")
  let r = window.location.search.substr(1).match(reg)
  if (r != null) return unescape(decodeURI(r[2]))
  return null
}

export const downloadFile = async (url, name, isDownloadByHref = false) => {
  let fileUrl = ""
  let fileName = name
  if (isDownloadByHref) {
    fileUrl = formatUrl(url)
  } else {
    const i = url.indexOf("/upload/")
    const path = i > 0 ? url.substr(i) : url
    const fileType = getFileExt(fileName).ext
    const res = await fileDownload({ path, fileName }, "blob")
    if (res.data.type === "application/json") return
    // const { headers } = res;
    // const cd = headers["content-disposition"];
    // fileName = decodeURIComponent(cd.split("=")[1]);
    fileUrl = window.URL.createObjectURL(
      new Blob([res.data], {
        type: "application/" + fileType + ";charset=UTF-8"
      })
    )
  }
  const link = document.createElement("a")
  link.style.display = "none"
  link.href = fileUrl
  link.download = fileName
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  window.URL.revokeObjectURL(fileUrl) // 释放掉blob对象
}

/**
 * 下载文件
 * @param {String} path - 文件地址
 * @param {String} name - 文件名,eg: test.png
 */
export function downloadXls(file, name, fileType = "xls", isDate) {
  let fileName = name
  // isDate  默认不加时间拼接
  if (isDate) {
    fileName = fileName + "" + parseTime(new Date())
  }
  if (window.navigator.msSaveOrOpenBlob) {
    // 兼容ie11
    const blob_ie = new Blob([file])
    window.navigator.msSaveOrOpenBlob(blob_ie, fileName + "." + fileType)
  } else {
    const blob = new Blob([file], {
      type: "application/" + fileType + ";charset=utf-8"
    })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.style.display = "none"
    a.href = url
    a.download = fileName + "." + fileType
    a.target = "_blank"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a) // 下载完成移除元素
    window.URL.revokeObjectURL(url) // 释放掉blob对象
  }
}

// 判断终端类型是否为手机
export const isMobile = () => {
  var e = navigator.userAgent.toLowerCase()
  var t = /iPhone|iPad|iPod/i.test(e),
    n = /Android/i.test(e),
    r = /Windows Phone/i.test(e) || /IEMobile/i.test(e) || /WPDesktop/i.test(e),
    a = /BlackBerry/i.test(e),
    o = /Opera Mini/i.test(e)
  return t || n || r || a || o
}

export const getHost = () => {
  const host = location.hostname
  const port = location.port
  const protocol = location.protocol
  return { host, port, protocol }
}

/**
 * @description: 处理文件路径（格式化为相对路径）
 * @param {*} url
 * @return {*}
 */
export const formatUrl = (url) => {
  //包含oss的需要处理
  if (url && url.indexOf("/oss/") > -1) {
    url = url.replace(/.+oss\//, "")
    let domain = "http://10.186.77.169:8000/"
    if (process.env.NODE_ENV === "production") {
      let { host, port, protocol } = getHost()
      port = port ? `:${port}` : ""
      domain = `${protocol}//${host}${port}/`
    }
    return domain + "oss/" + url
  }
  //否则直接返回
  return url
}

/**
 * @description: 处理文件路径（去掉前缀）
 * @param {*} url
 * @return {*}
 */
export const removePrefixFromUrl = (url) => {
  //包含oss的需要处理
  url = url || ""
  let domain = "http://10.186.77.169:8000"
  if (process.env.NODE_ENV === "production") {
    let { host, port, protocol } = getHost()
    port = port ? `:${port}` : ""
    domain = `${protocol}//${host}${port}`
  }
  return url.replace(new RegExp(domain, "g"), "")
}

/**
 * 获取文件名和后缀
 * @param {Object} name
 */
export const getFileExt = (name) => {
  const last_len = name.lastIndexOf(".")
  const len = name.length
  return {
    name: name.substring(0, last_len),
    ext: name.substring(last_len + 1, len)
  }
}

export const dateFmt = (value) => {
  return (value && value.split(" ")[0]) || ""
}

export const isEmpty = (value) => value === "" || value === null || value === undefined

/**
 * 10000 => "10,000"
 * @param {number} num
 */
export function toThousandFilter(num) {
  return (+num || 0).toString().replace(/^-?\d+/g, (m) => m.replace(/(?=(?!\b)(\d{3})+$)/g, ","))
}

// json字符串校验
export const isJsonString = (str) => {
  try {
    const toObj = JSON.parse(str)
    if (toObj && typeof toObj === "object") {
      return true
    }
  } catch {
    console.log("error")
  }
  return false
}

export const base64ToUtf8 = (base64) => {
  const binaryString = atob(base64)

  const uint8Array = new Uint8Array(binaryString.length)
  for (let i = 0; i < binaryString.length; i++) {
    uint8Array[i] = binaryString.charCodeAt(i)
  }

  const decoder = new TextDecoder()
  return decoder.decode(uint8Array)
}

export const strToHex = (str) => {
  const encoder = new TextEncoder();
  const bytes = encoder.encode(str);
  return Array.from(bytes, byte => byte.toString(16).padStart(2, '0')).join('');
}

export const hexToStr = (hex) => {
  const bytes = new Uint8Array(hex.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
  return new TextDecoder().decode(bytes);
}

export const generateRandomHash = (length = 32) => {
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export const objectToFormdata = (obj) => {
  let formData = new FormData()
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      let value = obj[key]
      if (typeof value == "object") {
        value = JSON.stringify(value)
      }
      formData.append(key, value)
    }
  }
  return formData
}

/**
 * @description: 数字设置千分位标识符
 * @return {*}
 * @param {*} num
 */
export const numberThousands = (num) => {
  var str = num.toString()
  var reg = str.indexOf(".") > -1 ? /(\d)(?=(\d{3})+\.)/g : /(\d)(?=(?:\d{3})+$)/g
  return str.replace(reg, "$1,")
}