import {
  setToken,
  setRefreshToken,
  removeToken,
  removeRefreshToken,
} from "@/util/auth";
import { Message } from "element-ui";
import { setStore, getStore } from "@/util/store";
import { isURL, validatenull } from "@/util/validate";
import { deepClone } from "@/util/util";
import website from "@/config/website";
import {
  loginByUsername,
  clientLoginByUsername,
  clientLoginByPhone,
  loginBySocial,
  loginBySso,
  getUserInfo,
  logout,
  refreshToken,
  getButtons,
} from "@/api/user";
import { getTopMenu, getRoutes } from "@/api/system/menu";
import md5 from "js-md5";
import crypto from "@/util/crypto";
const cryptoObj = new crypto();

function addPath(ele, first) {
  const menu = website.menu;
  const propsConfig = menu.props;
  const propsDefault = {
    label: propsConfig.label || "name",
    path: propsConfig.path || "path",
    icon: propsConfig.icon || "icon",
    children: propsConfig.children || "children",
  };
  const icon = ele[propsDefault.icon];
  ele[propsDefault.icon] = validatenull(icon) ? menu.iconDefault : icon;
  const isChild =
    ele[propsDefault.children] && ele[propsDefault.children].length !== 0;
  if (!isChild) ele[propsDefault.children] = [];
  if (!isChild && first && !isURL(ele[propsDefault.path])) {
    ele[propsDefault.path] = ele[propsDefault.path] + "/index";
  } else {
    ele[propsDefault.children].forEach((child) => {
      addPath(child);
    });
  }
}

