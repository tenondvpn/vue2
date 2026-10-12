<!--
 * @Author: zoujp
 * @Date: 2023-09-11 19:24:17
 * @LastEditTime: 2025-01-07 19:51:18
 * @LastEditors: why
 * @Description:
 * @FilePath: \TH-TiDavaSpace-Web\src\views\client\login\userLogin.vue
-->
<template>
  <el-form
    class="login-form"
    status-icon
    :rules="loginRules"
    ref="form"
    :model="form"
    label-width="0"
  >
    <el-form-item prop="username">
      <el-input
        size="small"
        @keyup.enter.native="handleLogin"
        v-model="form.username"
        auto-complete="off"
        placeholder="请输入统一社会信用代码"
      >
        <i slot="prefix" class="el-icon-user-solid" style="font-size: 16px" />
      </el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input
        size="small"
        @keyup.enter.native="handleLogin"
        :type="passwordType"
        v-model="form.password"
        auto-complete="off"
        :placeholder="$t('login.password')"
      >
        <i
          class="el-icon-view el-input__icon"
          slot="suffix"
          @click="showPassword"
        />
        <i slot="prefix" class="el-icon-lock" />
      </el-input>
    </el-form-item>
    <el-form-item v-if="captchaMode" prop="code">
      <div style="display: flex">
        <el-input
          size="small"
          @keyup.enter.native="handleLogin"
          v-model="form.code"
          auto-complete="off"
          :placeholder="$t('login.code')"
        >
          <i slot="prefix" class="icon-yanzhengma" />
        </el-input>
        <img :src="form.image" class="login-code-img" @click="refreshCode" />
      </div>
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
import { getCaptcha } from "@/api/user";
import { isValidUsci } from "@/util/validate";
import { getCaptchaMode } from "@/config/theme";
export default {
  name: "userLogin",
  props: {
    tenantId: String,
    redirectUrl: String,
    cryptoEnable: Boolean,
  },
  data() {
    return {
      form: {
        // 用户名
        username: "",
        // 密码
        password: "",
        // 账号类型
        type: "",
        // 验证码的值
        code: "",
        // 验证码的索引
        key: "",
        // 预加载白色背景
        image:
          "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
      },
      loginRules: {
        username: [
          {
            required: true,
            message: "请输入统一社会信用代码",
            trigger: "blur",
          },
          {
            validator: (rule, value, callback) => {
              if (isValidUsci(value)) {
                callback();
              } else {
                callback(new Error("信用代码格式不正确"));
              }
            },
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 1, message: "密码长度最少为6位", trigger: "blur" },
        ],
        code: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          {
            validator: (rule, value, callback) => {
              if (/^[a-zA-Z0-9]+$/g.test(value)) {
                callback();
              } else {
                callback(new Error("请输入英文字母或数字"));
              }
            },
            trigger: "blur",
          },
        ]
      },
      passwordType: "password",
    };
  },
  async created() {
    await this.refreshCode();
  },
  mounted() {},
  computed: {
    ...mapGetters(["tagWel"]),
    captchaMode() {
      return getCaptchaMode();
    },
  },
  methods: {
    /**
     * @description: 获取验证码
     * @return {*}
     */
    refreshCode() {
      getCaptcha().then((res) => {
        const data = res.data;
        this.form.key = data.key;
        this.form.image = data.image;
      });
    },
    /**
     * @description: 显示密码
     * @return {*}
     */
    showPassword() {
      this.passwordType === ""
        ? (this.passwordType = "password")
        : (this.passwordType = "");
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
      this.$router.push({ path: "/resetPassword", query: { isCompany: true } });
    },
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
            .dispatch("ClientLoginByUsername", {
              tenantId: this.tenantId,
              cryptoEnable: this.cryptoEnable,
              systemType: 3,
              ...this.form,
            })
            .then(async () => {
              this.$router.push({
                path: this.redirectUrl || this.tagWel.value,
              });
              loading.close();
            })
            .catch((err) => {
              console.log(err);
              loading.close();
              this.refreshCode();
            });
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.bottom-list {
  display: flex;
  justify-content: space-between;
  padding: 0 0.052083rem /* 10/192 */;
  width: 100%;
  box-sizing: border-box;
  ::v-deep .el-link {
    font-size: 0.0625rem /* 12/192 */;
    cursor: pointer;
  }
}
@media screen and (max-width: 992px) {
  .bottom-list {
    padding: 0;
    ::v-deep .el-link {
      font-size: 14px;
    }
  }
}
</style>
