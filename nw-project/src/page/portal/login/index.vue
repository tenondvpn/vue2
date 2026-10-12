<!--
 * @Author: zoujp
 * @Date: 2023-08-25 17:21:59
 * @LastEditTime: 2025-03-03 10:22:13
 * @LastEditors: why
 * @Description: 客户端登录
 * @FilePath: \TH-TiDavaSpace-Web\src\views\client\login\index.vue
-->
<template>
  <div class="login-container" ref="login">
    <div class="login-weaper animated bounceInDown" style="position: relative">
      <div class="login-left">
        <img class="img" height="100%" :src="clientLoginLeftImg()" alt="" />
      </div>
      <div class="login-border">
        <div class="login-main">
          <router-link to="/portal/home">
            <div class="login-title-logo">
              <img src="/favicon.png" alt="login" />
              {{getClientTitle()}}
              <!-- <div class="login-version">{{ version() }}</div> -->
            </div>
          </router-link>
          <userLogin :tenantId="tenantId" :cryptoEnable="cryptoEnable" :redirectUrl="redirectUrl" />
          <!-- <el-tabs class="login-wrap" v-model="activeName">
            <el-tab-pane label="个人登录" name="user"><userLogin :tenantId="tenantId" :cryptoEnable="cryptoEnable" :redirectUrl="redirectUrl" /></el-tab-pane>
            <el-tab-pane label="法人登录" name="legalPerson"><legalPersonLogin :tenantId="tenantId" :cryptoEnable="cryptoEnable" :redirectUrl="redirectUrl" /></el-tab-pane>
          </el-tabs> -->
        </div>
      </div>
      <div class="login-copyright">
        <!-- <p>{{ getCopyrightMain() }}</p> -->
        <!-- <p>{{ getCopyrightSub() }}</p> -->
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex"
import userLogin from "./userLogin"
import legalPersonLogin from "./legalPersonLogin"
import phoneLogin from "./phoneLogin"
import { info } from "@/api/system/tenant"
import { getTopUrl } from "@/util/util"

import { clientLoginLeftImg, getClientTitle, version, getCopyrightMain, getCopyrightSub } from "@/config/theme"
export default {
  components: { userLogin, legalPersonLogin, phoneLogin },
  data() {
    return {
      activeName: "user",
      tenantId: "",
      cryptoEnable: "",
      redirectUrl: ""
    }
  },
  async created() {
    if (this.$route.query.redirectUrl) {
      this.redirectUrl = decodeURIComponent(this.$route.query.redirectUrl)
    }
    // await this.getTenant()
  },
  mounted() {},
  computed: {
    ...mapGetters(["website"]),
  },
  props: [],
  methods: {
    clientLoginLeftImg,
    getClientTitle,
    version,
    getCopyrightMain,
    getCopyrightSub,
    getTenant() {
      const domain = getTopUrl()
      info(domain).then((res) => {
        const data = res.data
        if (data.success && data.data.tenantId) {
          this.tenantMode = false
          this.tenantId = data.data.tenantId
          this.cryptoEnable = data.data.cryptoEnable
        } else {
          this.$message.warning("租户信息获取失败，请切换访问地址!")
        }
      })
    }
  }
}
</script>

<style lang="scss">
@import "~@/styles/login.scss";
@media screen and (max-width: 992px) {
  @import "~@/styles/loginPhone.scss";
}
</style>
<style lang="scss" scoped>
@import "~@/styles/variables.scss";
.login-wrap {
  height: calc(100% - .208333rem /* 40/192 */);
}
.login-copyright {
  position: absolute;
  left: 0px;
  bottom: -.520833rem /* 100/192 */;
  width: 5.208333rem /* 1000/192 */;
  p {
    @include flex-center;
    color: #909090;
    font-size: .072917rem /* 14/192 */;
  }
}
@media screen and (max-width: 992px) {
  .login-wrap {
    height: 40px;
  }
  .login-copyright {
    width: 335px;
    left: 50%;
    transform: translateX(-170px);
    bottom: calc(0px - ((100vh - 400px) / 2 - 20px));
    text-align: center;
    p {
      font-size: 12px;
    }
  }
  ::v-deep .el-tabs__item {
    font-size: 16px;
  }
}
</style>
