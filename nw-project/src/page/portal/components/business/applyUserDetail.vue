<!--
 * @Author: why
 * @Date: 2024-12-14 15:26:36
 * @LastEditors: why
 * @LastEditTime: 2024-12-17 15:06:11
 * @Description: 申请人信息-详情
-->
<template>
  <div>
    <el-descriptions
      v-if="isShowUserInfo"
      :column="2"
      border
      class="custom-form-label"
      :label-style="{ width: labelWidth }"
      :content-style="{ width: contentWidth }"
    >
      <template #title>
        <div class="label">申请人信息</div>
      </template>
      <el-descriptions-item label="申请人">{{
        value.createUserName
      }}</el-descriptions-item>
      <el-descriptions-item label="单位名称">{{
        value.companyName
      }}</el-descriptions-item>
      <el-descriptions-item label="联系电话">{{
        value.phone
      }}</el-descriptions-item>
      <el-descriptions-item label="归属部门">{{
        value.deptName
      }}</el-descriptions-item>
      <el-descriptions-item label="申请时间">{{
        value.createTime
      }}</el-descriptions-item>
      <el-descriptions-item label="申请说明">{{
        value.applyDescription
      }}</el-descriptions-item>
    </el-descriptions>
    <el-descriptions
      :column="2"
      border
      class="custom-form-label"
      :label-style="{ width: labelWidth }"
    >
      <template #title>
        <div class="label">协议须知</div>
      </template>
      <el-descriptions-item
        v-for="pro in protocolList_show"
        :key="pro.code"
        label="已阅读并同意"
      >
        <span class="protocol" @click="viewProtocol(pro.code)"
          >《{{ pro.label }}》</span
        >
      </el-descriptions-item>
    </el-descriptions>
    <protocolDlg ref="protocolDlg"></protocolDlg>
  </div>
</template>

<script>
import protocolDlg from "@/page/portal/components/protocolDlg.vue"
import protocol from "./protocol";
export default {
  components: { protocolDlg },
  mixins: [protocol],
  props: {
    value: {
      type: Object,
      default: () => ({}),
    },
    labelWidth: {
      type: String,
      default: "auto",
    },
    contentWidth: {
      type: String,
      default: "auto",
    },
    isShowUserInfo: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.custom-form-label {
  margin-top: 20px;
}
</style>
