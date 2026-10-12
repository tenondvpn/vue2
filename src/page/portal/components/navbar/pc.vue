<template>
  <div class="menuContainer">
    <ul class="ulWrap">
      <li v-for="item in menu" :key="item.name" @mouseover="onmouseover($event, item)" @mouseleave="onmouseleave($event, item)"  @click="gotoPage(item)">
        {{ item.meta.title }}
        <i v-if="item.meta.isDownIcon" class="el-submenu__icon-arrow el-icon-arrow-down"></i>
      </li>
    </ul>
    <template v-if="showHover">
          <div class="headerDropdown" @mousemove.stop="onmousemove($event)" @mouseout="onmouseout($event)">
            <template v-if="hoverData.path === `productCenter`">
              <div class="headerHover">
                <div v-for="(k, i) in menuList" :key="i">
                  <div class="headerTheme">
                    <img :src="menuImgList[i]">
                    <span class="themeTitle">{{ k.name }}</span>
                    <div class="line"></div>
                  </div>

                  <div class="headerContent">
                    <div v-for="(o, j) in k.children" :key="j" @click.stop="gotoPageDetail(o)">
                      <div :class="o.jump_url ? 'highlight' :'' ">{{ o.name }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </template>

            <template v-if="hoverData.path === `solution`">
              <div class="solutionHover">
                <div class="projectWrap">
                  <span class="title">解决方案</span>
                  <div class="itemTitle" v-for="(z, i) in solutionList" :key="i" @click.stop="() =>onChange(i)">{{ z.name }}</div>
                </div>
                <div class="itemSolution">
                  <div class="itemWrap">
                    <div class="itemTitle" v-for="(o, j) in solutionItemList" :key="j">{{ o.name }}</div>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </template>
  </div>
</template>

<script>
import PortalRouter from '@/router/portal/' // 门户路由
import config from '@/config/variable'


export default {
  name: "Navbar",
  components: { 
  },
  props: {
    mode: {
      type: String,
      default: 'horizontal'
    },
  },
  data() {
    return {
      hoverData: {
        path: ''
      },
      showHover: false,
      menuList: [],
      menuImgList: [],
      solutionList: [],
      solutionIndex: 0,
      
    };
  },
  created() {
    this.initData()
  },
  computed: {
    solutionItemList() {
      return this.solutionList[this.solutionIndex] && this.solutionList[this.solutionIndex].children || []
    },
    portalRouter() {
      return PortalRouter.find(item => item.path === '/portal')
    },
    menu() {
      return this.portalRouter ? this.portalRouter.children : []
    },
    activeMenu() {
      return this.$route.path
    }
  },
  methods: {
    
    initData() {
    },

    onChange(index) {
      this.solutionIndex = index
    },

    gotoPage(item) {
      if (item.path === "market") {
        window.open(config.marketUrl)
        return
      }
      if (['productCenter', 'solution'].includes(item.path)) {
        return
      }
      if (item) {
        this.$router.push(`/portal/${item.path}`)
        this.showHover = false
      }
    },
    gotoPageDetail(data) {
      if (data.jump_url) {
        this.$router.push(data.jump_url)
        this.showHover = false
      }
    },
    onmouseleave(e, item) {
      if (!item.meta.isDownIcon) {
        this.showHover = false
        this.hoverData = {
          path: ''
        }
      }
    },
    onmouseover(e, item) {
      if (item.meta.isDownIcon) {
        this.hoverData = item
        this.showHover = true
      } else {
        this.showHover = false
      }
    },

    onmouseout() {
      this.showHover = false
    },
    onmousemove() {
      this.showHover = true
    },
  }
}
</script>

<style lang="scss" scoped>
.headerDropdown{
  bottom: 0;
  left: 0;
  position: fixed;
  right: 0;
  top: 96px;
  -webkit-transition: all .2s;
  transition: all .2s;
  z-index: 2;
  width: calc(100vw - 7px);
  height: 485px;
  background: linear-gradient(180deg, #000000 0%, #1C1C1C 100%);
  box-sizing: border-box;
  /* display: none; */

  .headerHover{
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow:  row nowrap;
    justify-content: center;
    padding-top: 9px;

    & > div {
      width: 324px;
      height: 413px;
      margin-right: 100px;

      .headerTheme{

        .themeTitle{
          font-size: 24px;
          font-family: PingFang-SC, PingFang-SC;
          font-weight: 800;
          /* color: #666666; */
          color: #333;
          margin-left: 10px;
          vertical-align: top;
        }

        .line{
          width: 320px;
          height: 1px;
          background: #666666;
          margin-top: 28px;
        }
      }

      .headerContent{
        display: flex;
        flex-flow: column nowrap;
        justify-content: start;

        & > div {
          font-size: 18px;
          font-family: PingFangSC, PingFang SC;
          font-weight: 400;
          color: #333;
          line-height: 48px;
          cursor: pointer;

          .highlight {
            color: #FFFFFF; 
          }
          
          .highlight:hover {
            color: #2762FA !important;
          }
        }
 
      }
    }

  }

  .solutionHover {
    width: 1200px;
    height: calc(100% - 40px);
    /* display: flex;
    flex-flow: row nowrap;
    justify-content: center; */
    padding-top: 40px;
    margin: auto;
    

    & > div {
      width: 224px;
      font-size: 18px;
      font-family: PingFang-SC, PingFang-SC;
      font-weight: bold;
      line-height: 56px;
      cursor: pointer;
      color: #FFFFFF;
      display: inline-block;

      & > div:first-child {
        margin-top: 20px;
      }

      /* & > div:nth-child(n+1):hover {
        color: #2866FF;
      } */

      .title{
        font-size: 24px;
        font-family: PingFang-SC, PingFang-SC;
        font-weight: 800;
        color: #666660;
        line-height: 20px;
        display: block;
        margin-bottom: 20px;
      }
    }

    & > div:first-child {
      display: inline-block;
      border-right: 1px solid #666666;
    }

    .projectWrap {

      .itemTitle{
        color: #333;
      }
      & > div:hover {
        /* color: #2866FF; */
      }
    }

    .itemSolution {
      width: 800px;
      display: inline-block;
      margin-left: 80px;
      vertical-align: top;
      margin-top: 18px;

      .itemWrap {
        display: flex;
        flex-flow: row wrap;
        justify-content: start;

        .itemTitle{
          color: #333;
        }

        & > div {
          width: 180px;
          margin-right: 86px;
        }

        & > div:hover {
          /* color: #2866FF; */
        }
      }
    }

  }
}

.menuContainer {
  width: 634px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;

  .ulWrap {
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    list-style: none;
    padding: 0;
  }

  ul li {
    position: relative;
    display: inline-block;
    height: 96px;
    line-height: 96px;
    font-size: 20px;
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    color: #FFFFFF;
    cursor: pointer;
    position: relative;
    transition: border-color .3s,background-color .3s,color .3s;
    box-sizing: border-box;
    white-space: nowrap;
    margin-right: 40px;
  }

  ul > li:last-child {
    margin-right: 0px;
  }

  /* ul li:hover .headerDropdown {
    display: block;
  } */

  .menuItem{
    height: 96px;
    line-height: 96px;
    font-size: 20px;
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    color: #FFFFFF;
    cursor: pointer;
    position: relative;
    transition: border-color .3s,background-color .3s,color .3s;
    box-sizing: border-box;
    white-space: nowrap;
  }

  .active{
    color: #2662FF;
  }

  .el-submenu__icon-arrow {
      position: static;
      vertical-align: middle;
      margin-left: 4px;
      margin-top: -3px;
  }


}
</style>