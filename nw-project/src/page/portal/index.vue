<!--
 * @description: 骨架
 * @Author: Cheng kaixuan
 * @Date: 2024-03-05 19:33:01
 * @LastEditors: why
 * @LastEditTime: 2025-02-18 09:48:15
-->
<template>
  <component :is="getView"></component>
</template>

<script>
  import store from "@/store";
  import { validatenull } from "@/util/validate";
  import { calcDate } from "@/util/date.js";
  import { getStore } from "@/util/store.js";
  import { getToken } from "@/util/auth";
  import getUserInfo from "@/mixins/getUserInfo"
  import PCHome from './pc.vue'
  import PhoneHome from './phone.vue' 
  export default {
    components: {
      PCHome,
      PhoneHome
    },
    mixins: [getUserInfo],
    computed: {
      getView() {
        return this.isPhone ? 'PhoneHome' : 'PCHome'
      }
    },
    data() {
      return {
        //刷新token锁
        refreshLock: false,
        //刷新token的时间
        refreshTime: "",
      };
    },
    created() {
      // this.refreshToken()
      // this.getGlobalInfo()
    },
    beforeDestroy() {
      if (this.refreshTime) {
        clearInterval(this.refreshTime)
        this.refreshTime = null
      }
    },
    methods: {
      // 定时检测token
      refreshToken() {
        if (this.refreshTime) {
          clearInterval(this.refreshTime)
          this.refreshTime = null
        }
        // 未登录不检测
        if (!getToken()) {
          return
        }
        this.refreshTime = setInterval(() => {
          const tokenTime = Number(store.state.user.userInfo.expires_in) - 10;
          const token = getStore({ name: "token", debug: true }) || {};
          const date = calcDate(token.datetime, new Date().getTime());
          if (validatenull(date)) return;
          // if (date.seconds >= this.website.tokenTime && !this.refreshLock) {
          if (date.seconds >= tokenTime && !this.refreshLock) {
            this.refreshLock = true;
            this.$store
              .dispatch("refreshToken")
              .then(() => {
                this.refreshLock = false;
              })
              .catch(() => {
                this.refreshLock = false;
              });
          }
        }, 10000);
      },
      // 获取系统全局信息
      getGlobalInfo() {
        if (!getToken()) {
          return
        }
      }
    }
  }

</script>

<style lang="scss" scoped>

</style>