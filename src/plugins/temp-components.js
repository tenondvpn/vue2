/*
 * @Author: zoujp
 * @Date: 2021-11-30 16:21:40
 * @LastEditTime: 2024-04-17 14:39:24
 * @LastEditors: Cheng kaixuan
 * @Description: 表单引擎中的代码模板组件
 */
import Vue from "vue"
import performanceAdd from "@/views/platform/formDesigner/templateRender/custom/performanceAdd.vue"
import performanceDetail from "@/views/platform/formDesigner/templateRender/custom/performanceDetail.vue"
import delistItemEdit from "@/views/platform/formDesigner/templateRender/custom/delistItemEdit.vue"
import handleRecordAdd from "@/views/platform/formDesigner/templateRender/custom/handleRecordAdd.vue"
import handleRecordDetail from "@/views/platform/formDesigner/templateRender/custom/handleRecordDetail.vue"
// import productionStateEdit from "@/views/platform/formDesigner/templateRender/custom/productionStateEdit.vue"
import taxationAdd from "@/views/platform/formDesigner/templateRender/custom/taxationAdd.vue"
import annualTargetTasksAdd from "@/views/platform/formDesigner/templateRender/custom/annualTargetTasksAdd.vue"
import benefitAnalysis from "@/views/platform/formDesigner/templateRender/custom/benefitAnalysis.vue"

/*eslint-disable*/
const Plugin = {
  install(Vue) {
    // 签约项目-履约条款新增/编辑
    Vue.component("performanceAdd", performanceAdd)
    // 签约项目-履约条款详情
    Vue.component("performanceDetail", performanceDetail)
    // 摘牌项目-事项进展编辑
    Vue.component("delistItemEdit", delistItemEdit)
    // 事项办理记录新增/编辑
    Vue.component("handleRecordAdd", handleRecordAdd)
    // 事项办理记录详情
    Vue.component("handleRecordDetail", handleRecordDetail)
    // 投产情况编辑
    // Vue.component("productionStateEdit", productionStateEdit);
    // 投产项目-税收信息新增/编辑
    Vue.component("taxationAdd", taxationAdd)
    // 年度目标任务新增/编辑
    Vue.component("annualTargetTasksAdd", annualTargetTasksAdd)
    // 效益分析
    Vue.component("benefitAnalysis", benefitAnalysis)
  }
}

Vue.use(Plugin)
