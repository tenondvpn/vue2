<!--
 * @Author: zoujp
 * @Date: 2023-08-25 18:38:16
 * @LastEditTime: 2025-01-03 14:29:44
 * @LastEditors: zoujp
 * @Description: 重置密码
 * @FilePath: \THAuthorization-Services-Client\src\page\portal\resetPassword\index.vue
-->

<template>
  <div class="register-container-bg">
    <div class="register-container" :class="{ animated: !isDlg, bounceInDown: !isDlg }" ref="rc">
      <el-form class="login-form register-form" status-icon :rules="loginRules" ref="form" :model="form" label-width="0">
        <div class="title" v-if="!isDlg">重置密码</div>
        <el-form-item v-if="isCompany" prop="account">
          <el-input @keyup.enter.native="handleSubmit" @blur="getPhone" v-model="form.account" auto-complete="off" placeholder="请输入社会信用代码"></el-input>
        </el-form-item>
        <el-form-item prop="phone">
          <el-input @keyup.enter.native="handleSubmit" v-model="form.phone" :disabled="isCompany" auto-complete="off" placeholder="请输入手机号码">
            <i slot="prefix" class="el-icon-mobile-phone" />
          </el-input>
        </el-form-item>
        <el-form-item prop="smsCode">
          <div style="display: flex">
            <el-input @keyup.enter.native="handleSubmit" v-model="form.smsCode" auto-complete="off" placeholder="请输入短信验证码">
              <i slot="prefix" class="icon-yanzhengma" />
            </el-input>
            <el-button plain :disabled="isGetting" @click="getSmsCode">{{ isGetting ? "重新发送(" + second + ")" : "获取验证码" }}</el-button>
          </div>
          <!-- <el-row :span="24">
          <el-col :span="15">
          </el-col>
          <el-col :span="8" :offset="1">
            <div class="login-code">
            </div>
          </el-col>
        </el-row> -->
        </el-form-item>
        <el-form-item prop="firstPassword">
          <el-input @keyup.enter.native="handleSubmit" :type="passwordType" v-model="form.firstPassword" auto-complete="off" placeholder="请输入密码">
            <i class="el-icon-view el-input__icon" slot="suffix" @click="showPassword" />
            <i slot="prefix" class="el-icon-lock" />
          </el-input>
        </el-form-item>
        <el-form-item prop="secondPassword">
          <el-input @keyup.enter.native="handleSubmit" :type="repasswordType" v-model="form.secondPassword" auto-complete="off" placeholder="请确认密码">
            <i class="el-icon-view el-input__icon" slot="suffix" @click="showrePassword" />
            <i slot="prefix" class="el-icon-lock" />
          </el-input>
        </el-form-item>
        <el-form-item label-width="0" v-if="!isDlg">
          <el-button type="primary" @click.native.prevent="handleSubmit" class="login-submit">确 定</el-button>
        </el-form-item>
        <el-form-item label-width="0" v-if="!isDlg">
          <el-divider
            >已有账号? <router-link to="/login"><span class="router-link"> 立即登录</span></router-link></el-divider
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import { clientResetPassword, getUserPhone } from "@/api/user"
import { isMobile } from "@/util/validate"
import { getTopUrl } from "@/util/util"
import { info } from "@/api/system/tenant"
import { resetRouter } from "@/router/router"
import timer from "@/mixins/timer"
import md5 from "js-md5"
import crypto from "@/util/crypto"
import { isValidUsci } from "@/util/validate"

