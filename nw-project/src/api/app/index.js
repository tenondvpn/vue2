/*
 * @description: 描述信息
 * @Author: Cheng kaixuan
 * @Date: 2024-06-12 11:03:15
 * @LastEditors: why
 * @LastEditTime: 2024-07-22 09:45:28
 */
import request from "@/router/axios";

export const getAppList = (data) => {
  return request({
    url: "/api/blade-system/app/pageByCreateUser",
    method: "post",
    data
  });
};

export const getAppRelatedProduct = (data) => {
  return request({
    url: "/api/blade-system/app/pageForRelationProduct",
    method: "post",
    data
  });
};

export const getAppDetail = (params) => {
  return request({
    url: "/api/blade-system/app/detail",
    method: "get",
    params
  });
};

export const createApp = (data) => {
  return request({
    url: "/api/blade-system/app/add",
    method: "post",
    data
  });
};

export const modifyApp = (data) => {
  return request({
    url: "/api/blade-system/app/modifyByCreateUser",
    method: "post",
    data
  });
};

export const removeApp = (params) => {
  return request({
    url: "/api/blade-system/app/removeByCreateUser",
    method: "get",
    params
  });
};

export const resetAppSecret = (params) => {
  return request({
    url: "/api/blade-system/app/modifyAppSecret",
    method: "get",
    params
  });
};

