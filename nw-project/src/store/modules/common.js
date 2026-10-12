import {
  setStore,
  getStore,
  removeStore
} from '@/util/store'
import website from '@/config/website'

const common = {

  state: {
    language: getStore({name: 'language'}) || 'zh',
    isCollapse: false,
    isFullScren: false,
    isMenu: true,
    isShade: false,
    screen: -1,
    isLock: getStore({name: 'isLock'}) || false,
    showTag: true,
    showDebug: true,
    showCollapse: true,
    showSearch: true,
    showLock: true,
    showFullScren: true,
    showTheme: true,
    showMenu: true,
    showColor: true,
    colorName: getStore({name: 'colorName'}) || '#0074FF',
    themeName: getStore({name: 'themeName'}) || 'theme-default',
    lockPasswd: getStore({name: 'lockPasswd'}) || '',
    website: website,
    aliveRoutes: [],
    routerHistory: getStore({ name: "routerHistory" }) || [], // 客户端路由跳转历史记录,只记录从父级页面跳转子页面
    centerActive: getStore({name: 'centerActive'}) || 1
  },
  actions: {
    DelAliveRoutes({ commit }, name) {
      return new Promise((resolve) => {
        commit("DEL_ALIVE_ROUTES", name)
        resolve()
      })
    },
    SetCenterActive({ commit }, active) {
      return new Promise((resolve) => {
        commit("SET_CENTER_ACTIVE", active)
        resolve()
      })
    },
  },
  mutations: {
    SET_LANGUAGE: (state, language) => {
      state.language = language
      setStore({
        name: 'language',
        content: state.language
      })
    },
    SET_SHADE: (state, active) => {
      state.isShade = active;
    },
    SET_COLLAPSE: (state) => {
      state.isCollapse = !state.isCollapse;
    },
    SET_FULLSCREN: (state) => {
      state.isFullScren = !state.isFullScren;
    },
    SET_IS_MENU: (state, menu) => {
      state.isMenu = menu;
    },
    SET_LOCK: (state) => {
      state.isLock = true;
      setStore({
        name: 'isLock',
        content: state.isLock,
        type: 'session'
      })
    },
    SET_SCREEN: (state, screen) => {
      state.screen = screen;
    },
    SET_COLOR_NAME: (state, colorName) => {
      state.colorName = colorName;
      setStore({
        name: 'colorName',
        content: state.colorName,
      })
    },
    SET_THEME_NAME: (state, themeName) => {
      state.themeName = themeName;
      setStore({
        name: 'themeName',
        content: state.themeName,
      })
    },
    SET_LOCK_PASSWD: (state, lockPasswd) => {
      state.lockPasswd = lockPasswd;
      setStore({
        name: 'lockPasswd',
        content: state.lockPasswd,
        type: 'session'
      })
    },
    CLEAR_LOCK: (state) => {
      state.isLock = false;
      state.lockPasswd = '';
      removeStore({
        name: 'lockPasswd',
        type: 'session'
      });
      removeStore({
        name: 'isLock',
        type: 'session'
      });
    },
    SET_ALIVE_ROUTES: (state, name) => {
      if (!state.aliveRoutes.includes(name)) {
        state.aliveRoutes.push(name)
      }
    },
    DEL_ALIVE_ROUTES: (state, name) => {
      if (state.aliveRoutes.includes(name)) {
        const i = state.aliveRoutes.indexOf(name)
        state.aliveRoutes.splice(i, 1)
      }
    },
    UPDATE_ROUTER_HISTORY: (state, { from, to }) => {
      const toIndex = state.routerHistory.findIndex(item => item.to.path === to.path)
      if (to.meta.breadLevel === 1) {
        state.routerHistory = []
      } else if (toIndex > -1) {
        const sliceIndex = toIndex + 1
        state.routerHistory.splice(sliceIndex, state.routerHistory.length - sliceIndex)
      } else {
        state.routerHistory.push({ from, to })
      }
      setStore({
        name: "routerHistory",
        content: state.routerHistory
      })
    },
    SET_CENTER_ACTIVE: (state, active) => {
      state.centerActive = active
      setStore({ name: "centerActive", content: state.centerActive });
    }
  }
}
export default common