const cryptoObj = new crypto()
export default {
  components: {},
  props: {
    isDlg: {
      type: Boolean,
      default: false
    }
  },
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
      } else if (value !== this.form.firstPassword) {
        callback(new Error("两次输入密码不一致!"))
      } else {
        callback()
      }
    }
    return {
      checked: false,
      form: {
        // 手机号码
        phone: "",
        // 短信验证码
        smsCode: "",
        firstPassword: "",
        secondPassword: ""
      },
      loginRules: {
        account: [
          {
            required: true,
            message: "请输入统一社会信用代码",
            trigger: "blur"
          },
          {
            validator: (rule, value, callback) => {
              if (isValidUsci(value)) {
                callback()
              } else {
                callback(new Error("信用代码格式不正确"))
              }
            },
            trigger: "blur"
          }
        ],
        phone: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          {
            validator: (rule, value, callback) => {
              if (isMobile(value)) {
                callback()
              } else {
                callback(new Error("手机号码格式不正确"))
              }
            },
            trigger: "blur"
          }
        ],
        firstPassword: [{ validator: validatePass, trigger: "blur" }],
        secondPassword: [{ validator: validatePass2, trigger: "blur" }],
        smsCode: [{ required: true, message: "请输入短信验证码", trigger: "blur" }]
      },
      type: 2,
      passwordType: "password",
      repasswordType: "password",
      tenantId: "",
      isCompany: false
    }
  },
  mixins: [timer],
  computed: {
    ...mapGetters(["tagWel", "userInfo"]),
    needVerifyPhone() {
      return !this.isCompany
    }
  },
  async created() {
    await this.getTenant()
  },
  mounted() {
    if (this.$route.query.isCompany) {
      // 法人用户忘记密码
      this.isCompany = true
    } else if (this.isDlg && this.userInfo.systemType === 3) {
      // 法人用户个人中心重置密码
      this.isCompany = true
      this.form.account = this.userInfo.account
      this.$nextTick(() => {
        this.getPhone()
      })
    }
  },
  methods: {
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
    /**
     * @description: 登录
     * @return {*}
     */
    handleSubmit() {
      return new Promise((resolve, reject) => {
        this.$refs.form.validate(async (valid) => {
          if (valid) {
            if (!this.tenantId) {
              this.$message.warning("租户信息获取失败，请切换访问地址!")
              reject()
              return
            }
            const loading = this.$loading({
              lock: true,
              text: "重置中,请稍后...",
              spinner: "el-icon-loading"
            })
            try {
              const params = {
                tenantId: this.tenantId,
                account: this.userInfo.account,
                ...this.form
              }
              params.firstPassword = cryptoObj.encrypt(md5(params.firstPassword))
              params.secondPassword = params.firstPassword
              await clientResetPassword(params)
              this.$message.success("重置密码成功")
              loading.close()
              if (this.isDlg) {
                this.$store.dispatch("LogOut").then(() => {
                  resetRouter()
                  resolve()
                  this.$router.push({ path: "/login" })
                })
              } else {
                setTimeout(() => this.$router.push({ path: "/login" }), 500)
              }
            } catch (e) {
              loading.close()
              reject()
            }
          } else {
            reject()
          }
        })
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
    },
    getPhone() {
      this.$refs.form.validateField("account", (valid) => {
        if (!valid) {
          getUserPhone({ account: this.form.account }).then((res) => {
            if (res.data.success) {
              this.form.phone = res.data.data
            } else {
              this.$message.warning(res.data.message)
            }
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.register-container-bg {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  background-image: url("/img/pages/login/bg.png");
  background-size: 100% 100%;
  .register-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .register-form {
      width: 2.916667rem /* 560/192 */;
      padding: 0.104167rem /* 20/192 */ 0.520833rem /* 100/192 */;
      box-sizing: border-box;
      background-color: #fff;
      border-radius: 0.026042rem /* 5/192 */;
      box-shadow: 0px 12px 24px 0px rgba(30, 35, 65, 0.04);
      ::v-deep .el-input__inner {
        border: 0;
        border-bottom: 1px solid #eaedf2;
      }
      ::v-deep .el-form-item {
        margin-bottom: 0.114583rem /* 22/192 */;
      }
      .title {
        text-align: center;
        font-size: 0.104167rem /* 20/192 */;
        font-weight: 700;
        height: 0.3125rem /* 60/192 */;
        line-height: 0.3125rem /* 60/192 */;
        color: #303030;
        padding-bottom: 0.15625rem /* 30/192 */;
      }
      .login-submit {
        width: 100% !important;
      }
      .el-input {
        .el-input__prefix i {
          font-size: 0.09375rem /* 18/192 */ !important;
        }
      }
      ::v-deep .el-input--prefix .el-input__inner {
        padding-left: 0.208333rem /* 40/192 */;
      }
    }
  }
}
@media screen and (max-width: 992px) {
  .register-container-bg {
    .register-container {
      width: 100%;
      .register-form {
        width: 100%;
        padding: 20px;
        border-radius: 5px;
        background-color: transparent;
        box-shadow: none;
        ::v-deep .el-form-item {
          margin-bottom: 20px;
        }
        .title {
          font-size: 20px;
          height: 60px;
          line-height: 60px;
          padding-bottom: 30px;
        }
        .el-input {
          .el-input__prefix i {
            font-size: 18px !important;
          }
        }
        ::v-deep .el-input--prefix .el-input__inner {
          padding-left: 40px;
        }
      }
    }
  }
}
</style>
