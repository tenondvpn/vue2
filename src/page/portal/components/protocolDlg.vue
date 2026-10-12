<!--
 * @Author: why
 * @Date: 2023-08-23 10:19:33
 * @LastEditors: why
 * @LastEditTime: 2025-01-02 17:52:28
 * @Description: 申请准入-用户注册协议
-->
<template>
  <el-dialog v-draggable v-if="visible" :visible.sync="visible" :title="title" :width="'1000px'" center :append-to-body="true" :close-on-click-modal="false" :destroy-on-close="false">
    <div class="protocol-container editor-content-view" v-html="html" v-loading="htmlLoading"></div>
    <span slot="footer" class="dialog-footer" v-if="showBtn">
      <el-button type="primary" @click="confirm" size="small">我已阅读并同意协议</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getProtocolTempDetail } from "@/api/common"
export default {
  props: {
    showBtn: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      visible: false,
      code: "",
      title: "",
      html: "",
      htmlLoading: false
    }
  },
  watch: {
    visible(val) {
      if (!val) {
        Object.assign(this.$data, this.$options.data())
      }
    }
  },
  methods: {
    open(code) {
      this.code = code
      this.visible = true
      this.getProtocol()
    },
    confirm() {
      this.visible = false
      this.$emit("handleConfirm", this.code)
    },
    getProtocol() {
      if (!this.code) {
        return
      }
      this.htmlLoading = true
      getProtocolTempDetail({ templateCode: this.code }).then(res => {
        const data = res.data.data
        this.title = data.name
        this.html = data.content
        this.htmlLoading = false
      }).catch(() => {
        this.htmlLoading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.protocol-container {
  max-height: 500px;
  padding: 0 20px;
  box-sizing: border-box;
  overflow: auto;
}
</style>
