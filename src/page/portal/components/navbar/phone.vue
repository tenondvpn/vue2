<template>
  <div class="portalNavbarPhone">
    <div class="navbarContainer">
      <div class="navbarContentLeft animate__animated animate__fadeIn">
          <div class="left-level" :class="menuIndex === i ? 'active': ''"  v-for="(item, i) in menu" @click="menuClick(item)" :key="i"><h3>{{ item.title }}</h3></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menu: [
        { title: "首页", url: "/portal/home" },
        { title: "场景征集", url: "/portal/scene" },
        { title: "数据目录", url: "/portal/dataSource" },
        { title: "数据产品", url: "/portal/productData" },
        { title: "运营专区", url: "/portal/zone" },
        // { title: "产品需求" },
        // { title: "联盟伙伴" },
        { title: "政策动态", url: "/portal/news" },
        { title: "意见反馈", url: "/portal/opinion" },
      ],
      menuIndex: null,
      selectedMenuData: {}
    };
  },
  async created() {
    this.init()
  },
  computed: {

  },
  methods: {
    init() {
      const pathname = window.location.pathname
      const index = this.menu.findIndex(o => pathname.startsWith(o.url)) || 0
      this.selectedMenuData = this.menu[index]
      this.menuIndex = index
    },

    menuClick(item) {
      if (item.url) {
        this.$router.push(item.url)
        this.$store.dispatch("hideNavbarPhone")
      }
    }
  }
 
}
</script>

<style lang="scss" scoped>
 .portalNavbarPhone{
    background-color: #fff;
    bottom: 0;
    left: 0;
    position: fixed;
    right: 0;
    top: 96px;
    z-index: 10;

    .navbarContainer{
      background-color: #fff;
      bottom: 0;
      box-sizing: border-box;
      overflow-y: auto;
      position: absolute;
      right: 0;
      top: 0;
      width: 100%;

      .navbarContentLeft{
        background: #fff;
        height: 100%;
        position: fixed;
        width: 100%;
        font-family: PingFangSC, PingFang SC;
        font-weight: 500;
        font-size: 16px;
        color: #000000;
        line-height: 22px;
        text-align: left;
        font-style: normal;

        .left-level{
          height: 50px;
          line-height: 50px;
          position: relative;
          border-bottom: 1px solid #CCD4E0;

          h3{
            text-indent: 14px;
            padding: 0px;
            margin: 0px;
          }
        }
        .active{
          color: #0074ff;
        }
        .active::before{
          opacity: 1;
        }
      }
    }
 }
</style>