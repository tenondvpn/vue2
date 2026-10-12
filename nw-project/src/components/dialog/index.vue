<!--
 * @Author: [why]
 * @Date: 2021-04-12 10:48:41
 * @LastEditors: why
 * @LastEditTime: 2025-02-13 15:24:23
 * @Description:
-->
<template>
  <el-dialog ref="eDialog" :title="title" :visible.sync="isShow" :close-on-click-modal="false" :close-on-press-escape="false" :append-to-body="true" v-bind="$attrs" v-on="$listeners">
    <!-- dialog content -->
    <slot name="content" />
    <div slot="footer">
      <el-button v-show="defaultCancelButton" :size="size" @click="handleCancel">{{ buttonSet.selfCancelButtonText || "取 消" }}</el-button>
      <el-button v-show="defaultConfirmButton" :size="size" type="primary" :loading="confirmLoading" @click="handleConfirm">{{ buttonSet.selfConfirmButtonText || "确 定" }}</el-button>
      <!-- dialog footer button -->
      <slot name="footer" />
    </div>
  </el-dialog>
</template>

<script>
// Auth：吴环宇 <br>
// Desc：基于el-dialog二次封装 <br>
// Demo：project/index.vue
export default {
  name: "th-dialog",
  props: {
    // 是否显示弹窗
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ""
    },
    // 是否显示取消按钮
    defaultCancelButton: {
      type: Boolean,
      default: true
    },
    // 是否显示确定按钮
    defaultConfirmButton: {
      type: Boolean,
      default: true
    },
    // 按钮文字 <br>
    // { <br>
    // selfCancelButtonText: '取消', <br>
    // selfConfirmButtonText: '确定', <br>
    // }
    buttonSet: {
      type: Object,
      default: () => ({})
    },
    // 用于控制确定控扭在提交表单的过程中处于禁用状态
    confirmLoading: {
      type: Boolean,
      default: false
    },
    // 表单控件的尺寸，有效值medium/small/mini
    size: {
      type: String,
      default: "small",
    },
  },
  computed: {
    isShow: {
      get() {
        return this.visible
      },
      set(val) {
        this.$emit("update:visible", val)
      }
    }
  },
  data() {
    return {}
  },
  methods: {
    handleCancel() {
      this.isShow = false
      // 当点击默认按钮"取消"时触发该事件
      this.$emit("handleCancel")
    },
    handleConfirm() {
      // 当点击默认按钮"确定"时触发
      this.$emit("handleConfirm")
    }
  }
}
</script>

<style></style>
