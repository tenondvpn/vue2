/*
 * @Author: zoujp
 * @Date: 2021-11-30 16:21:40
 * @LastEditTime: 2025-02-13 17:02:07
 * @LastEditors: why
 * @Description:
 * @FilePath: \THDataPortCloudWeb\src\plugins\th-components.js
 */
import Vue from "vue";
import Table from "@/components/table/index.vue";
import Pagination from "@/components/pagination/index.vue";
import FilterSearch from "@/components/filterSearch/index.vue";
import FilterSearchVertical from "@/components/filterSearchVertical/index.vue";
import Dialog from "@/components/dialog/index.vue";
import Upload from "@/components/upload/index.vue";
import ImageViewer from "@/components/imageViewer/index.vue";
import LazyWrap from "@/components/lazyWrap/index.vue";
import FileList from "@/components/fileList/index.vue";
import Breadcrumb from "@/components/breadcrumb/index.vue";
import ModuleTitle from "@/components/moduleTitle/index.vue"
/*eslint-disable*/
const Plugin = {
  install(Vue) {
    // 表格组件
    Vue.component("Table", Table);
    // 分页组件
    Vue.component("Pagination", Pagination);
    // 顶部统一搜索组件
    Vue.component("FilterSearch", FilterSearch);
    // 顶部统一搜索组件（垂直排列）
    Vue.component("FilterSearchVertical", FilterSearchVertical);
    // 弹窗组件
    Vue.component("Dialog", Dialog);
    // 文件上传组件
    Vue.component("Upload", Upload);
    // 图片预览组件
    Vue.component("ImageViewer", ImageViewer);
    // 懒加载组件
    Vue.component("LazyWrap", LazyWrap);
    // 文件列表组件
    Vue.component("FileList", FileList);
    // 面包屑组件
    Vue.component("Breadcrumb", Breadcrumb);
    // 标题组件
    Vue.component("ModuleTitle", ModuleTitle);
  }
};

Vue.use(Plugin);
