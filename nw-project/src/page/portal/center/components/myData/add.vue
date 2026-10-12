<!--
 * @Author: why
 * @Date: 2024-07-15 14:05:53
 * @LastEditors: why
 * @LastEditTime: 2025-03-11 10:18:35
 * @Description:
-->
<template>
  <Dialog :visible.sync="dialogVisible" :title="'发布数据'" width="750px" :defaultConfirmButton="false">
    <template #content>
      <el-steps :active="step" finish-status="success" :align-center="true">
        <el-step title="基本信息"></el-step>
        <el-step title="数据定价"></el-step>
      </el-steps>
      <div class="form-gap"></div>
      <el-form :model="form" :rules="rules" ref="formRef" size="small" label-position="top" label-width="auto">
        <template v-if="step == 0">
          <el-form-item label="数据名称" prop="name">
            <el-input v-model="form.name" placeholder="请输入" maxlength="20"></el-input>
          </el-form-item>
          <el-form-item label="数据类型" prop="data_type">
            <el-select v-model="form.data_type" placeholder="请选择" class="form-width">
              <el-option v-for="item in config.dataTypeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="应用场景" prop="application_scene">
            <el-select v-model="form.application_scene" placeholder="请选择" class="form-width">
              <el-option v-for="item in config.applicationSceneList" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="表名" prop="table_name">
            <el-input v-model="form.table_name" placeholder="请输入" maxlength="40"></el-input>
          </el-form-item>
          <el-form-item label="数据描述" prop="description">
            <el-input type="textarea" v-model="form.description" placeholder="请输入" maxlength="3000"></el-input>
          </el-form-item>
        </template>
        <template v-else-if="step == 1">
          <el-form-item label="竞价标底" prop="price">
            <el-input-number v-model="form.price" :controls="false" :min="1" class="form-number"></el-input-number>
            <span class="form-unit">积分</span>
          </el-form-item>
          <el-form-item label="竞价开始日期" prop="start">
            <el-date-picker v-model="form.start" type="date" value-format="timestamp" :picker-options="pickerOptionsStart" placeholder="请选择日期" class="form-width"></el-date-picker>
          </el-form-item>
          <el-form-item label="竞价截止日期" prop="end">
            <el-date-picker v-model="form.end" type="date" value-format="timestamp" :picker-options="pickerOptionsEnd" placeholder="请选择日期" class="form-width"></el-date-picker>
          </el-form-item>
        </template>
      </el-form>
    </template>
    <template #footer>
      <el-button v-show="step == 1" type="primary" size="small" @click="handleStepChange(0)">上一步</el-button>
      <el-button v-show="step == 1" type="primary" size="small" :loading="confirmLoading" @click="handleConfirm">确定</el-button>
      <el-button v-show="step == 0" type="primary" size="small" @click="handleStepChange(1)">下一步</el-button>
    </template>
  </Dialog>
</template>

<script>
import _ from "lodash"
import config from "@/config/variable"
import { publishEle } from "@/api/home"
export default {
  data() {
    return {
      config,
      dialogVisible: false,
      confirmLoading: false,
      step: 0,
      form: {
        name: "",
        application_scene: "",
        data_type: "",
        table_name: "",
        description: "",
        price: "",
        start: "",
        end: "",
      },
      rules: {
        name: [{ required: true, message: "请输入数据名称", trigger: "blur" }],
        application_scene: [{ required: true, message: "请选择应用场景", trigger: "change" }],
        data_type: [{ required: true, message: "请选择数据类型", trigger: "change" }],
        table_name: [{ required: true, message: "请输入表名", trigger: "blur" }],
        description: [{ required: true, message: "请输入数据描述", trigger: "blur" }],
        price: [{ required: true, message: "请输入竞价标底", trigger: "blur" }],
        start: [{ required: true, message: "请选择竞价开始日期", trigger: "change" }],
        end: [{ required: true, message: "请选择竞价截止日期", trigger: "change" }],
      },
      pickerOptionsStart: {
        disabledDate: (time) => {
          return time.getTime() < Date.now() - 24 * 60 * 60 * 1000 || (this.form.end && time.getTime() > this.form.end - 24 * 60 * 60 * 1000)
        }
      },
      pickerOptionsEnd: {
        disabledDate: (time) => {
          return time.getTime() < Date.now() || time.getTime() < this.form.start + 24 * 60 * 60 * 1000
        }
      }
    }
  },
  watch: {
    dialogVisible(val) {
      if (!val) {
        this.step = 0
        this.form = this.$options.data.call(this).form
      } else {
        this.$refs.formRef && this.$refs.formRef.clearValidate()
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
    handleStepChange(step) {
      if (step == 0) {
        this.$refs.formRef.clearValidate()
        this.step = step
        return
      }
      this.$refs.formRef.validate(async (valid) => {
        if (valid) {
          this.step = step
        }
      })
    },
    handleConfirm() {
      this.$refs.formRef.validate(async (valid) => {
        if (valid) {
          this.confirmLoading = true
          try {
            const info = {
              name: this.form.name,
              type: 0,
              application_scene: this.form.application_scene,
              data_type: this.form.data_type,
              table_name: this.form.table_name,
              description: this.form.description,
            }
            const obj = {
              price: this.form.price,
              start: this.form.start,
              end: this.form.end,
            }
            await publishEle(info, obj)
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

<style lang="scss" scoped>
.form-gap {
  height: .104167rem /* 20/192 */;
}
.form-unit {
  float: right;
}
.form-width {
  width: 100%;
}
.form-number {
  width: calc(100% - .208333rem /* 40/192 */);
}
::v-deep .el-input-number .el-input__inner {
  text-align: left;
}
</style>
