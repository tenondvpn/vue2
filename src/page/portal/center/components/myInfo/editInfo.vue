<template>
  <Dialog :visible.sync="dialogVisible" title="编辑基础信息" width="700px" :confirmLoading="confirmLoading" @handleConfirm="handleConfirm">
    <template #content>
      <el-form class="register-form" :rules="rules" ref="form" :model="form" status-icon label-width="100px" label-position="right">
        <el-form-item v-if="form.type === 2" prop="legalPersonType" label="法人类型">
          <el-select v-model="form.legalPersonType" style="width: 100%">
            <el-option v-for="item in legalPersonTypeList" :key="item.valueKey" :label="item.label" :value="item.valueKey"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="form.type === 2" prop="enterpriseName" label="企业名称">
          <el-input v-model="form.enterpriseName" auto-complete="off" placeholder="请输入企业名称" />
        </el-form-item>
        <el-form-item v-if="form.type === 2" prop="enterpriseUsci" label="信用代码">
          <el-input v-model="form.enterpriseUsci" auto-complete="off" placeholder="请输入信用代码" />
        </el-form-item>
        <el-form-item prop="realName" :label="nameText">
          <el-input v-model="form.realName" auto-complete="off" :placeholder="`请输入${nameText}`"> </el-input>
        </el-form-item>
        <el-form-item prop="sex" label="性别">
          <el-radio-group v-model="form.sex">
            <el-radio v-for="sex in sexList" :label="sex.valueKey" :key="sex.valueKey">
              {{ sex.label }}
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="certificateType" label="证件类型">
          <el-select v-model="form.certificateType" placeholder="请选择证件类型" class="form-select" @change="certificateTypeChange">
            <el-option v-for="item in certificateTypeList" :key="item.valueKey" :label="item.value" :value="item.valueKey"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="certificateNumber" :label="certificateNumberText">
          <el-input v-model="form.certificateNumber" auto-complete="off" :placeholder="`请输入${certificateNumberText}`"> </el-input>
        </el-form-item>
        <el-form-item prop="certificateDuration" label="身份证期限" v-if="form.certificateType == 1">
          <div style="display: flex">
            <el-date-picker v-model="form.certificateStartDate" type="date" value-format="yyyy-MM-dd" placeholder="开始日期" @change="certificateDurationChange"> </el-date-picker>
            <span style="margin: 0 15px">至</span>
            <el-date-picker v-model="form.certificateEndDate" type="date" value-format="yyyy-MM-dd" disabled :placeholder="endPlaceholder"> </el-date-picker>
          </div>
          <el-radio-group v-model="form.certificateDuration" @change="certificateDurationChange">
            <el-radio label="5">5年</el-radio>
            <el-radio label="10">10年</el-radio>
            <el-radio label="20">20年</el-radio>
            <el-radio label="长期有效">长期有效</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </template>
  </Dialog>
</template>
<script>
import config from "@/config/variable"
import { isValidIdCard, isValidHMCard, isValidTwCard, isValidUsci } from "@/util/validate"
import { updateLegalUserInfo, updatePersonalUserInfo } from "@/api/user"

export default {
  data() {
    const idCardPeriodPass = (rule, value, callback) => {
      if (!this.form.certificateDuration) {
        callback(new Error("请选择身份证期限"))
      } else if (!this.form.certificateStartDate) {
        callback(new Error("请输入开始日期"))
      } else {
        callback()
      }
    }
    return {
      dialogVisible: false,
      confirmLoading: false,
      sexList: config.sexList,
      certificateTypeList: config.certificateTypeList,
      legalPersonTypeList: config.legalPersonTypeList,
      rules: {
        legalPersonType: [
          {
            required: true,
            message: "请选择法人类型",
            trigger: "change"
          }
        ],
        enterpriseName: [
          {
            required: true,
            message: "请输入企业名称",
            trigger: "blur"
          }
        ],
        enterpriseUsci: [
          { required: true, message: "请输入信用代码", trigger: "blur" },
          {
            validator: (rule, value, callback) => {
              if (!isValidUsci(value)) {
                callback(new Error("信用代码格式错误"))
              } else {
                callback()
              }
            },
            trigger: "blur"
          }
        ],
        realName: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (!value) {
                callback(new Error(`请输入${this.nameText}`))
              } else {
                callback()
              }
            },
            trigger: "blur"
          }
        ],
        sex: [
          {
            required: true,
            message: "请选择性别",
            trigger: "blur"
          }
        ],
        certificateType: [{ required: true, message: "请选择证件类型", trigger: "change" }],
        certificateNumber: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (!value) {
                callback(new Error(`请输入${this.certificateNumberText}`))
              } else if (this.form.certificateType == 1 && !isValidIdCard(value)) {
                callback(new Error("身份证号码格式错误"))
              } else if (this.form.certificateType == 2 && !isValidHMCard(value)) {
                callback(new Error("港澳通行证号码格式错误"))
              } else if (this.form.certificateType == 3 && !isValidTwCard(value)) {
                callback(new Error("台湾通行证号码格式错误"))
              } else {
                callback()
              }
            },
            trigger: "blur"
          }
        ],
        certificateDuration: [
          {
            required: true,
            validator: idCardPeriodPass,
            trigger: ["change", "blur"]
          }
        ]
      },
      form: {},
      endPlaceholder: "自动生成"
    }
  },
  computed: {
    certificateNumberText() {
      if (this.activeName == "user") {
        if (this.form.certificateType == 1) {
          return "身份证号码"
        } else if (this.form.certificateType == 2 || this.form.certificateType == 3) {
          return "通行证"
        } else if (this.form.certificateType == 4 || this.form.certificateType == 5) {
          return "居留身份证"
        }
      } else {
        return "法定身份证"
      }
    },
    nameText() {
      return this.form.type === 1 ? "姓名" : "法定代表人"
    }
  },
  methods: {
    open(form) {
      this.dialogVisible = true
      this.form = { ...form }
      console.log(this.form.type)
    },
    certificateDurationChange() {
      const value = this.form.certificateDuration
      if (value == "长期有效") {
        this.form.certificateEndDate = "长期有效"
        // this.endDisabled = true
        this.endPlaceholder = "长期有效"
      } else if (value) {
        this.form.certificateEndDate = ""
        // this.endDisabled = false
        this.endPlaceholder = "自动生成"
        if (this.form.certificateStartDate) {
          const startYear = new Date(this.form.certificateStartDate).getFullYear()
          const endYear = startYear + Number(value)
          this.form.certificateEndDate = endYear + this.form.certificateStartDate.substring(4, 10)
        }
      }
    },
    certificateTypeChange() {
      this.$refs.form.clearValidate(["certificateNumber", "certificateDuration", "nationality"])
      this.form.certificateNumber = ""
      this.form.certificateDuration = ""
      this.form.certificateStartDate = ""
      this.form.certificateEndDate = ""
      this.form.nationality = "CHN"
    },
    handleConfirm() {
      this.confirmLoading = true
      this.$refs.form.validate(async (isValid) => {
        if (isValid) {
          // 修改用户信息

          const params = {
            ...this.form
          }
          try {
            if (this.form.type === 1) {
              await updatePersonalUserInfo(params)
            } else {
              await updateLegalUserInfo(params)
            }
            this.$message.success("修改成功")
            this.dialogVisible = false
            this.$emit("close")
          } catch (error) {
            console.log(error)
          }
          this.confirmLoading = false
        } else {
          this.confirmLoading = false
        }
      })
    }
  }
}
</script>
