/*
 * @Author: why
 * @Date: 2025-01-13 10:50:55
 * @LastEditors: why
 * @LastEditTime: 2025-03-11 15:07:37
 * @Description: 
 */
import request from "@/router/axios"
import { getStore } from "@/util/store";
import { strToHex, generateRandomHash, objectToFormdata } from "@/util/util"

// 发布数据、算力、模型
export const publishEle = (info, obj) => {
  const data = objectToFormdata({
    hash: strToHex(generateRandomHash()),
    private_key: getStore({ name: "token" }),
    info: strToHex(JSON.stringify(info)),
    ...obj
  })
  return request({
    url: "/zjchain/exchange_new_sell/",
    method: "post",
    data
  })
}

// 提交竞价数据、算力、模型
export const purchaseElePrice = (obj) => {
  const data = objectToFormdata({
    private_key: getStore({ name: "token" }),
    ...obj
  })
  return request({
    url: "/zjchain/exchange_purchase/",
    method: "post",
    data
  })
}

// 结束竞价数据、算力、模型
export const confirmElePrice = (obj) => {
  const data = objectToFormdata({
    private_key: getStore({ name: "token" }),
    ...obj
  })
  return request({
    url: "/zjchain/exchange_confirm/",
    method: "post",
    data
  })
}

// 获取数据、算力、模型分页
export const getElePage = (obj) => {
  const data = objectToFormdata({
    private_key: getStore({ name: "token" }),
    ...obj
  })
  return request({
    url: "/zjchain/exchange_sell_list/",
    method: "post",
    data
  })
}

// 获取数据、算力、模型详情
export const getEleDetail = (obj) => {
  const data = objectToFormdata({
    private_key: getStore({ name: "token" }),
    ...obj
  })
  return request({
    url: "/zjchain/exchange_sell_detail/",
    method: "post",
    data
  })
}