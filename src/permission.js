/*
 * @Author: why
 * @Date: 2023-05-11 14:29:40
 * @LastEditors: why
 * @LastEditTime: 2025-02-17 11:15:52
 * @Description:
 */
/**
 * 全站权限配置
 *
 */
import router from "./router/router";
import store from "./store";
import { validatenull } from "@/util/validate";
import { getToken } from "@/util/auth";
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style
NProgress.configure({ showSpinner: false });
const lockPage = store.getters.website.lockPage; //锁屏页
router.beforeEach((to, from, next) => {
  const meta = to.meta || {};
  const isMenu = meta.menu === undefined ? to.query.menu : meta.menu;
  store.commit("SET_IS_MENU", isMenu === undefined);
  if (to.meta.alive) {
    // 门户路由缓存
    store.commit("SET_ALIVE_ROUTES", to.name);
  }
  if (from.path !== "/" && from.path !== "/login") {
    // 记录页面跳转，因为还要存储到localstorage里去，所以只能提取一些关键字段，不能全部存储，不然setStore里面转字符串会报错
    const keyArr = ["name", "path", "fullPath", "meta", "params", "query"];
    const commitObj = { from: {}, to: {} }
    keyArr.forEach(key => {
      commitObj.from[key] = from[key]
      commitObj.to[key] = to[key]
    })
    store.commit("UPDATE_ROUTER_HISTORY", commitObj)
  }
  if (getToken()) {
    if (store.getters.isLock && to.path !== lockPage) {
      //如果系统激活锁屏，全部跳转到锁屏页
      next({ path: lockPage });
    } else if (to.path === "/login") {
      //如果登录成功访问登录页跳转到主页
      next({ path: "/" });
    } else {
      //如果用户信息为空则获取用户信息，获取用户信息失败，跳转到登录页
      if (store.getters.token.length === 0) {
        store.dispatch("FedLogOut").then(() => {
          next({ path: "/login" });
        });
      } else {
        const value = to.query.src || to.fullPath;
        const label = to.query.name || to.name;
        const meta = to.meta || router.$avueRouter.meta || {};
        const i18n = to.query.i18n;
        if (to.query.target) {
          window.open(value);
        } else if (
          meta.isTab !== false &&
          !validatenull(value) &&
          !validatenull(label)
        ) {
          store.commit("ADD_TAG", {
            label: label,
            value: value,
            params: to.params,
            query: to.query,
            meta: (() => {
              if (!i18n) {
                return meta;
              }
              return {
                i18n: i18n,
              };
            })(),
            group: router.$avueRouter.group || [],
          });
        }
        next();
      }
    }
  } else {
    //判断是否需要认证，没有登录访问去登录页
    if (meta.isAuth === false) {
      next();
    } else {
      next({
        path: "/login",
        query: {
          redirectUrl: `${encodeURIComponent(to.fullPath)}`,
        },
      });
    }
  }
});

router.afterEach((to) => {
  NProgress.done();
  let title = to.meta.title;
  let i18n = store.getters.tag.meta.i18n;
  title = router.$avueRouter.generateTitle(title, i18n);
  //根据当前的标签也获取label的值动态设置浏览器标题
  router.$avueRouter.setTitle(title);
  store.dispatch("hideNavbarPhone");
  // 滚动条置顶
  setTimeout(() => {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, 0);
});
