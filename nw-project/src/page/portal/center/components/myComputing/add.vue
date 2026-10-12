<!--
 * @Author: why
 * @Date: 2024-07-15 14:05:53
 * @LastEditors: why
 * @LastEditTime: 2025-03-11 10:18:45
 * @Description:
-->
<template>
  <Dialog :visible.sync="dialogVisible" :title="'发布算力'" width="750px" top="8vh" :defaultConfirmButton="false">
    <template #content>
      <el-steps :active="step" finish-status="success" :align-center="true">
        <el-step title="基本信息"></el-step>
        <el-step title="算力定价"></el-step>
      </el-steps>
      <div class="form-gap"></div>
      <el-form :model="form" :rules="rules" ref="formRef" size="small" label-position="top" label-width="auto">
        <template v-if="step == 0">
          <el-form-item label="算力名称" prop="name">
            <el-input v-model="form.name" placeholder="请输入" maxlength="20"></el-input>
          </el-form-item>
          <el-form-item label="GPU型号" prop="gpu_type">
            <el-select v-model="form.gpu_type" placeholder="请选择" class="form-width">
              <el-option v-for="item in config.gpuTypeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="GPU数量" prop="gpu_count">
            <el-input-number v-model="form.gpu_count" :controls="false" :min="1" :max="50" class="form-width"></el-input-number>
          </el-form-item>
          <el-form-item label="数据盘" prop="storage_size">
            <el-input-number v-model="form.storage_size" :controls="false" :min="1" class="form-number"></el-input-number>
            <span class="form-unit">G</span>
          </el-form-item>
          <el-form-item label="表名" prop="table_name">
            <el-input v-model="form.table_name" placeholder="请输入" maxlength="40"></el-input>
          </el-form-item>
          <el-form-item label="算力描述" prop="description">
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
        gpu_type: "",
        gpu_count: "",
        storage_size: "",
        table_name: "",
        description: "",
        price: "",
        start: "",
        end: "",
      },
      rules: {
        name: [{ required: true, message: "请输入算力名称", trigger: "blur" }],
        gpu_type: [{ required: true, message: "请选择GPU型号", trigger: "change" }],
        gpu_count: [{ required: true, message: "请选择GPU数量", trigger: "change" }],
        storage_size: [{ required: true, message: "请输入数据盘", trigger: "blur" }],
        table_name: [{ required: true, message: "请输入表名", trigger: "blur" }],
        description: [{ required: true, message: "请输入算力描述", trigger: "blur" }],
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
      this.$refs.formRef.clearValidate()
      if (step == 0) {
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
              type: 2,
              gpu_type: this.form.gpu_type,
              gpu_count: this.form.gpu_count,
              storage_size: this.form.storage_size,
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
