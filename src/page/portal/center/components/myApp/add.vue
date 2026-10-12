<!--
 * @Author: why
 * @Date: 2024-07-15 14:05:53
 * @LastEditors: why
 * @LastEditTime: 2025-02-18 10:37:08
 * @Description:
-->
<template>
  <Dialog :visible.sync="dialogVisible" :title="form.id ? '编辑应用' : '添加应用'" width="500px" :confirmLoading="confirmLoading" @handleConfirm="handleConfirm">
    <template #content>
      <el-form :model="form" :rules="rules" ref="formRef" label-position="right" label-width="auto">
        <el-form-item label="应用名称" prop="appName">
          <el-input v-model="form.appName" placeholder="请填写应用名称"></el-input>
        </el-form-item>
        <el-form-item label="应用简介" prop="description">
          <el-input type="textarea" v-model="form.description" placeholder="请填写应用简介" maxlength="3000"></el-input>
        </el-form-item>
      </el-form>
    </template>
  </Dialog>
</template>

<script>
import { createApp } from "@/api/app"
export default {
  data() {
    return {
      dialogVisible: false,
      confirmLoading: false,
      form: {
        appName: "",
        description: ""
      },
      rules: {
        appName: [{ required: true, message: "请填写应用名称", trigger: "blur" }],
        description: [{ required: false, message: "请填写应用简介", trigger: "blur" }]
      }
    }
  },
  watch: {
    dialogVisible(val) {
      if (!val) {
        this.form = this.$options.data.call(this).form
        this.$refs.formRef.clearValidate()
      }
    }
  },
  methods: {
    open(data) {
      this.dialogVisible = true
      if (data) {
        this.form = Object.assign({}, this.form, data)
      }
    },
    handleConfirm() {
      this.$refs.formRef.validate(async (valid) => {
        if (valid) {
          this.confirmLoading = true
          try {
            await createApp(this.form)
            this.confirmLoading = false
            this.dialogVisible = false
            this.$message.success("操作成功")
            this.$emit("handleSuccess")
          } catch (error) {
            this.confirmLoading = false
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
