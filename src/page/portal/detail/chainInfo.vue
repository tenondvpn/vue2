<!--
 * @Author: why
 * @Date: 2025-02-06 14:42:05
 * @LastEditors: why
 * @LastEditTime: 2025-03-11 11:10:31
 * @Description: 
-->
<template>
  <div class="info-container">
    <el-descriptions :column="2" border :label-style="descStyle" :content-style="descStyle">
      <el-descriptions-item label="存证类型">发布{{eleType.label}}存证</el-descriptions-item>
      <el-descriptions-item label="存证状态">成功</el-descriptions-item>
      <el-descriptions-item label="存证时间">{{ dayjs(detail.timestamp).format("YYYY-MM-DD HH:mm:ss") }}</el-descriptions-item>
      <el-descriptions-item label="区块高度">{{ detail.height }}</el-descriptions-item>
      <el-descriptions-item label="存证编号" :span="2">{{ detail.no }}</el-descriptions-item>
      <el-descriptions-item label="存证Hash" :span="2">{{ detail.hash }}</el-descriptions-item>
      <el-descriptions-item label="文件Hash" :span="2">{{ detail.hash }}</el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script>
import dayjs from 'dayjs';
export default {
  props: {
    detail: {
      type: Object,
      default: () => ({})
    },
    eleType: {
      type: Object,
      default: () => ({})
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
</style>