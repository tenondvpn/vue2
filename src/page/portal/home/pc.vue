<!--
 * @Author: why
 * @Date: 2024-12-04 10:55:20
 * @LastEditors: why
 * @LastEditTime: 2025-03-11 15:45:25
 * @Description:
-->
<template>
  <div class="home-container">
    <div class="home-top">
      <div class="home-search">
        <el-input placeholder="请输入搜索内容" prefix-icon="el-icon-search" class="home-search-input" clearable v-model="keyword" @keyup.enter.native="handleSearch"></el-input>
        <el-button type="primary" class="home-search-btn" @click="handleSearch">搜索</el-button>
      </div>
      <div class="home-tab">
        <el-tabs v-model="currentType" @tab-click="tabChange">
          <el-tab-pane label="全部" name="-1"></el-tab-pane>
          <el-tab-pane v-for="tab in eleTypeList" :key="tab.valueKey" :label="tab.label" :name="String(tab.valueKey)"></el-tab-pane>
        </el-tabs>
        <FilterSearchVertical v-if="currentType == '-1' || currentType == '2'" ref="FilterSearchVertical" :option="filterOptions" label-width=".380208rem" @onSearch="handleSearch"></FilterSearchVertical>
      </div>
    </div>
    <div class="home-list" v-loading="loadingList">
      <div class="home-list-wrap" v-if="list.length">
        <item v-for="item in list" :key="item.id" :data="item"></item>
      </div>
      <el-empty v-else description="暂无数据"></el-empty>
      <pagination :total="total" :page-sizes="[16, 32, 48]" :pageSize.sync="queryForm.len" :pageNo.sync="queryForm.start_pos" :hidden="total > queryForm.len" @paginationChange="getList(true)"></pagination>
    </div>
  </div>
</template>

<script>
import config from "@/config/variable"
import item from "./components/item.vue"
import { getElePage } from "@/api/home"

export default {
  components: {
    item,
  },
  data() {
    return {
      keyword: "",
      eleTypeList: config.eleTypeList,
      filterOptions: [
        {
          name: "GPU型号",
          key: "gpu_type",
          type: "radio",
          childrens: [{ label: "全部", valueKey: "" }, ...config.gpuTypeList],
          modelValue: ""
        },
        {
          name: "GPU数量",
          key: "gpu_count",
          type: "radio",
          childrens: [{ label: "全部", valueKey: "" }, ...config.gpuCountList],
          modelValue: ""
        },
        {
          name: "数据盘",
          key: "storage_size",
          type: "radio",
          childrens: [{ label: "全部", valueKey: "" }, ...config.storageSizeList],
          modelValue: ""
        },
      ],
      currentType: "-1",
      queryForm: {
        owner: 0,
        start_pos: 1,
        len: 16,
      },
      total: 0,
      loadingList: false,
      list: []
    };
  },
  watch: {
  },
  created() {
    this.getList();
  },
  methods: {
    init() {
    },
    getList(scroll) {
      this.loadingList = true
      this.queryForm.type = this.currentType
      this.queryForm.search = this.keyword
      getElePage(this.queryForm).then(res => {
        this.loadingList = false
        this.list = res.data.data
        this.total = res.data.total
        if (scroll) {
          this.$nextTick(() => {
            document.documentElement.scrollTop = 0
            document.body.scrollTop = 0
          })
        }
      }).catch(() => {
        this.loadingList = false
      })
    },
    tabChange(tab) {
      this.$nextTick(() => {
        let filterObj = {}
        if (tab.name == '-1' || tab.name == '2') {
          filterObj = this.$refs.FilterSearchVertical.getCondition()
          filterObj = this.handleFilterParams(filterObj)
        }
        this.queryForm = Object.assign({ owner: this.queryForm.owner, len: this.queryForm.len }, { ...filterObj, start_pos: 1 })
        this.getList()
      })
    },
    handleSearch(filter) {
      const filterObj = this.handleFilterParams(filter)
      console.log(filterObj);
      this.queryForm = Object.assign({}, this.queryForm, { ...filterObj, start_pos: 1 })
      console.log(this.queryForm);
      this.getList()
    },
    handleFilterParams(filter) {
      const filterObj = {...filter}
      filterObj.gpu_count_min = filterObj.gpu_count ? filterObj.gpu_count.split("-")[0] : ""
      filterObj.gpu_count_max = filterObj.gpu_count ? filterObj.gpu_count.split("-")[1] : ""
      filterObj.storage_size_min = filterObj.storage_size ? filterObj.storage_size.split("-")[0] : ""
      filterObj.storage_size_max = filterObj.storage_size ? filterObj.storage_size.split("-")[1] : ""
      delete filterObj.gpu_count
      delete filterObj.storage_size
      return filterObj
    },
    goPage(name, path, query) {
      // 要先清掉路由缓存
      this.$store.dispatch("DelAliveRoutes", name).then(() => {
        this.$router.push({
          path,
          query,
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.animated {
  opacity: 0;
}
@import "~@/styles/portal/home/pc.scss";
</style>
