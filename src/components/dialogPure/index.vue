<!--
 * @Author: zoujp
 * @Date: 2022-05-23 09:45:21
 * @LastEditTime: 2024-06-11 13:59:56
 * @LastEditors: why
 * @Description:
 * @FilePath: \THDataPortCloudWeb\src\th-components\ModalPure\index.vue
-->
<template>
  <el-dialog
    :visible.sync="dialogVisible"
    append-to-body
    top="0"
    :close-on-click-modal="false"
    :show-close="true"
    :destroy-on-close="true"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot name="content"></slot>
  </el-dialog>
</template>

<script>
export default {
  name: "DialogPure",
  props: {
    // 弹窗显示隐藏
    visible: {
      type: Boolean,
      default: false
    },
    // 内容高度，浏览器视窗高度的百分比，取值范围0-1
    height: {
      type: Number,
      default: 0.8
    },
    // 内容宽度/高度的比例值
    widthRate: {
      type: Number,
      default: 0.7
    },
    // 内容背景
    background: {
      type: String,
      default: "#ffffff"
    }
  },
  data() {
    return {
    };
  },
  computed: {
    calcWidth() {
      const heightValue = window.innerHeight * this.height;
      return heightValue * this.widthRate + "px";
    },
    dialogVisible: {
      get() {
        return this.visible;
      },
      set(val) {
        this.$emit("update:visible", val);
      }
    }
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
::v-deep .el-dialog {
  top: 50%;
  transform: translateY(-50%);
}
::v-deep .el-dialog__header {
  padding: 0;
  border: none;
}
::v-deep .el-dialog__body {
  padding: 0;
}
::v-deep .el-dialog__headerbtn {
  top: .192708rem /* 37/192 */;
  right: .244792rem /* 47/192 */;
}
::v-deep .el-dialog__close {
  font-weight: bold;
  color: #000;
}
</style>
