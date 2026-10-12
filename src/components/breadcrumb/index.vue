<!--
 * @Author: why
 * @Date: 2024-01-12 09:21:26
 * @LastEditors: why
 * @LastEditTime: 2025-02-13 17:09:37
 * @Description: 
-->
<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item v-for="breadItem in pathList" :key="breadItem.path" :to="breadItem.fullPath">{{breadItem.meta.title}}</el-breadcrumb-item>
    <el-breadcrumb-item>{{currentTitle || $route.meta.title}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
import { mapGetters } from "vuex"
export default {
  props: {
    currentTitle: {
      type: String,
      default: ""
    }
  },
  computed: {
    ...mapGetters(["routerHistory"]),
  },
  data() {
    return {
      pathList: []
    };
  },
  created() {
    this.pathList = this.getParentPathFromHistory(this.$route.path)
  },
  methods: {
    breadcrumbPathList() {
      return this.getParentPathFromHistory(this.$route.path)
    },
    /**
     * @description: 从路由跳转历史中向上递归查找父级路由
     * @return {*}
     * @param {*} path
     */
    getParentPathFromHistory(path) {
      let res = []
      const current = this.routerHistory.find(item => item.to.path === path)
      if (current) {
        res.unshift(current.from)
        if (current.from.meta.breadLevel !== 1) {
          const parent = this.getParentPathFromHistory(current.from.path)
          if (parent) {
            res = [...parent, ...res]
          } 
        }
      }
      return res
    }
  }
}
</script>

<style lang="scss" scoped>
.el-breadcrumb {
  margin-bottom: .125rem /* 24/192 */;
}
</style>