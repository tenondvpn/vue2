/*
 * @Author: why
 * @Date: 2025-01-13 10:50:55
 * @LastEditors: why
 * @LastEditTime: 2025-03-11 15:21:42
 * @Description: 
 */
import PortalLayout from "@/page/portal/";
// import routerView from '@/page/portal/components/routerView'
import { isMobile } from "@/util/util";
import { MessageBox } from "element-ui";

export default [
  {
    path: "/",
    component: PortalLayout,
    redirect: "/portal",
    meta: {
      title: "首页",
    },
  },
  {
    path: "/portal",
    component: PortalLayout,
    redirect: "/portal/home",
    children: [
      {
        path: "home",
        name: "PortalHome",
        component: () =>
          import(/* webpackChunkName: "page" */ "@/page/portal/home"),
        meta: {
          title: "首页",
          isAuth: true,
          alive: true,
          breadLevel: 1 // 面包屑中的层级，只有一级页面需要配置此参数为1
        },
      },
      {
        path: "detail",
        name: "PortalDetail",
        component: () =>
          import(/* webpackChunkName: "page" */ "@/page/portal/detail"),
        meta: {
          title: "",
          isAuth: true,
          alive: false,
        },
      },
      {
        path: "center",
        name: "PortalCenter",
        component: () =>
          import(/* webpackChunkName: "page" */ "@/page/portal/center"),
        meta: {
          title: "个人中心",
          isAuth: true,
          alive: true,
          breadLevel: 1 // 面包屑中的层级，只有一级页面需要配置此参数为1
        },
        beforeEnter(to, from, next) {
          if (isMobile()) {
            next(false);
            MessageBox.alert(
              "为了您更好的使用体验，请前往电脑端进行访问。",
              "提示"
            );
          } else {
            next();
          }
        },
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import(
        /* webpackChunkName: "page-[index]" */ "@/page/portal/login/index.vue"
      ),
    meta: {
      title: "登录",
      keepAlive: false,
      isTab: false,
      isAuth: false,
    },
  },
  // {
  //   path: "/register",
  //   name: "register",
  //   component: () =>
  //     import(
  //       /* webpackChunkName: "page-[index]" */ "@/page/portal/register/index.vue"
  //     ),
  //   meta: {
  //     title: "用户注册",
  //     keepAlive: false,
  //     isTab: false,
  //     isAuth: false,
  //   },
  // },
  // {
  //   path: "/resetPassword",
  //   name: "resetPassword",
  //   component: () =>
  //     import(
  //       /* webpackChunkName: "page-[index]" */ "@/page/portal/resetPassword/index.vue"
  //     ),
  //   meta: {
  //     title: "忘记密码",
  //     keepAlive: false,
  //     isTab: false,
  //     isAuth: false,
  //   },
  // },
];
