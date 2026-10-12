<!--
 * @description: 描述信息
 * @Author: Cheng kaixuan
 * @Date: 2024-01-18 13:55:21
 * @LastEditors: why
 * @LastEditTime: 2025-01-13 16:23:16
-->
<template>
  <el-container class="layerContainer" id="layerContainer">
    
    <Header></Header>

    <el-main class="mainContainer" id="mainContainer">
      <keep-alive :include="aliveRoutes">
        <router-view></router-view>
      </keep-alive>

      <!-- <div class="footerContainer">
        <footerBar></footerBar>
      </div> -->
      
    </el-main>
  </el-container>
</template>

<script>
import {mapGetters} from "vuex";
import footerBar from "./components/footer/index.vue"
import Header from "./components/header/index.vue"
import routerView from "./components/routerView/index.vue"

export default {
  name: "Portal",
  components: { footerBar, routerView, Header },

  data() {
    return {
      isHomeScroll: false
    };
  },
  computed: {
    ...mapGetters(["aliveRoutes"]),
  },
  created() {
  },

  methods: {
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/common.scss";
@import "~@/styles/variables.scss";
@import "~@/styles/portal/index/pc.scss";
</style>