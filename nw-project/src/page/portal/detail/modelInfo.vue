<!--
 * @Author: why
 * @Date: 2025-02-06 14:42:05
 * @LastEditors: why
 * @LastEditTime: 2025-03-11 14:03:11
 * @Description: 
-->
<template>
  <div class="info-container">
    <el-descriptions :column="2" border :label-style="descStyle" :content-style="descStyle">
      <el-descriptions-item label="模型名称">{{ eleInfo.name }}</el-descriptions-item>
      <el-descriptions-item label="模型类型">{{ eleInfo.model_type }}</el-descriptions-item>
      <el-descriptions-item label="应用场景">{{ eleInfo.application_scene }}</el-descriptions-item>
      <el-descriptions-item label="表名">{{ eleInfo.table_name }} </el-descriptions-item>
      <el-descriptions-item label="竞价开始日期">{{ dayjs(detail.start_time).format("YYYY-MM-DD") }} </el-descriptions-item>
      <el-descriptions-item label="竞价截止日期">{{ dayjs(detail.end_time).format("YYYY-MM-DD") }} </el-descriptions-item>
      <el-descriptions-item label="模型描述" :span="2">{{ eleInfo.description }}</el-descriptions-item>
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