<!--
 * @description: 描述信息
 * @Author: Cheng kaixuan
 * @Date: 2024-01-18 13:55:21
 * @LastEditors: why
 * @LastEditTime: 2025-01-13 14:08:04
-->
<template>
    <div class="footerContent">
      <!-- <div class="footerWrap">
          <div class="title">联系我们</div>
          <div class="infoWrap">
            <div class="infoTitle">{{getFooterCompany()}}</div>
            <div class="infoTitle">地址: {{getFooterAddress()}}</div>
            <div class="infoTitle">电话: {{getFooterTel()}}</div>
            <div class="infoTitle">邮箱: {{getFooterEmail()}}</div>
          </div>
      </div> -->
      <!-- <div class="footer-title">友情链接</div> -->
      <!-- <div class="footer-link">
        <span v-for="(item, index) in links" :key="index">
          <template v-if="item.isPop">
            <el-popover
              placement="top"
              :width="150"
              trigger="hover"
            >
              <img :src="item.popImg" width="100%">
              <el-link slot="reference" :underline="false" class="link-item" target="_blank">{{item.name}}</el-link>
            </el-popover>
          </template>
          <el-link v-else :underline="false" class="link-item" target="_blank" :href="item.url">{{item.name}}</el-link>
          <el-divider v-if="index != links.length - 1" direction="vertical"></el-divider>
        </span>
      </div> -->
      <!-- <div class="copyright">
        <p>{{ getCopyrightMain() }}</p>
        <p>{{ getCopyrightSub() }}</p>
      </div> -->
    </div>
   
</template>

<script>
import { getFriendshipLink, getFooterCompany, getFooterAddress, getFooterTel, getFooterEmail, getCopyrightMain, getCopyrightSub } from "@/config/theme"

export default {
  name: "Footer",
  computed: {
    links() {
      return getFriendshipLink()
    }
  },
  methods: {
    getFriendshipLink,
    getFooterCompany,
    getFooterAddress,
    getFooterTel,
    getFooterEmail,
    getCopyrightMain,
    getCopyrightSub,
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";
@import "~@/styles/portal/footer/pc.scss";
</style>