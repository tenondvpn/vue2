import request from "@/router/axios";
import website from "@/config/website";
import { getCaptchaMode } from "@/config/theme";
import { objectToFormdata } from "@/util/util"

export const loginByUsername = (
  tenantId,
  deptId,
  roleId,
  username,
  password,
  type,
  key,
  code
) =>
  request({
    url: "/api/blade-auth/oauth/token",
    method: "post",
    headers: {
      "Tenant-Id": tenantId,
      "Dept-Id": website.switchMode ? deptId : "",
      "Role-Id": website.switchMode ? roleId : "",
      "Captcha-Key": key,
      "Captcha-Code": code,
    },
    params: {
      tenantId,
      username,
      password,
      grant_type: website.captchaMode ? "captcha" : "password",
      scope: "all",
      type,
    },
  });

export const clientLoginByUsername = (
  // tenantId,
  // username,
  private_key,
  // type,
  // key,
  // code,
  // systemType = 2
) => {
  const data = objectToFormdata({ private_key })
  return request({
    url: "/zjchain/get_owner_transactions/",
    method: "post",
    // headers: {
    //   "Tenant-Id": tenantId,
    //   "Captcha-Key": key,
    //   "Captcha-Code": code,
    //   "Content-Type": "application/x-www-form-urlencoded",
    //   "System-Type": systemType,
    // },
    // meta: { isSerialize: true },
    data
  });
}

//C端短信登录
export const clientLoginByPhone = (tenantId, phone, smsCode) =>
  request({
    url: "/api/blade-auth/oauth/token",
    method: "post",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "System-Type": 0,
    },
    meta: { isSerialize: true },
    data: {
      tenantId,
      smsCode,
      phone,
      grant_type: "smsCode",
      scope: "all",
    },
  });

export const loginBySocial = (tenantId, source, code, state) =>
  request({
    url: "/api/blade-auth/oauth/token",
    method: "post",
    headers: {
      "Tenant-Id": tenantId,
    },
    params: {
      tenantId,
      source,
      code,
      state,
      grant_type: "social",
      scope: "all",
    },
  });

export const loginBySso = (state, code) =>
  request({
    url: "/api/blade-auth/oauth/token",
    method: "post",
    headers: {
      "Tenant-Id": state,
    },
    params: {
      tenantId: state,
      code,
      grant_type: "authorization_code",
      scope: "all",
      redirect_uri: website.redirectUri,
    },
  });

export const refreshToken = (refresh_token, tenantId, systemType = 2) =>
  request({
    url: "/api/blade-auth/oauth/token",
    method: "post",
    headers: {
      "Tenant-Id": tenantId,
      "System-Type": systemType,
    },
    params: {
      tenantId,
      refresh_token,
      grant_type: "refresh_token",
      scope: "all",
    },
  });

export const registerGuest = (form, oauthId) =>
  request({
    url: "/api/blade-system/user/register-guest",
    method: "post",
    params: {
      tenantId: form.tenantId,
      name: form.name,
      account: form.account,
      password: form.password,
      oauthId,
    },
  });

export const sendSms = (data) =>
  request({
    url: "/api/blade-auth/user/sendMessage",
    method: "post",
    authorization: false,
    data,
  });

export const validateSms = (data) =>
  request({
    url: "/api/blade-auth/user/validateSmsCode",
    method: "post",
    authorization: false,
    data,
  });

export const clientRegisterByLegal = (data) =>
  request({
    url: "/api/thps-portal/web/user/register-legal",
    method: "post",
    authorization: false,
    data,
  });
export const clientRegisterByPersonal = (data) =>
  request({
    url: "/api/thps-portal/web/user/register-personal",
    method: "post",
    authorization: false,
    data,
  });
export const clientResetPassword = (data) =>
  request({
    url: "/api/blade-auth/user/resetPassword",
    method: "post",
    authorization: false,
    data,
  });

export const clientGetUserInfo = (params) =>
  request({
    url: "/api/thps-portal/web/user/detail",
    method: "get",
    params,
  });

export const getButtons = () =>
  request({
    url: "/api/blade-system/menu/buttons",
    method: "get",
  });

export const getCaptcha = () =>
  request({
    url: "/api/blade-auth/oauth/captcha",
    method: "get",
    authorization: false,
  });

export const logout = () =>
  request({
    url: "/api/blade-auth/oauth/logout",
    method: "get",
    authorization: false,
  });

export const getUserInfo = () =>
  request({
    url: "/api/blade-auth/oauth/user-info",
    method: "get",
  });

export const sendLogs = (list) =>
  request({
    url: "/api/blade-auth/oauth/logout",
    method: "post",
    data: list,
  });

export const clearCache = () =>
  request({
    url: "/api/blade-auth/oauth/clear-cache",
    method: "get",
    authorization: false,
  });

// 修改法人信息
export const updateLegalUserInfo = (form) =>
  request({
    url: "/api/thps-portal/web/user/updateLegalUserInfo",
    method: "post",
    data: form,
  });

// 修改个人信息
export const updatePersonalUserInfo = (form) =>
  request({
    url: "/api/thps-portal/web/user/updatePersonalUserInfo",
    method: "post",
    data: form,
  });

// 修改系统用户信息，用于修改用户手机号
export const updateBladeUserInfo = (form) =>
  request({
    url: "/api/blade-system/user/update",
    method: "post",
    data: form,
  });

// 用户登录日志
export const getUserLoginLog = (params) =>
  request({
    url: "/api/blade-system/loginLog/pageList",
    method: "get",
    params,
  });

// （法人）用户获取手机号（用于忘记密码手机号获取）
export const getUserPhone = (params) =>
  request({
    url: "/api/blade-system/user/getPhoneByAccount",
    method: "get",
    params,
  });
