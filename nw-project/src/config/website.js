/*
 * @description: 描述信息
 * @Author: Cheng kaixuan
 * @Date: 2024-07-23 10:35:45
 * @LastEditors: Cheng kaixuan
 * @LastEditTime: 2024-08-08 15:45:59
 */
/**
 * 全局配置文件
 */
export default {
  title: "saber",
  logo: "S",
  key: "saber", //配置主键,目前用于存储
  indexTitle: "Saber Admin",
  clientId: "ushare_site", // 客户端id
  clientSecret: "thgy_ushare@2024", // 客户端密钥
  tenantMode: true, // 是否开启租户模式
  tenantId: "000000", // 管理组租户编号
  captchaMode: true, // 是否开启验证码模式
  switchMode: false, // 是否开启部门切换模式
  lockPage: "/lock",
  tokenTime: 3000,
  tokenHeader: "Blade-Auth",
  //http的status默认放行列表
  statusWhiteList: [],
  //配置首页不可关闭
  isFirstPage: false,
  fistPage: {
    label: "首页",
    value: "/portal/home",
    params: {},
    query: {},
    meta: {
      i18n: "dashboard",
    },
    group: [],
    close: false,
  },
  //配置菜单的属性
  menu: {
    iconDefault: "iconfont icon-caidan",
    props: {
      label: "name",
      path: "path",
      icon: "source",
      children: "children",
    },
  },
  // 第三方系统授权地址
  authUrl: "http://localhost/blade-auth/oauth/render",
  // 报表设计器地址(cloud端口为8108,boot端口为80)
  reportUrl: "http://localhost:8108/ureport",
  // 单点登录系统认证(blade-auth服务的地)
  ssoUrl:
    "http://localhost:8100/oauth/authorize?client_id=saber&response_type=code&redirect_uri=",
  // 单点登录回调地址(Saber服务的地址)
  redirectUri: "http://localhost:1888",
  // 查看接入流程pdf文件
  processUrl:
    "https://op.ushare.org.cn/oss/489113-th-file-data/upload/common/20240808/285be8b3b6dc897bcd9cdbb93b9efd95.pdf",
};
