<template>
  <div class="layerHeaderContainer" :class="{ 'bg': isChangeHeader }">
    <div class="headerWrap">
      <div class="logWarp" @click="gotoHomePage">
        <img :src="getFavicon()" />
        {{ getClientTitle() }}
      </div>
      <ul class="ulContainer">
        <li class="liContainer" :class="{ liHover: activeIndex == j, liActive: activeIndex == j }" v-for="(o, j) in navList" :key="j" @mouseover="onmouseover(o, j)" @click="gotoPage(o, j)">
          <template v-if="o.isPop">
            <el-popover placement="bottom" trigger="hover" popper-class="header-pop">
              <div class="header-pop-wrap">
                <div class="header-pop-item" v-for="popItem in o.popList" :key="popItem.id" @click="gotoPage(popItem, j)">{{ popItem.name }}</div>
              </div>
              <div slot="reference" class="headerTitleWrap" :class="{ selected: activeIndex == j }">
                {{ o.title }}
              </div>
            </el-popover>
          </template>
          <div v-else class="headerTitleWrap" :class="{ selected: activeIndex == j }">
            {{ o.title }}
          </div>
        </li>
      </ul>

      <div class="userWrap">
        <template v-if="getToken()">
          <img src="/img/pages/header/user.png" />
          <ul class="ulWrap">
            <li class="liWrap">
              <div class="title">
                <span :title="userName">{{ userName }}</span>
                <i class="el-icon-arrow-down el-icon--right"></i>
              </div>
              <div class="userInfoWrap">
                <div class="userItem" @click="gotoCenterPage(1)">数据管理</div>
                <div class="userItem" @click="gotoCenterPage(2)">算力管理</div>
                <div class="userItem" @click="gotoCenterPage(3)">模型管理</div>
                <div class="userItem" @click="gotoCenterPage(4)">交易积分</div>
                <div class="userItem" @click="gotoCenterPage(5)">基本信息</div>
                <div class="userItem loginOut" @click="logout">退出登录</div>
              </div>
            </li>
          </ul>
        </template>
        <template v-else>
          <router-link :to="{ path: '/login' }">
            <el-link :underline="false" class="userWrap-btn">登录</el-link>
          </router-link>
          <el-divider direction="vertical"></el-divider>
          <router-link :to="{ path: '/register' }">
            <el-link :underline="false" class="userWrap-btn">注册</el-link>
          </router-link>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import "animate.css"
import { mapGetters } from "vuex"
import { getToken } from "@/util/auth"
import { getClientTitle, getFavicon } from "@/config/theme"
import { resetRouter } from "@/router/router"
export default {
  data() {
    return {
      navList: [
        // { title: "首页", url: "/portal/home", routeName: "PortalHome" },
        // {
        //   title: "产业专区",
        //   key: "zone",
        //   isPop: true,
        //   popList: []
        // },
        // { title: "资源目录", url: "/portal/resourceCatalog", routeName: "ResourceCatalog" },
        // { title: "数据产品", url: "/portal/dataProduct", routeName: "DataProduct" },
        // {
        //   title: "数据产品服务",
        //   key: "service",
        //   isPop: true,
        //   popList: []
        // },
        // { title: "供需对接", url: "/portal/supplyDemand", routeName: "SupplyDemand" },
        // { title: "帮助中心", url: "/portal/helpCenter", routeName: "helpCenter" }
      ],
      activeIndex: 0,
      isChangeHeader: false
    }
  },
  computed: {
    ...mapGetters(["userInfo"]),
    userName() {
      return this.userInfo.id
    }
  },
  watch: {
    $route() {
      this.getActiveIndex()
    }
  },

  created() {
    this.getActiveIndex()
    this.init()
  },
  methods: {
    getToken,
    getClientTitle,
    getFavicon,
    init() {
      window.addEventListener("scroll", () => {
        var scrollDistance =
          window.pageYOffset || document.documentElement.scrollTop;
        if (scrollDistance >= 40) {
          this.isChangeHeader = true;
          let element = document.querySelector(".bg");
          element.style.setProperty("--before-height", "0.333333rem");
        } else {
          let element = document.querySelector(".bg");
          element.style.setProperty("--before-height", "0px");
          this.isChangeHeader = false;
        }
      });
    },
    gotoCenterPage(id) {
      // 要先清掉路由缓存
      Promise.all([this.$store.dispatch("DelAliveRoutes", "PortalCenter"), this.$store.dispatch("SetCenterActive", id)]).then(() => {
        this.$router.push(`/portal/center`)
      })
    },
    gotoHomePage() {
      this.$store.dispatch("DelAliveRoutes", "PortalHome").then(() => {
        this.$router.push("/portal/home")
      })
    },
    getActiveIndex() {
      if (window.location.pathname == "/portal/zoneDetail") {
        const index = this.navList.findIndex((item) => item.key == "zone")
        this.activeIndex = index
        return
      }
      this.activeIndex = this.navList.findIndex((o) => o.url == window.location.pathname) || 0
    },
    gotoPage(o, index) {
      if (o.isPop) {
        return
      }
      if (o.blank) {
        window.open(o.url)
      } else if (o.url) {
        this.activeIndex = index
        // 要先清掉路由缓存
        this.$store.dispatch("DelAliveRoutes", o.routeName).then(() => {
          this.$router.push(o.url)
        })
      }
    },
    onmouseover(item, i) {
      const array = document.getElementsByClassName("liContainer")
      for (let index = 0; index < array.length; index++) {
        if (i == index) {
          const element2 = array[index]
          element2.classList.add("liHover")
        }
      }
    },
    updateScroll() {
      // 设置页面滚动到顶部的过渡效果
      window.scrollTo({
        top: 0
      })
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
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/portal/header/pc.scss";
</style>
<style lang="scss">
@import "~@/styles/variables.scss";
.header-pop {
  min-width: 0 !important;
  padding: 0.083333rem /* 16/192 */ 0.041667rem /* 8/192 */;
}
.header-pop-wrap {
  .header-pop-item {
    padding: 0.052083rem /* 10/192 */ 0.041667rem /* 8/192 */;
    border-radius: 0.03125rem /* 6/192 */;
    text-align: left;
    font-size: 14px;
    color: #000000;
    cursor: pointer;
    &:hover {
      background: #deebff;
      color: $theme;
    }
  }
}
</style>
