/*
 * @Author: why
 * @Date: 2024-07-11 16:49:52
 * @LastEditors: why
 * @LastEditTime: 2025-01-02 15:47:46
 * @Description: 
 */
import request from "@/router/axios";

/**
 * 文件流返回
 * @param url 接口地址
 * @param params 接口参数
 */
export const exportBlob = (url, params) => {
  return request({
    url: url,
    params: params,
    method: 'get',
    responseType: 'blob'
  })
}

// 文件下载
export const fileDownload = (data, responseType) =>
  request({
    url: "/api/thdata-platform/upload/download",
    method: "post",
    data,
    responseType
  });

  // 获取协议模板详情
  export const getProtocolTempDetail = (params) =>
    request({
      url: "/api/thps-portal/template-web/detail",
      method: "get",
      params
    })

  // 获取数据领域
export const getDataFieldList = (params) =>
  request({
    url: "/api/blade-system/dataField/list",
    method: "get",
    params
  })

// 获取全文搜索分页数据
export const getSearchPage = (params) =>
  request({
    url: "/api/thps-portal/web/home/searchPage",
    method: "get",
    params
  })

// 获取全文搜索数量
export const getSearchCount = (params) =>
  request({
    url: "/api/thps-portal/web/home/searchCount",
    method: "get",
    params
  })