<!--
 * @Author: why
 * @Date: 2025-02-06 14:42:05
 * @LastEditors: why
 * @LastEditTime: 2025-03-11 14:03:50
 * @Description: 
-->
<template>
  <div class="info-container">
    <module-title title="基本信息"></module-title>
    <el-descriptions :column="2" border :label-style="descStyle" :content-style="descStyle">
      <el-descriptions-item label="算力名称" :span="2">{{ eleInfo.name }}</el-descriptions-item>
      <el-descriptions-item label="GPU型号">{{ eleInfo.gpu_type }}</el-descriptions-item>
      <el-descriptions-item label="GPU数量">{{ eleInfo.gpu_count }}</el-descriptions-item>
      <el-descriptions-item label="数据盘">{{ eleInfo.storage_size }} G</el-descriptions-item>
      <el-descriptions-item label="表名">{{ eleInfo.table_name }} G</el-descriptions-item>
      <el-descriptions-item label="竞价开始日期">{{ dayjs(detail.start_time).format("YYYY-MM-DD") }} </el-descriptions-item>
      <el-descriptions-item label="竞价截止日期">{{ dayjs(detail.end_time).format("YYYY-MM-DD") }} </el-descriptions-item>
      <el-descriptions-item label="算力描述" :span="2">{{ eleInfo.description }}</el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script>
import { hexToStr } from "@/util/util"
import dayjs from 'dayjs'
export default {
  props: {
    detail: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    eleInfo() {
      return this.detail.info ? JSON.parse(hexToStr(this.detail.info)) : {}
    }
  },
  data() {
    return {
      descStyle: { 'width': '1.770833rem' },
    };
  },
  methods: {
    dayjs
  }
}
</script>

<style lang="scss" scoped>
.title-container {
  margin-top: .208333rem /* 40/192 */;
  &:first-child {
    margin-top: 0;
  }
}
</style>