/*
 * @Author: zoujp
 * @Date: 2022-08-26 11:38:19
 * @LastEditTime: 2024-12-26 15:49:01
 * @LastEditors: why
 * @Description: 设置页面keywords，description，logo等图片
 * @FilePath: \TH-TiDavaSpace-Web\src\config\theme.js
 */
const activeUser = window.CONFIG.activeUser

// 设置关键字
export const setKeyWords = () => {
  document.querySelector("meta[name='keywords']").setAttribute("content", window.CONFIG.users[activeUser].keywords)
}

// 设置描述
export const setDescription = () => {
  document.querySelector("meta[name='description']").setAttribute("content", window.CONFIG.users[activeUser].description)
}

// 设置favicon
export const setFavicon = () => {
  document.querySelector("link[rel*='icon']").setAttribute("href", `/img/config/${window.CONFIG["activeUser"]}/favicon.png`)
}

// 设置favicon
export const getFavicon = () => {
  return `/img/config/${window.CONFIG["activeUser"]}/favicon.png`
}

//登录页面左侧图片
export const loginLeftImg = () => {
  return `/img/config/${window.CONFIG["activeUser"]}/login-left.png`
}

// 登录页面logo
export const loginLogoImg = () => {
  return `/img/config/${window.CONFIG["activeUser"]}/th-logo-black.png`
}

// 咨询专家图片
export const wxCodeImg = () => {
  return `/img/config/${window.CONFIG["activeUser"]}/wx.jpg`
}

// 登录成功后的logo
export const indexLogoImg = () => {
  return `/img/config/${window.CONFIG["activeUser"]}/th-logo-white.png`
}

//获取存证查询logo
export const getChainLogo = () => {
  return `/img/config/${window.CONFIG["activeUser"]}/chain-logo.png`
}

//获取存证查询电子章
export const getChainSeal = () => {
  return `/img/config/${window.CONFIG["activeUser"]}/chain-seal.png`
}

//是否显示微信咨询专家
export const isShowWxCode = () => {
  return window.CONFIG.users[activeUser].isShowCode
}

// version
export const version = () => {
  return window.CONFIG.users[activeUser].version
}

// 天河链
export const chainText = () => {
  return window.CONFIG.users[activeUser].chain
}

// 登录类型 B（B端） 或 C（C端）
export const getLoginType = () => {
  return window.CONFIG.users[activeUser].loginType
}

// 首页菜单底部文字
export const menuBottomText = () => {
  return window.CONFIG.users[activeUser].menuBottom
}

// 是否显示左侧菜单底部logo
export const showBottomLogo = () => {
  return window.CONFIG.users[activeUser].showBottomLogo
}

// 是否显示跳转大屏按钮
export const isShowVisual = () => {
  return window.CONFIG.users[activeUser].showVisual
}

// 获取首页
export const getFirstPage = () => {
  return window.CONFIG.users[activeUser].firstPage
}

// 获取备案主标题
export const getCopyrightMain = () => {
  return window.CONFIG.users[activeUser].copyrightMain
}

// 获取备案副标题
export const getCopyrightSub = () => {
  return window.CONFIG.users[activeUser].copyrightSub
}

// 获取C端页面标题
export const getClientTitle = () => {
  return window.CONFIG.users[activeUser].clientTitle
}

// C端登录页面logo
export const clientLoginLogo = () => {
  return `/img/config/${window.CONFIG["activeUser"]}/client-login-logo.png`
}

// C端登录页面左侧图片
export const clientLoginLeftImg = () => {
  return `/img/config/${window.CONFIG["activeUser"]}/client-login-left.png`
}
// 获取备案副标题
export const getCaptchaMode = () => {
  return window.CONFIG.users[activeUser].captchaMode
}
// 获取页脚公司名称
export const getFooterCompany = () => {
  return window.CONFIG.users[activeUser].footerCompany
}
// 获取页脚公司地址
export const getFooterAddress = () => {
  return window.CONFIG.users[activeUser].footerAddress
}
// 获取页脚联系电话
export const getFooterTel = () => {
  return window.CONFIG.users[activeUser].footerTel
}
// 获取页脚邮箱地址
export const getFooterEmail = () => {
  return window.CONFIG.users[activeUser].footerEmail
}
// 获取首页悬浮公众号二维码
export const clientWechatImg = () => {
  return `/img/config/${window.CONFIG["activeUser"]}/qrcode_wx.jpeg`
}

// 顶部导航栏数据产品服务下拉列表
export const getServiceLink = () => {
  return window.CONFIG.users[activeUser].serviceLink
}

// 底部友情链接列表
export const getFriendshipLink = () => {
  return window.CONFIG.users[activeUser].friendshipLink
}
