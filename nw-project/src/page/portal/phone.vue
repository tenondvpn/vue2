<!--
 * @description: 描述信息
 * @Author: Cheng kaixuan
 * @Date: 2024-05-11 11:09:23
 * @LastEditors: zoujp
 * @LastEditTime: 2025-01-03 09:51:36
-->
<template>
  <el-container class="layerContainer">
    <el-header class="layerHeaderContainer">
      <div class="headerContent">
        <div class="logContainer" @click="goPageHome" style="cursor: pointer">
          <el-image></el-image>
        </div>

        <div class="userContainer">
          <template v-if="getToken()">
            <ul class="ulWrap" @click="userClick">
              <li class="liWrap">
                <div class="title">{{ getUserName() }} <i class="el-icon-arrow-down el-icon--right"></i></div>
                <div class="userInfoWrap">
                  <div class="userItem" @click="gotoCenterPage">个人中心</div>
                  <div class="userItem loginOut" @click="logout">退出登录</div>
                </div>
              </li>
            </ul>
          </template>
          <div class="btn" v-else @click="onClick">登录/注册</div>
          <el-image class="menuImg" :class="showNavbarPhone ? 'closeImg' : ''" @click="navBarHandle"></el-image>
        </div>
      </div>
    </el-header>

    <el-main class="mainContainer" :style="{ width: getWidth }">
      <routerView></routerView>

      <div class="footerContainer" :style="{ width: getWidth }">
        <footerBar></footerBar>
      </div>
    </el-main>

    <template v-if="showNavbarPhone">
      <navbarPhone></navbarPhone>
    </template>
  </el-container>
</template>

<script>
import { getToken } from "@/util/auth"
import { mapGetters } from "vuex"
import navbarPhone from "./components/navbar/phone.vue"
import footerBar from "./components/footer/index.vue"
import routerView from "./components/routerView/index.vue"
import { resetRouter } from "@/router/router"
export default {
  components: { navbarPhone, footerBar, routerView },
  data() {
    return {
      num: -1,
      tag: true,
      form: {
        userName: "",
        phone: "",
        email: "",
        enterprise: "",
        message: "",
        policy: true
      },
      optionList: [
        { label: "企业用户选型", value: 1 },
        { label: "个人试用研究", value: 2 },
        { label: "其他（了解报价、方案）", value: 3 }
      ],
      loading: false,
      rules: {
        userName: [
          {
            required: true,
            message: "请输入姓名",
            trigger: "blur"
          }
        ],
        enterprise: [
          {
            required: true,
            message: "请输入公司名称",
            trigger: "blur"
          }
        ],
        application_type: [
          {
            required: true,
            message: "请选择试用需求",
            trigger: "change"
          }
        ],
        captcha: [
          {
            required: true,
            message: "请输入验证码",
            trigger: "blur"
          }
        ],
        phone: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          {
            pattern: /^1(3[0-9]|4[5-9]|5[0-35-9]|6[56]|7[0-8]|8[0-9]|9[89])\d{8}$/,
            message: "请输入正确的手机号码"
          }
        ]
        // email: [
        //   { required: true, message: "请输入邮箱", trigger: "blur" },
        //   {
        //     pattern: /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/,
        //     message: "请输入正确的邮箱",
        //   },
        // ],
      },
      getWidth: window.innerWidth + "px"
    }
  },
  computed: {
    ...mapGetters(["applayShow", "showNavbarPhone", "userInfo"])
  },
  created() {
    window.addEventListener("resize", () => {
      this.getWidth = window.innerWidth + "px"
    })

    console.log(this.showNavbarPhone)
  },
  methods: {
    userClick() {
      this.$store.dispatch("hideNavbarPhone")
    },
    getUserName() {
      if (this.userInfo.real_name) {
        return this.userInfo.real_name.length > 3 ? `${this.userInfo.real_name.slice(0, 3)}...` : this.userInfo.real_name
      }
      return ""
    },
    getToken,
    gotoCenterPage() {
      this.$router.push("/portal/center")
    },
    logout() {
      this.$confirm("确认退出系统登录？", "提示", {
        type: "warning"
      }).then(async () => {
        this.$store.dispatch("LogOut").then(() => {
          resetRouter()
          this.$router.push({ path: "/login" })
        })
      })
    },
    navBarHandle() {
      if (this.showNavbarPhone) {
        this.$store.dispatch("hideNavbarPhone")
      } else {
        this.$store.dispatch("showNavbarPhone")
      }
    },
    onClick() {
      this.$router.push("/login")
    },
    hide() {
      this.$store.dispatch("hideApplay")
    },
    goPageHome() {
      this.$store.dispatch("hideApplay")
      this.$router.push("/portal/home")
    },
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";
@import "~@/styles/portal/index/phone.scss";

.applyContainer {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  z-index: 10;
  position: fixed;
  top: 96px;
  left: 0px;
  right: 0px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: start;
  align-items: center;

  img {
    width: 17px;
    height: 17px;
    position: absolute;
    top: 0px;
    right: 28px;
  }

  .applyContent {
    width: 335px;
    height: 522px;
    margin-top: 30px;

    .applyTitle {
      font-family: PingFangSC, PingFang SC;
      font-weight: 500;
      font-size: 32px;
      color: #ffffff;
      line-height: 45px;
      text-align: center;
      font-style: normal;
    }

    .applySubtitle {
      font-family: PingFangSC, PingFang SC;
      font-weight: 400;
      font-size: 12px;
      color: #ffffff;
      line-height: 17px;
      text-align: center;
      font-style: normal;
      margin-top: 12px;
    }

    .formContainer {
      margin-top: 34px;
      display: flex;
      flex-flow: column nowrap;
      justify-content: start;
      align-items: center;

      .tooltip {
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 14px;
        color: #666666;
        line-height: 20px;
        text-align: center;
        font-style: normal;
        margin-top: 35px;

        span {
          color: #2967ff;
        }
      }
    }
  }
}

::v-deep .el-input-group__append {
  /* background-color: transparent;
    color: #909399;
    vertical-align: middle;
    display: table-cell;
    position: relative;
    border: 1px solid #DCDFE6;
    border-radius: 4px;
    padding: 0 20px;
    width: 1px;
    white-space: nowrap; */
  .appendContaienr {
    background: #ffffff;
    span {
      font-family: PingFangSC, PingFang SC;
      font-weight: 400;
      font-size: 14px;
      color: #2967ff;
      line-height: 20px;
      text-align: center;
      font-style: normal;
    }
  }
}

</style>
