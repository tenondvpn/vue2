<template>
  <el-form
    class="login-form"
    status-icon
    :rules="loginRules"
    ref="form"
    :model="form"
    label-width="0"
  >
    <el-form-item prop="phone">
      <el-input
        size="small"
        @keyup.enter.native="handleLogin"
        v-model="form.phone"
        auto-complete="off"
        placeholder="请输入手机号码"
      >
        <i slot="prefix" class="el-icon-mobile-phone" style="font-size: 16px" />
      </el-input>
    </el-form-item>
    <el-form-item prop="smsCode">
      <el-row :span="24">
        <el-col :span="16">
          <el-input
            size="small"
            @keyup.enter.native="handleLogin"
            v-model="form.smsCode"
            auto-complete="off"
            :placeholder="$t('login.code')"
          >
            <i slot="prefix" class="icon-yanzhengma" />
          </el-input>
        </el-col>
        <el-col :span="8">
          <div class="login-code">
            <el-button
              plain
              size="small"
              :disabled="isGetting"
              @click="getSmsCode"
              >{{
                isGetting ? "重新发送(" + second + ")" : "获取验证码"
              }}</el-button
            >
          </div>
        </el-col>
      </el-row>
    </el-form-item>
    <el-form-item>
      <el-button
        type="primary"
        size="small"
        @click.native.prevent="handleLogin"
        class="login-submit"
        >{{ $t("login.submit") }}
      </el-button>
    </el-form-item>
    <div class="bottom-list">
      <el-link type="primary" :underline="false" @click="register"
        >立即注册</el-link
      >
      <el-link type="primary" :underline="false" @click="forget"
        >忘记密码</el-link
      >
    </div>
  </el-form>
</template>

<script>
import { mapGetters } from "vuex";
import timer from "@/mixins/timer";
import { isMobile } from "@/util/validate";
export default {
  name: "phoneLogin",
  props: {
    tenantId: String,
    redirectUrl: String,
    cryptoEnable: Boolean,
  },
  data() {
    return {
      form: {
        // 手机号码
        phone: "",
        // 短信验证码
        smsCode: "",
      },
      loginRules: {
        phone: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          {
            validator: (rule, value, callback) => {
              if (isMobile(value)) {
                callback();
              } else {
                callback(new Error("手机号码格式不正确"));
              }
            },
            trigger: "blur",
          },
        ],
        smsCode: [{ required: true, message: "请输入验证码", trigger: "blur" }],
      },
      type: 0,
    };
  },
  mixins: [timer],
  computed: {
    ...mapGetters(["tagWel"]),
  },
  methods: {
    /**
     * @description: 登录
     * @return {*}
     */
    handleLogin() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          if (!this.tenantId) {
            this.$message.warning("租户信息获取失败，请切换访问地址!");
            return;
          }
          const loading = this.$loading({
            lock: true,
            text: "登录中,请稍后...",
            spinner: "el-icon-loading",
          });
          this.$store
            .dispatch("ClientLoginByPhone", {
              tenantId: this.tenantId,
              cryptoEnable: this.cryptoEnable,
              ...this.form,
            })
            .then(async () => {
              this.$router.push({
                path: this.redirectUrl || this.tagWel.value,
              });
              loading.close();
            })
            .catch(() => {
              loading.close();
            });
        }
      });
    },
    /**
     * @description: 注册
     * @return {*}
     */
    register() {
      this.$router.push({ path: "/register" });
    },
    /**
     * @description: 忘记密码
     * @return {*}
     */
    forget() {
      this.$router.push({ path: "/resetPassword" });
    },
  },
};
</script>

<style lang="scss" scoped>
.bottom-list {
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
  width: 100%;
  box-sizing: border-box;
  ::v-deep .el-link {
    font-size: 12px;
    cursor: pointer;
  }
}
</style>
