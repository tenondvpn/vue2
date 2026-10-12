/*
 * @Author: zoujp
 * @Date: 2024-07-12 17:48:06
 * @LastEditTime: 2024-07-18 13:44:32
 * @LastEditors: zoujp
 * @Description:
 * @FilePath: \THDataPortCloudWeb\src\api\system\dataField.js
 */
/*数据领域*/
import request from "@/router/axios"

export const getDataFieldPaged = (params) =>
  request({
    url: "/api/blade-system/dataField/pageList",
    method: "get",
    params
  })

export const getDataFieldList = (params) =>
  request({
    url: "/api/blade-system/dataField/list",
    method: "get",
    meta: { cancelRepeat: true },
    params
  })

export const addDataField = (data) =>
  request({
    url: "/api/blade-system/dataField/add",
    method: "post",
    data
  })

export const updateDataField = (data) =>
  request({
    url: "/api/blade-system/dataField/modify",
    method: "post",
    data
  })

export const removeDataField = (params) =>
  request({
    url: "/api/blade-system/dataField/remove",
    method: "get",
    params
  })