const user = {
  state: {
    tenantId: getStore({ name: "tenantId" }) || "",
    userInfo: getStore({ name: "userInfo" }) || {},
    applyUserInfo: getStore({ name: "applyUserInfo" }) || {},
    clientUserInfo: getStore({ name: "clientUserInfo" }) || {},
    permission: getStore({ name: "permission" }) || {},
    roles: [],
    menuId: {},
    menu: getStore({ name: "menu" }) || [],
    menuAll: getStore({ name: "menuAll" }) || [],
    token: getStore({ name: "token" }) || "",
    refreshToken: getStore({ name: "refreshToken" }) || "",
  },
  actions: {
    //根据用户名登录
    LoginByUsername({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        loginByUsername(
          userInfo.tenantId,
          userInfo.deptId,
          userInfo.roleId,
          userInfo.username,
          md5(userInfo.password),
          userInfo.type,
          userInfo.key,
          userInfo.code
        )
          .then((res) => {
            const data = res.data;
            if (data.error_description) {
              Message({
                message: data.error_description,
                type: "error",
              });
            } else {
              commit("SET_TOKEN", data.access_token);
              commit("SET_REFRESH_TOKEN", data.refresh_token);
              commit("SET_TENANT_ID", data.tenant_id);
              commit("SET_USER_INFO", data);
              commit("DEL_ALL_TAG");
              commit("CLEAR_LOCK");
            }
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    //根据手机号登录
    LoginByPhone({ commit }, userInfo) {
      return new Promise((resolve) => {
        loginByUsername(userInfo.phone, userInfo.code).then((res) => {
          const data = res.data.data;
          commit("SET_TOKEN", data);
          commit("DEL_ALL_TAG");
          commit("CLEAR_LOCK");
          resolve();
        });
      });
    },
    //根据第三方信息登录
    LoginBySocial({ commit }, userInfo) {
      return new Promise((resolve) => {
        loginBySocial(
          userInfo.tenantId,
          userInfo.source,
          userInfo.code,
          userInfo.state
        ).then((res) => {
          const data = res.data;
          if (data.error_description) {
            Message({
              message: data.error_description,
              type: "error",
            });
          } else {
            commit("SET_TOKEN", data.access_token);
            commit("SET_REFRESH_TOKEN", data.refresh_token);
            commit("SET_USER_INFO", data);
            commit("SET_TENANT_ID", data.tenant_id);
            commit("DEL_ALL_TAG");
            commit("CLEAR_LOCK");
          }
          resolve();
        });
      });
    },
    // C端根据用户名登录
    ClientLoginByUsername({ commit, dispatch }, userInfo) {
      // let pass = cryptoObj.encrypt(md5(userInfo.password));
      // const cryptoEnable = userInfo.cryptoEnable || false;
      return new Promise((resolve, reject) => {
        clientLoginByUsername(
          // userInfo.tenantId,
          // userInfo.username,
          userInfo.password,
          // userInfo.type,
          // userInfo.key,
          // userInfo.code,
          // userInfo.systemType
        )
          .then(async (res) => {
            const data = res.data;
            // if (data.error_description) {
            //   Message({
            //     message: data.error_description,
            //     type: "warning",
            //   });
            // } else {
              // data.systemType = userInfo.systemType;
              commit("SET_TOKEN", userInfo.password);
              // commit("SET_REFRESH_TOKEN", data.refresh_token);
              // commit("SET_TENANT_ID", data.tenant_id);
              // commit("SET_CRYPTOENABLE", cryptoEnable);
              commit("SET_USER_INFO", { id: data.id });
              // commit("DEL_ALL_TAG");
              // commit("CLEAR_LOCK");
              // dispatch("GetButtons");
            // }
            resolve();
          })
          .catch(async (error) => {
            console.log(error);
            reject(error);
          });
      });
    },
    // C端根据短信登录
    ClientLoginByPhone({ commit, dispatch }, userInfo) {
      const cryptoEnable = userInfo.cryptoEnable || false;
      return new Promise((resolve, reject) => {
        clientLoginByPhone(userInfo.tenantId, userInfo.phone, userInfo.smsCode)
          .then(async (res) => {
            const data = res.data;
            if (data.error_description) {
              Message({ message: data.error_description, type: "warning" });
            } else {
              commit("SET_TOKEN", data.access_token);
              commit("SET_REFRESH_TOKEN", data.refresh_token);
              commit("SET_TENANT_ID", data.tenant_id);
              commit("SET_CRYPTOENABLE", cryptoEnable);
              commit("SET_USER_INFO", data);
              commit("DEL_ALL_TAG");
              commit("CLEAR_LOCK");
              dispatch("GetButtons");
            }
            resolve();
          })
          .catch(async (error) => {
            reject(error);
          });
      });
    },
    //根据单点信息登录
    LoginBySso({ commit }, userInfo) {
      return new Promise((resolve) => {
        loginBySso(userInfo.state, userInfo.code).then((res) => {
          const data = res.data;
          if (data.error_description) {
            Message({
              message: data.error_description,
              type: "error",
            });
          } else {
            commit("SET_TOKEN", data.access_token);
            commit("SET_REFRESH_TOKEN", data.refresh_token);
            commit("SET_USER_INFO", data);
            commit("SET_TENANT_ID", data.tenant_id);
            commit("DEL_ALL_TAG");
            commit("CLEAR_LOCK");
          }
          resolve();
        });
      });
    },
    //获取用户信息
    GetUserInfo({ commit }) {
      return new Promise((resolve, reject) => {
        getUserInfo()
          .then((res) => {
            const data = res.data.data;
            commit("SET_ROLES", data.roles);
            resolve(data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    //刷新token
    refreshToken({ state, commit }) {
      window.console.log("handle refresh token");
      return new Promise((resolve, reject) => {
        refreshToken(
          state.refreshToken,
          state.tenantId,
          state.userInfo.systemType
        )
          .then((res) => {
            const data = res.data;
            commit("SET_TOKEN", data.access_token);
            commit("SET_REFRESH_TOKEN", data.refresh_token);
            const userInfo = { ...user.state.userInfo };
            userInfo.expires_in = data.expires_in;
            commit("SET_USER_INFO", userInfo);
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    // 登出
    LogOut({ commit }) {
      return new Promise((resolve, reject) => {
        // logout()
        //   .then(() => {
            commit("SET_TOKEN", "");
            // commit("SET_MENU", []);
            // commit("SET_MENU_ALL_NULL", []);
            // commit("SET_ROLES", []);
            // commit("SET_TAG_LIST", []);
            // commit("DEL_ALL_TAG");
            // commit("CLEAR_LOCK");
            // commit("SET_PERMISSION", []);
            removeToken();
            removeRefreshToken();
            resolve();
          // })
          // .catch((error) => {
          //   reject(error);
          // });
      });
    },
    //注销session
    FedLogOut({ commit }) {
      return new Promise((resolve) => {
        commit("SET_TOKEN", "");
        commit("SET_MENU_ALL_NULL", []);
        commit("SET_MENU", []);
        commit("SET_ROLES", []);
        commit("SET_TAG_LIST", []);
        commit("DEL_ALL_TAG");
        commit("CLEAR_LOCK");
        commit("SET_PERMISSION", []);
        removeToken();
        removeRefreshToken();
        resolve();
      });
    },
    //获取顶部菜单
    GetTopMenu() {
      return new Promise((resolve) => {
        getTopMenu().then((res) => {
          const data = res.data.data || [];
          resolve(data);
        });
      });
    },
    //获取系统菜单
    GetMenu({ commit, dispatch }, topMenuId) {
      return new Promise((resolve) => {
        getRoutes(topMenuId).then((res) => {
          const data = res.data.data;
          let menu = deepClone(data);
          menu.forEach((ele) => {
            addPath(ele, true);
          });
          commit("SET_MENU_ALL", menu);
          commit("SET_MENU", menu);
          dispatch("GetButtons");
          resolve(menu);
        });
      });
    },
    //获取系统按钮
    GetButtons({ commit }) {
      return new Promise((resolve) => {
        getButtons().then((res) => {
          const data = res.data.data;
          commit("SET_PERMISSION", data);
          resolve();
        });
      });
    },
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      setToken(token);
      state.token = token;
      setStore({ name: "token", content: state.token });
    },
    SET_MENU_ID(state, menuId) {
      state.menuId = menuId;
    },
    SET_MENU_ALL: (state, menuAll) => {
      let menu = state.menuAll;
      menuAll.forEach((ele) => {
        if (
          !menu.find(
            (item) => item.label === ele.label && item.path === ele.path
          )
        ) {
          menu.push(ele);
        }
      });
      state.menuAll = menu;
      setStore({ name: "menuAll", content: state.menuAll });
    },
    SET_MENU_ALL_NULL: (state) => {
      state.menuAll = [];
      setStore({ name: "menuAll", content: state.menuAll });
    },
    SET_MENU: (state, menu) => {
      state.menu = menu;
      setStore({ name: "menu", content: state.menu });
    },
    SET_REFRESH_TOKEN: (state, refreshToken) => {
      setRefreshToken(refreshToken);
      state.refreshToken = refreshToken;
      setStore({ name: "refreshToken", content: state.refreshToken });
    },
    SET_TENANT_ID: (state, tenantId) => {
      state.tenantId = tenantId;
      setStore({ name: "tenantId", content: state.tenantId });
    },
    SET_USER_INFO: (state, userInfo) => {
      if (validatenull(userInfo.avatar)) {
        userInfo.avatar = "/img/bg/img-logo.png";
      }
      state.userInfo = userInfo;
      setStore({ name: "userInfo", content: state.userInfo });
    },
    SET_APPLY_USER_INFO: (state, info) => {
      state.applyUserInfo = info;
      setStore({ name: "applyUserInfo", content: state.applyUserInfo });
    },
    SET_CLIENT_USER_INFO: (state, info) => {
      state.clientUserInfo = info;
      setStore({ name: "clientUserInfo", content: state.clientUserInfo });
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles;
    },
    SET_PERMISSION: (state, permission) => {
      let result = [];

      function getCode(list) {
        list.forEach((ele) => {
          if (typeof ele === "object") {
            const chiildren = ele.children;
            const code = ele.code;
            if (chiildren) {
              getCode(chiildren);
            } else {
              result.push(code);
            }
          }
        });
      }

      getCode(permission);
      state.permission = {};
      result.forEach((ele) => {
        state.permission[ele] = true;
      });
      setStore({ name: "permission", content: state.permission });
    },
  },
};
export default user;
