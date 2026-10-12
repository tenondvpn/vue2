<template>
  <div class="page-container">
    <page-tab :tabs="itemList" v-model="activeIndex">
      <!-- 不同内容展示可结合lazyWrap组件实现tab切换的懒加载 -->
      <LazyWrap v-for="item in itemList" :key="item.id" :show="activeIndex == item.id" :lazy="initIndex != item.id">
        <component :is="item.component"></component>
      </LazyWrap>
    </page-tab>
  </div>
</template>

<script>
import pageTab from "@/page/portal/components/pageTab/index.vue";
import MyData from "./components/myData/index.vue";
import MyComputing from "./components/myComputing/index.vue";
import MyModel from "./components/myModel/index.vue";
import MyPoints from "./components/myPoints/index.vue";
import MyInfo from "./components/myInfo/index.vue";
import { mapGetters } from 'vuex';

export default {
  components: {
    pageTab,
    MyData,
    MyComputing,
    MyModel,
    MyPoints,
    MyInfo,
  },
  data() {
    return {
      activeIndex: 1,
      initIndex: 1,
      itemList: [
        {
          id: 1,
          icon: "/img/pages/center/icon_1.png",
          iconActive: "/img/pages/center/icon_1_active.png",
          name: "数据管理",
          component: "MyData"
        },
        {
          id: 2,
          icon: "/img/pages/center/icon_2.png",
          iconActive: "/img/pages/center/icon_2_active.png",
          name: "算力管理",
          component: "MyComputing"
        },
        {
          id: 3,
          icon: "/img/pages/center/icon_3.png",
          iconActive: "/img/pages/center/icon_3_active.png",
          name: "模型管理",
          component: "MyModel"
        },
        {
          id: 4,
          icon: "/img/pages/center/icon_4.png",
          iconActive: "/img/pages/center/icon_4_active.png",
          name: "交易积分",
          component: "MyPoints"
        },
        {
          id: 5,
          icon: "/img/pages/center/icon_5.png",
          iconActive: "/img/pages/center/icon_5_active.png",
          name: "基本信息",
          component: "MyInfo"
        },
      ],
    };
  },
  computed: {
    ...mapGetters(["centerActive"])
  },
  watch: {
    "centerActive": {
      handler(val) {
        this.activeIndex = val
      },
      immediate: true
    },
    activeIndex(val) {
      this.$store.dispatch("SetCenterActive", val)
    }
  },
  created() {
    this.initIndex = this.centerActive
  },
  methods: {
  },
};
</script>

<style lang="scss" scoped>
.page-container {
  padding: .541667rem /* 104/192 */ 0;
  min-height: 100vh;
  background: #E1E8FE;
  box-sizing: border-box;

  .contentWrap {
    display: flex;
    flex-flow: row nowrap;
    justify-content: start;
    margin-top: 0.28125rem /* 54/192 */;
    margin-left: 1.25rem /* 240/192 */;

    .leftWrap {
      width: 1.375rem /* 264/192 */;
      height: 3.739583rem /* 718/192 */;
      background: #ffffff;
      box-shadow: 0px 0.010417rem 0.041667rem 0px rgba(30, 84, 157, 0.1);
      border-radius: 0.03125rem /* 6/192 */;
      margin-right: 0.125rem /* 24/192 */;

      .headerTitle {
        height: 0.385417rem /* 74/192 */;
        line-height: 0.385417rem /* 74/192 */;
        font-family: PingFang-SC, PingFang-SC;
        font-weight: bold;
        font-size: 0.104167rem /* 20/192 */;
        color: #000000;
        text-align: left;
        font-style: normal;
        padding-left: 0.208333rem /* 40/192 */;
      }

      .itemsBox {
        width: 1.375rem /* 264/192 */;
        height: 0.302083rem /* 58/192 */;
        display: flex;
        flex-flow: row nowrap;
        justify-content: start;
        align-items: center;
        padding-left: 0.208333rem /* 40/192 */;
        box-sizing: border-box;
        cursor: pointer;

        img {
          width: 0.114583rem /* 22/192 */;
          height: 0.114583rem /* 22/192 */;
          margin-right: 0.072917rem /* 14/192 */;
        }

        .title {
          font-family: PingFangSC, PingFang SC;
          font-weight: 400;
          font-size: 0.09375rem /* 18/192 */;
          color: #000000;
          line-height: 0.130208rem /* 25/192 */;
          text-align: left;
          font-style: normal;
        }

        .activeTitle {
          color: #0074ff;
        }
      }

      .activeBox {
        width: 100%;
        height: 0.302083rem /* 58/192 */;
        background: linear-gradient(
          270deg,
          rgba(0, 116, 255, 0) 0%,
          rgba(0, 116, 255, 0.5) 100%
        );
        box-sizing: border-box;
        position: relative;
      }

      .activeBox::after {
        content: "";
        width: 0.020833rem /* 4/192 */;
        height: 0.302083rem /* 58/192 */;
        display: block;
        position: absolute;
        z-index: 2;
        left: 0px;
        background-color: #0074ff;
      }
    }

    .rightWrap {
      width: 6rem /* 1152/192 */;
      height: 3.739583rem /* 718/192 */;
      background: #ffffff;
      box-shadow: 0px 0.010417rem 0.041667rem 0px rgba(30, 84, 157, 0.1);
      border-radius: 0.03125rem /* 6/192 */;
      padding: 0.125rem 0.208333rem;
      box-sizing: border-box;
      position: relative;
      font-size: 14px;
      overflow-y: auto;
      overflow-x: hidden;
    }
  }
}
</style>
