/*
 * @description: 描述信息
 * @Author: Cheng kaixuan
 * @Date: 2024-03-05 19:33:01
 * @LastEditors: Cheng kaixuan
 * @LastEditTime: 2024-05-17 11:35:01
 */
import { setStore, getStore } from "@/util/store";

const apply = {
  state: {
    dialogVisible: false,
    applayShow: false,
    showNavbarPhone: false,
    applyInfo: getStore({ name: "applyInfo" }) || {},
  },

  actions: {
    showDialog({ commit }) {
      commit("SET_SHOW_DIALOG");
    },
    hideDialog({ commit }) {
      commit("SET_HIDE_DIALOG");
    },
    showApplay({ commit }) {
      commit("SET_SHOW_APPLAY");
    },
    hideApplay({ commit }) {
      commit("SET_HIDE_APPLAY");
    },
    showNavbarPhone({ commit }) {
      commit("SET_SHOW_NAVBAR_PHONE");
    },
    hideNavbarPhone({ commit }) {
      commit("SET_HIDE_NAVBAR_PHONE");
    },
    setApplyInfo({ commit }, applyInfo) {
      commit("SET_APPLY_INFO", applyInfo);
    },
  },
  mutations: {
    SET_SHOW_DIALOG: (state) => {
      state.dialogVisible = true;
    },
    SET_HIDE_DIALOG: (state) => {
      state.dialogVisible = false;
    },
    SET_SHOW_APPLAY: (state) => {
      state.applayShow = true;
    },
    SET_HIDE_APPLAY: (state) => {
      state.applayShow = false;
    },
    SET_SHOW_NAVBAR_PHONE: (state) => {
      state.showNavbarPhone = true;
    },
    SET_HIDE_NAVBAR_PHONE: (state) => {
      state.showNavbarPhone = false;
    },
    SET_APPLY_INFO: (state, applyInfo) => {
      state.applyInfo = applyInfo;
      setStore({ name: "applyInfo", content: state.applyInfo });
    },
  },
};

export default apply;
