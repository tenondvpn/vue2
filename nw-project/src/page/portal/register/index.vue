<!--
 * @Author: zoujp
 * @Date: 2023-08-25 18:36:56
 * @LastEditTime: 2025-01-03 09:56:51
 * @LastEditors: why
 * @Description: 注册
 * @FilePath: \TH-TiDavaSpace-Web\src\views\client\register\index.vue
-->

<template>
<div class="register-container-bg">
  <div class="register-container animated bounceInDown" ref="rc">
    <el-tabs v-model="activeName" @tab-click="tabClick">
      <el-tab-pane label="个人注册" name="user"></el-tab-pane>
      <el-tab-pane label="法人注册" name="legalPerson"></el-tab-pane>
    </el-tabs>
    <el-form class="register-form" :rules="loginRules" ref="form" :model="form" status-icon :label-width="isPhone ? 'auto' : '0.666667rem'" :label-position="isPhone ? 'top' : 'right'">
      <el-form-item prop="legalPersonType" label="法人类型" v-if="activeName == 'legalPerson'">
        <el-select v-model="form.legalPersonType" placeholder="请选择法人类型" class="form-select">
          <el-option v-for="item in legalPersonTypeList" :key="item.valueKey" :label="item.value" :value="item.valueKey"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="enterpriseName" label="单位/企业名称" v-if="activeName == 'legalPerson'">
        <el-input v-model="form.enterpriseName" auto-complete="off" placeholder="请输入单位/企业名称">
        </el-input>
      </el-form-item>
      <el-form-item prop="enterpriseUsci" label="信用代码" v-if="activeName == 'legalPerson'">
        <el-input v-model="form.enterpriseUsci" auto-complete="off" placeholder="请输入信用代码">
        </el-input>
      </el-form-item>
      <el-form-item prop="certificateType" label="校验类别">
        <el-select v-model="form.certificateType" placeholder="请选择校验类别" class="form-select" @change="certificateTypeChange">
          <el-option v-for="item in certificateTypeList" :key="item.valueKey" :label="item.value" :value="item.valueKey"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="realName" :label="nameText">
        <el-input v-model="form.realName" auto-complete="off" :placeholder="`请输入${nameText}`">
        </el-input>
      </el-form-item>
      <el-form-item prop="certificateNumber" :label="certificateNumberText">
        <el-input v-model="form.certificateNumber" auto-complete="off" :placeholder="`请输入${certificateNumberText}`">
        </el-input>
      </el-form-item>
      <el-form-item prop="certificateDuration" label="身份证期限" v-if="form.certificateType == 1">
        <div style="display: flex;">
          <el-date-picker
            v-model="form.certificateStartDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="开始日期"
            @change="certificateDurationChange">
          </el-date-picker>
          <span style="margin: 0 15px">至</span>
          <el-date-picker
            v-model="form.certificateEndDate"
            type="date"
            value-format="yyyy-MM-dd"
            :disabled="endDisabled"
            :placeholder="endPlaceholder">
          </el-date-picker>
        </div>
        <el-radio-group v-model="form.certificateDuration" @change="certificateDurationChange">
          <el-radio label="5">5年</el-radio>
          <el-radio label="10">10年</el-radio>
          <el-radio label="20">20年</el-radio>
          <el-radio label="长期有效">长期有效</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item prop="nationality" label="国籍" v-if="form.certificateType != '1'">
        <el-select v-model="form.nationality" placeholder="请选择国籍" class="form-select" filterable>
          <el-option v-for="item in countryList" :key="item.value" :label="item.name" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="sex" label="性别">
        <el-radio-group v-model="form.sex">
          <el-radio v-for="item in sexList" :key="item.valueKey" :label="item.valueKey">{{item.label}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item prop="phone" label="手机号码">
        <el-input @keyup.enter.native="handleRegister" v-model="form.phone" auto-complete="off" placeholder="请输入手机号码">
          <!-- <i slot="prefix" class="el-icon-mobile-phone" /> -->
        </el-input>
      </el-form-item>
      <el-form-item prop="smsCode" label="短信验证码">
        <div style="display: flex">
          <el-input @keyup.enter.native="handleRegister" v-model="form.smsCode" auto-complete="off" placeholder="请输入短信验证码">
            <!-- <i slot="prefix" class="icon-yanzhengma" /> -->
            <!-- <el-button slot="append" :disabled="isGetting" @click="getSmsCode">{{ isGetting ? "重新发送(" + second + ")" : "获取验证码" }}</el-button> -->
          </el-input>
          <el-button plain :disabled="isGetting" @click="getSmsCode">{{ isGetting ? "重新发送(" + second + ")" : "获取验证码" }}</el-button>
        </div>
      </el-form-item>
      <el-form-item prop="password" label="密码">
        <el-input @keyup.enter.native="handleRegister" :type="passwordType" v-model="form.password" auto-complete="off" placeholder="请输入密码">
          <i class="el-icon-view el-input__icon" slot="suffix" @click="showPassword" />
          <!-- <i slot="prefix" class="el-icon-lock" /> -->
        </el-input>
      </el-form-item>
      <el-form-item prop="secondPassword" label="确认密码">
        <el-input @keyup.enter.native="handleRegister" :type="repasswordType" v-model="form.secondPassword" auto-complete="off" placeholder="请确认密码">
          <i class="el-icon-view el-input__icon" slot="suffix" @click="showrePassword" />
          <!-- <i slot="prefix" class="el-icon-lock" /> -->
        </el-input>
      </el-form-item>
      <!-- <el-form-item prop="captcha" class="code-cls">
        <el-row :span="24">
          <el-col :span="16">
            <el-input @keyup.enter.native="handleRegister" v-model="form.captcha" auto-complete="off" :placeholder="$t('login.code')">
              <i slot="prefix" class="icon-yanzhengma" />
            </el-input>
          </el-col>
          <el-col :span="8">
            <div class="login-code" style="height: 40px">
              <img :src="form.image" class="login-code-img" @click="refreshCode" />
            </div>
          </el-col>
        </el-row>
      </el-form-item> -->
      <el-form-item>
        <el-checkbox v-model="checked">已阅读并同意</el-checkbox>
        <el-link type="primary" :underline="false" @click="showProtocols">《用户注册协议》</el-link>
      </el-form-item>
      <el-form-item label-width="0">
        <el-button type="primary" @click.native.prevent="handleRegister" class="login-submit">注 册</el-button>
      </el-form-item>
      <el-form-item label-width="0">
        <el-divider>已有账号? <router-link to="/login"><span class="router-link"> 立即登录</span></router-link></el-divider>
      </el-form-item>
    </el-form>

    <protocolDlg ref="protocolDlg" :showBtn="true" @handleConfirm="checked = true"></protocolDlg>
  </div>
  <div class="register-copyright">
    <p>{{ getCopyrightMain() }}</p>
    <!-- <p>{{ getCopyrightSub() }}</p> -->
  </div>
</div>
</template>

<script>
import { mapGetters } from "vuex"
import { getCaptcha, clientRegisterByPersonal, clientRegisterByLegal, validateSms } from "@/api/user"
import { isMobile, isValidIdCard, isValidHMCard, isValidTwCard, isValidUsci } from "@/util/validate"
import { getTopUrl } from "@/util/util"
import { getCopyrightMain, getCopyrightSub } from "@/config/theme"
import countryList from "@/config/country"
import config from "@/config/variable"
import { info } from "@/api/system/tenant"
import timer from "@/mixins/timer"
import protocolDlg from "@/page/portal/components/protocolDlg.vue"
import md5 from "js-md5"
import crypto from "@/util/crypto"
const cryptoObj = new crypto()
export default {
  components: { protocolDlg },
  data() {
    const validatePass = (rule, value, callback) => {
      const reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/
      if (value === "") {
        callback(new Error("请输入密码"))
      } else if (!reg.test(value)) {
        callback(new Error("请输入包含大小写字母、数字8到16位密码"))
      } else {
        if (this.form.secondPassword !== "") {
          this.$refs.form.validateField("secondPassword")
        }
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请确认密码"))
      } else if (value !== this.form.password) {
        callback(new Error("两次输入密码不一致!"))
      } else {
        callback()
      }
    }
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
      activeName: 'user',
      checked: false,
      form: {
        legalPersonType: undefined,
        enterpriseName: "",
        enterpriseUsci: "",
        certificateType: 1,
        realName: "",
        certificateNumber: "",
        certificateDuration: "",
        certificateStartDate: "",
        certificateEndDate: "",
        nationality: "CHN",
        sex: 1,
        // 手机号码
        phone: "",
        // 短信验证码
        smsCode: "",
        password: "",
        secondPassword: "",
        // 验证码的值
        // captcha: "",
        // 验证码的索引
        // captchaKey: "",
        // 预加载白色背景
        // image: "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
      },
      loginRules: {
        legalPersonType: [{ required: true, message: "请选择法人类型", trigger: "change" }],
        enterpriseName: [{ required: true, message: "请输入单位/企业名称", trigger: "blur" }],
        enterpriseUsci: [
          { required: true, message: "请输入信用代码", trigger: "blur" },
          { 
            validator: (rule, value, callback) => {
              if (!isValidUsci(value)) {
                callback(new Error(`信用代码格式错误`))
              } else {
                callback()
              }
            }, 
            trigger: "blur" 
          }
        ],
        certificateType: [{ required: true, message: "请选择校验类别", trigger: "change" }],
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
        certificateNumber: [
          { 
            required: true, 
            validator: (rule, value, callback) => {
              if (!value) {
                callback(new Error(`请输入${this.certificateNumberText}`))
              } else if (this.form.certificateType == 1 && !isValidIdCard(value)) {
                callback(new Error(`身份证号码格式错误`))
              } else if (this.form.certificateType == 2 && !isValidHMCard(value)) {
                callback(new Error(`港澳通行证号码格式错误`))
              } else if (this.form.certificateType == 3 && !isValidTwCard(value)) {
                callback(new Error(`台湾通行证号码格式错误`))
              } else {
                callback()
              }
            }, 
            trigger: "blur" 
          }
        ],
        certificateDuration: [{ required: true, validator: idCardPeriodPass, trigger: ["change", "blur"]}],
        nationality: [{ required: true, message: "请选择国籍", trigger: "change" }],
        phone: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          { validator: (rule, value, callback) => {
              if (isMobile(value)) {
                callback()
              } else {
                callback(new Error("手机号码格式不正确"))
              }
            },
            trigger: "blur"
          }
        ],
        password: [{ required: true, validator: validatePass, trigger: "blur" }],
        secondPassword: [{ required: true, validator: validatePass2, trigger: "blur" }],
        smsCode: [{ required: true, message: "请输入短信验证码", trigger: "blur" }],
        captcha: [{ required: true, message: "请输入验证码", trigger: "blur" }]
      },
      type: 1,
      passwordType: "password",
      repasswordType: "password",
      tenantId: "",
      legalPersonTypeList: config.legalPersonTypeList,
      certificateTypeList: config.certificateTypeList,
      sexList: config.sexList,
      countryList,
      endDisabled: true,
      endPlaceholder: "自动生成"
    }
  },
  mixins: [timer],
  computed: {
    ...mapGetters(["tagWel"]),
    nameText() {
      return this.activeName == 'user' ? "姓名" : "法定代表人"
    },
    certificateNumberText() {
      if (this.form.certificateType == 1) {
        return this.activeName == 'user' ? '身份证号码' : '法定身份证'
      } else if (this.form.certificateType == 2 || this.form.certificateType == 3) {
        return '通行证'
      } else if (this.form.certificateType == 4 || this.form.certificateType == 5) {
        return '居留身份证'
      }
    },
  },
  async created() {
    await this.getTenant()
    // await this.refreshCode()
  },
  mounted() {},
  methods: {
    getCopyrightMain,
    getCopyrightSub,
    tabClick() {
      this.$refs.form.clearValidate(['realName', 'certificateNumber'])
    },
    /**
     * @description: 获取验证码
     * @return {*}
     */
    refreshCode() {
      getCaptcha().then((res) => {
        const data = res.data
        this.form.captchaKey = data.key
        this.form.image = data.image
      })
    },
    /**
     * @description: 显示密码
     * @return {*}
     */
    showPassword() {
      this.passwordType === "" ? (this.passwordType = "password") : (this.passwordType = "")
    },
    /**
     * @description: 显示确认密码
     * @return {*}
     */
    showrePassword() {
      this.repasswordType === "" ? (this.repasswordType = "password") : (this.repasswordType = "")
    },
    showProtocols() {
      this.$refs.protocolDlg.open("userRegistrationAgreement")
    },
    certificateTypeChange() {
      this.$refs.form.clearValidate(['certificateNumber', 'certificateDuration', 'nationality'])
      this.form.certificateNumber = ""
      this.form.certificateDuration = ""
      this.form.certificateStartDate = ""
      this.form.certificateEndDate = ""
      this.form.nationality = "CHN"
    },
    certificateDurationChange() {
      const value = this.form.certificateDuration
      if (value == '长期有效') {
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
    /**
     * @description: 登录
     * @return {*}
     */
    handleRegister() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          if (!this.tenantId) {
            this.$message.warning("租户信息获取失败，请切换访问地址!")
            return
          }
          if (!this.checked) {
            this.$message.warning("请阅读并同意用户注册协议")
            return
          }
          const loading = this.$loading({
            lock: true,
            text: "登录中,请稍后...",
            spinner: "el-icon-loading"
          })
          try {
            await validateSms({
              // 先验证短信验证码是否有效
              phone: this.form.phone,
              smsCode: this.form.smsCode,
              tenantId: this.tenantId
            })
            const params = {
              tenantId: this.tenantId,
              ...this.form
            }
            params.password = cryptoObj.encrypt(md5(params.password))
            params.secondPassword = params.password
            if (this.activeName == 'user') {
              await clientRegisterByPersonal(params)
            } else {
              await clientRegisterByLegal(params)
            }
            this.$message.success("注册成功")
            loading.close()
            setTimeout(() => this.$router.push({ path: "/login" }), 500)
          } catch (e) {
            loading.close()
            this.form.smsCode = ""
            this.clearTimer()
          }
        }
      })
    },
    getTenant() {
      const domain = getTopUrl()
      info(domain).then((res) => {
        const data = res.data
        if (data.success && data.data.tenantId) {
          this.tenantMode = false
          this.tenantId = data.data.tenantId
        } else {
          this.$message.warning("租户信息获取失败，请切换访问地址!")
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.register-container-bg {
  // display: flex;
  // justify-content: center;
  // align-items: center;
  // position: relative;
  width: 100%;
  height: 100vh;
  background-image: url("/img/pages/login/bg.png");
  background-size: 100% 100%;
  overflow: auto;
  .register-container {
    // display: flex;
    // justify-content: center;
    // align-items: center;
    // flex-direction: column;
    width: 3.125rem /* 600/192 */;
    margin: .208333rem /* 40/192 */ auto;
    ::v-deep .el-tabs__item {
      // text-align: center;
      font-size: .083333rem /* 16/192 */;
      font-weight: 700;
      height: .208333rem /* 40/192 */;
      line-height: .208333rem /* 40/192 */;
      // color: #303030;
      // padding-bottom: 15px;
    }
    .register-form {
      margin-top: .15625rem /* 30/192 */;
      box-sizing: border-box;
      // background-color: #fff;
      // border-radius: 5px;
      // box-shadow: 0px 12px 24px 0px rgba(30, 35, 65, 0.04);
      ::v-deep .el-input__inner {
        border: 0;
        border-bottom: 1px solid #eaedf2;
        background: transparent;
      }
      ::v-deep .el-form-item {
        margin-bottom: .104167rem /* 20/192 */;
      }
      
      ::v-deep .el-divider__text {
        background: #fbfbff;
      }
      .bottom {
        margin-bottom: .104167rem /* 20/192 */;
        .el-link {
          margin-top: -.010417rem /* 2/192 */;
        }
      }
      .code-cls {
        ::v-deep .el-col {
          margin-bottom: 0px;
        }
        ::v-deep .el-form-item__content {
          height: .208333rem /* 40/192 */;
        }
      }
      .login-submit {
        width: 100% !important;
      }
      .el-input {
        .el-input__prefix i {
          font-size: .09375rem /* 18/192 */ !important;
        }
      }
      // ::v-deep .el-input--prefix .el-input__inner {
      //   padding-left: 40px;
      // }
      .form-select {
        width: 100%;
      }
    }
  }
  .register-copyright {
    text-align: center;
    color: #909090;
    font-size: .072917rem /* 14/192 */;
    margin-bottom: .208333rem /* 40/192 */;
  }
}
@media screen and (max-width: 992px) {
  .register-container-bg {
    padding: 0 20px;
    box-sizing: border-box;
    .register-container {
      width:100%;
      margin: 40px auto;
      ::v-deep .el-tabs__item {
        // text-align: center;
        font-size: 16px;
        height: 40px;
        line-height: 40px;
      }
      .register-form {
        margin-top: 20px;
        ::v-deep .el-form-item {
          margin-bottom: 15px;
          .el-form-item__label {
            padding: 0;
          }
        }
        .bottom {
          margin-bottom: 20px;
          .el-link {
            margin-top: -2px;
          }
        }
        .code-cls {
          ::v-deep .el-form-item__content {
            height: 40px;
          }
        }
        .el-input {
          .el-input__prefix i {
            font-size: 18px;
          }
        }
        .login-submit {
          margin-top: 15px;
        }
      }
    }

    .register-copyright {
      width: 335px;
      font-size: 12px;
      margin: 0 auto 40px;
    }
  }
}
</style>
