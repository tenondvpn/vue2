/*
 * @Author: zoujp
 * @Date: 2022-01-24 09:42:23
 * @LastEditTime: 2024-07-12 14:13:44
 * @LastEditors: why
 * @Description:
 * @FilePath: \THDataPortCloudWeb\src\util\crypto.js
 */
import CryptoJS from "crypto-js";

function crypto() {
  // 使用AesUtil.genAesKey()生成,需和后端配置保持一致
  this.aesKey = "O2BEeIv399qHQNhD6aGW8R8DEj4bqHXm";
  // 使用DesUtil.genDesKey()生成,需和后端配置保持一致
  this.desKey = "jMVCBsFGDQr1USHo";
}

/**
 * aes 加密方法
 * @param data
 * @returns {*}
 */
crypto.prototype.encrypt = function (data) {
  return this.encryptAES(data, this.aesKey);
};

/**
 * aes 解密方法
 * @param data
 * @returns {*}
 */
crypto.prototype.decrypt = function (data) {
  return this.decryptAES(data, this.aesKey);
};

/**
 * aes 加密方法，同java：AesUtil.encryptToBase64(text, aesKey);
 */
crypto.prototype.encryptAES = function (data, key) {
  const dataBytes = CryptoJS.enc.Utf8.parse(data);
  const keyBytes = CryptoJS.enc.Utf8.parse(key);
  const encrypted = CryptoJS.AES.encrypt(dataBytes, keyBytes, {
    iv: keyBytes,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
};

/**
 * aes 解密方法，同java：AesUtil.decryptFormBase64ToString(encrypt, aesKey);
 */
crypto.prototype.decryptAES = function (data, key) {
  const keyBytes = CryptoJS.enc.Utf8.parse(key);
  const decrypted = CryptoJS.AES.decrypt(data, keyBytes, {
    iv: keyBytes,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return CryptoJS.enc.Utf8.stringify(decrypted);
};

/**
 * des 加密方法，同java：DesUtil.encryptToBase64(text, desKey)
 */
crypto.prototype.encryptDES = function (data, key) {
  const keyHex = CryptoJS.enc.Utf8.parse(key);
  const encrypted = CryptoJS.DES.encrypt(data, keyHex, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  });
  return encrypted.toString();
};

/**
 * des 解密方法，同java：DesUtil.decryptFormBase64(encryptBase64, desKey);
 */
crypto.prototype.decryptDES = function (data, key) {
  const keyHex = CryptoJS.enc.Utf8.parse(key);
  const decrypted = CryptoJS.DES.decrypt(
    {
      ciphertext: CryptoJS.enc.Base64.parse(data),
    },
    keyHex,
    {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    }
  );
  return decrypted.toString(CryptoJS.enc.Utf8);
};
export default crypto;
