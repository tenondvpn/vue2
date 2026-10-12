/**
 * Created by jiachenpan on 16/11/18.
 */

export function isvalidUsername(str) {
  const valid_map = ["admin", "editor"];
  return valid_map.indexOf(str.trim()) >= 0;
}

/* 合法uri*/
export function validateURL(textval) {
  const urlregex =
    /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
  return urlregex.test(textval);
}
/**
 * 邮箱
 * @param {*} s
 */
export function isEmail(s) {
  return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(
    s
  );
}

/**
 * 手机号码
 * @param {*} s
 */
export function isMobile(s) {
  return /^1[0-9]{10}$/.test(s);
}

/**
 * 电话号码
 * @param {*} s
 */
export function isPhone(s) {
  return /^([0-9]{3,4}-)?[0-9]{7,8}$/.test(s);
}

/**
 * URL地址
 * @param {*} s
 */
export function isURL(s) {
  return /^http[s]?:\/\/.*/.test(s);
}

/* 小写字母*/
export function validateLowerCase(str) {
  const reg = /^[a-z]+$/;
  return reg.test(str);
}

/* 大写字母*/
export function validateUpperCase(str) {
  const reg = /^[A-Z]+$/;
  return reg.test(str);
}

/* 大小写字母*/
export function validatAlphabets(str) {
  const reg = /^[A-Za-z]+$/;
  return reg.test(str);
}
/*验证pad还是pc*/
export const vaildatePc = function () {
  const userAgentInfo = navigator.userAgent;
  const Agents = [
    "Android",
    "iPhone",
    "SymbianOS",
    "Windows Phone",
    "iPad",
    "iPod",
  ];
  let flag = true;
  for (var v = 0; v < Agents.length; v++) {
    if (userAgentInfo.indexOf(Agents[v]) > 0) {
      flag = false;
      break;
    }
  }
  return flag;
};
/**
 * validate email
 * @param email
 * @returns {boolean}
 */
export function validateEmail(email) {
  const re =
    /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

/**
 * 判断身份证号码
 */
export function isValidIdCard(id) {
  // 身份证号码为15位或18位
  if (id.length !== 15 && id.length !== 18) {
    return false;
  }
  // 检查是否全是数字（15位身份证号码不校验最后一位）
  if (
    !/^\d+$/.test(id.substr(0, id.length - 1)) ||
    (id.length === 18 && !/(^\d{17}(\d|X|x)$)/.test(id))
  ) {
    return false;
  }
  // 校验出生日期
  const year = id.substring(6, 10);
  const month = id.substring(10, 12);
  const day = id.substring(12, 14);
  const tempDate = new Date(year + "-" + month + "-" + day);
  // 检查日期是否有效
  // 注意：这里只做了简单的年月日有效性检查，未考虑闰年等情况
  if (
    tempDate.getFullYear() !== parseInt(year, 10) ||
    tempDate.getMonth() + 1 !== parseInt(month, 10) ||
    tempDate.getDate() !== parseInt(day, 10) ||
    isNaN(tempDate.getTime()) // 检查日期是否真实存在
  ) {
    return false;
  }
  // 校验码校验（最重要）
  const checkDigit = id.substring(17, 18);
  if (id.length === 18 && !isCheckDigitValid(id.substring(0, 17), checkDigit)) {
    return false;
  }
  return true;
}

// 身份证校验码校验函数
function isCheckDigitValid(id17, checkDigit) {
  // 校验码对应的值
  const checkCodes = "10X98765432";
  // 加权因子
  const factors = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
  let sum = 0;
  for (let i = 0; i < 17; i++) {
    sum += parseInt(id17[i], 10) * factors[i];
  }
  const mod = sum % 11;
  return checkCodes[mod].toUpperCase() === checkDigit.toUpperCase();
}

/**
 * 港澳居民通行证 H/M + 10位或8位数字
 * @param {*} str
 */
export function isValidHMCard(str) {
  return /^[HMhm]{1}([0-9]{10}|[0-9]{8})$/.test(str);
}

/**
 * 台湾居民通行证 新版8位或18位数字,旧版10位数字英文组合
 * @param {*} str
 */
export function isValidTwCard(str) {
  return /^(\d{8}|\d{18}|[\dA-Za-z]{10})$/.test(str);
}

/**
 * 统一社会信用代码
 * [0-9A-HJ-NPQRTUWXY]{2} 表示前两个字符必须是数字或大写英文字母（但排除I、O、Z、S、V，因为这些字符在组织机构代码中容易与数字1、0、2、5混淆）
 * \d{6} 表示接下来的6个字符必须是数字
 * [0-9A-HJ-NPQRTUWXY]{10} 表示接下来的10个字符也必须是数字或上述指定的大写英文字母
 * @param {*} str
 */
export function isValidUsci(str) {
  return /^[0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}$/.test(str);
}

/**
 * 判断手机号码是否正确
 */
export function isvalidatemobile(phone) {
  let list = [];
  let result = true;
  let msg = "";
  var isPhone = /^0\d{2,3}-?\d{7,8}$/;
  //增加134 减少|1349[0-9]{7}，增加181,增加145，增加17[678]
  if (!validatenull(phone)) {
    if (phone.length == 11) {
      if (isPhone.test(phone)) {
        msg = "手机号码格式不正确";
      } else {
        result = false;
      }
    } else {
      msg = "手机号码长度不为11位";
    }
  } else {
    msg = "手机号码不能为空";
  }
  list.push(result);
  list.push(msg);
  return list;
}
/**
 * 判断姓名是否正确
 */
export function validatename(name) {
  var regName = /^[\u4e00-\u9fa5]{2,4}$/;
  if (!regName.test(name)) return false;
  return true;
}
/**
 * 判断是否为整数
 */
export function validatenum(num, type) {
  let regName = /[^\d.]/g;
  if (type == 1) {
    if (!regName.test(num)) return false;
  } else if (type == 2) {
    regName = /[^\d]/g;
    if (!regName.test(num)) return false;
  }
  return true;
}
/**
 * 判断是否为小数
 */
export function validatenumord(num, type) {
  let regName = /[^\d.]/g;
  if (type == 1) {
    if (!regName.test(num)) return false;
  } else if (type == 2) {
    regName = /[^\d.]/g;
    if (!regName.test(num)) return false;
  }
  return true;
}
/**
 * 判断是否为空
 */
export function validatenull(val) {
  if (typeof val == "boolean") {
    return false;
  }
  if (typeof val == "number") {
    return false;
  }
  if (val instanceof Array) {
    if (val.length == 0) return true;
  } else if (val instanceof Object) {
    if (JSON.stringify(val) === "{}") return true;
  } else {
    if (
      val == "null" ||
      val == null ||
      val == "undefined" ||
      val == undefined ||
      val == ""
    )
      return true;
    return false;
  }
  return false;
}
// 上传文件格式校验
export function validFileType(file, type, error) {
  if (!type) {
    return true;
  }
  const formatList = type.split(",").map((item) => item.replace(".", ""));
  const fileType = _.last(_.split(_.get(file, "name"), "."));
  const isAllowFileFormat = _.includes(formatList, fileType.toLowerCase());
  if (!isAllowFileFormat) {
    error("文件格式错误");
    return false;
  }
  return true;
}

// 上传文件大小校验
export function validFileSize(file, size, error) {
  if (!size) {
    return true;
  }
  if (file.size > size) {
    error("文件大小超出限制");
    return false;
  }
  return true;
}
