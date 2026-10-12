<!--
 * @Author: why
 * @Date: 2024-12-14 14:11:11
 * @LastEditors: why
 * @LastEditTime: 2025-01-03 09:48:58
 * @Description: 申请人信息-申请表单
-->
<template>
  <el-form ref="formRef" :model="form" :rules="rules" :label-width="labelWidth">
    <template v-if="isShowUserInfo">
      <el-form-item label="" prop="" class="custom-form-label">
        <template #label>
          <div class="label">申请人信息</div>
        </template>
      </el-form-item>
      <div class="flex-comm">
        <el-form-item label="申请人" prop="createUserName">
          <el-input v-model="form.createUserName" maxlength="20" placeholder="请输入" disabled></el-input>
        </el-form-item>
        <el-form-item label="单位名称" prop="companyName">
          <el-input v-model="form.companyName" maxlength="50" placeholder="请输入" disabled></el-input>
        </el-form-item>
      </div>
      <div class="flex-comm">
        <el-form-item label="联系电话" prop="phone">
          <el-input v-model="form.phone" maxlength="20" placeholder="请输入" disabled></el-input>
        </el-form-item>
        <el-form-item label="归属部门" prop="deptName">
          <el-input v-model="form.deptName" maxlength="50" placeholder="请输入" disabled></el-input>
        </el-form-item>
      </div>
    </template>
    <el-form-item label="" prop="" class="custom-form-label">
      <template #label>
        <div class="label">协议须知</div>
      </template>
    </el-form-item>
    <el-form-item label="" prop="protocolRead">
      <el-checkbox-group v-model="form.protocolRead">
        <span v-for="pro in protocolList_show" :key="pro.code">
          <el-checkbox :label="pro.code">已阅读</el-checkbox>
          <span class="protocol" @click.stop="viewProtocol(pro.code)">《{{ pro.label }}》</span>
        </span>
      </el-checkbox-group>
    </el-form-item>
    <protocolDlg ref="protocolDlg" :showBtn="true" @handleConfirm="protocolConfirm"></protocolDlg>
  </el-form>
</template>

<script>
import _ from "lodash"
import { mapGetters } from "vuex"
import protocol from "./protocol"
import protocolDlg from "@/page/portal/components/protocolDlg.vue"
export default {
  components: { protocolDlg },
  mixins: [protocol],
  props: {
    value: {
      type: Object,
      default: () => ({})
    },
    labelWidth: {
      type: String,
      default: "auto"
    },
    isShowUserInfo: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    value: {
      deep: true,
      immediate: true,
      handler() {
        this.initFormData()
      }
    }
  },
  computed: {
    ...mapGetters(["applyUserInfo"])
  },
  data() {
    return {
      initCount: 0,
      form: {
        createUserName: "",
        companyName: "",
        phone: "",
        deptName: "",
        protocolRead: []
      },
      rules: {
        createUserName: [{ required: true, message: "请输入申请人", trigger: "blur" }],
        companyName: [{ required: true, message: "请输入单位名称", trigger: "blur" }],
        phone: [{ required: true, message: "请输入联系电话", trigger: "blur" }],
        deptName: [{ required: true, message: "请输入归属部门", trigger: "blur" }],
        protocolRead: [
          {
            validator: (rule, value, callback) => {
              if (value.length < this.protocolList_show.length) {
                callback(new Error("请勾选协议须知"))
              } else {
                callback()
              }
            },
            trigger: "change"
          }
        ]
      },
    }
  },
  mounted() {
  },
  beforeDestroy() {},
  methods: {
    initFormData() {
      // 初始化最多执行2次
      if (this.initCount >= 2) {
        return
      }
      this.form = this.$options.data.call(this).form
      for (const key in this.form) {
        if (Object.prototype.hasOwnProperty.call(this.form, key) && this.value[key] != undefined) {
          this.form[key] = this.value[key]
        }
      }
      // 用户信息不做回显，从缓存关联显示（单位和部门后端暂未返回）
      this.form.createUserName = this.applyUserInfo.applyUserName
      this.form.phone = this.applyUserInfo.phone
      this.form.deptName = this.applyUserInfo.applyDept || ""
      this.form.companyName = this.applyUserInfo.enterpriseName || ""
      this.$refs.formRef && this.$refs.formRef.resetFields()
      // 执行次数记录
      this.initCount++
    },
    validate() {
      return new Promise((resolve, reject) => {
        this.$refs.formRef.validate((valid) => {
          if (valid) {
            resolve(this.form)
          } else {
            reject()
          }
        })
      })
    },
    protocolConfirm(code) {
      if (!this.form.protocolRead.includes(code)) {
        this.form.protocolRead.push(code)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-form-item {
  flex: 1;
}
.row-wrap {
  position: relative;
  .btn-download {
    position: absolute;
    top: 0;
    left: 110px;
  }
}
</style>
