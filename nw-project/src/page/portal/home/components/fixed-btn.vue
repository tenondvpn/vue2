<!--
 * @Author: why
 * @Date: 2024-12-10 15:23:18
 * @LastEditors: why
 * @LastEditTime: 2025-01-10 16:15:17
 * @Description: 
-->
<template>
  <div class="fixed-container">
    <div class="fixed-group">
      <div v-for="btn in btnGroup" :key="btn.key" class="fixed-group-item">
        <template v-if="btn.isPop">
          <el-popover
            placement="left"
            :width="btn.popWidth || 180"
            trigger="hover"
          >
            <slot :name="btn.key"></slot>
            <div class="fixed-btn" :title="btn.title" slot="reference" @click="handleClick(btn)">
              <img class="fixed-btn-icon" :src="btn.icon" />
            </div>
          </el-popover>
        </template>
        <div v-else class="fixed-btn" :title="btn.title" @click="handleClick(btn)">
          <img class="fixed-btn-icon" :src="btn.icon" />
        </div>
      </div>
    </div>
    <div class="fixed-btn fixed-back" :class="{ 'visible': visible }" @click="handleBacktop">
      <img class="fixed-btn-icon" src="/img/pages/home/fixed_backtop.png" />
    </div>
  </div>
</template>

<script>
import _ from "lodash"
export default {
  props: {
    btnGroup: [Array]
  },
  components: {

  },
  data() {
    return {
      visible: false,
      throttledScrollHandler: null
    };
  },
  mounted() {
    this.throttledScrollHandler = _.throttle(this.onScroll, 300);
    document.addEventListener('scroll', this.throttledScrollHandler);
  },
  beforeDestroy() {
    document.removeEventListener('scroll', this.throttledScrollHandler);
  },
  methods: {
    handleBacktop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      })
    },
    handleClick(btn) {
      this.$emit('handleClick', btn)
    },
    onScroll() {
      const scrollTop = document.documentElement.scrollTop;
      this.visible = scrollTop >= 700;
    }
  }
}
</script>

<style lang="scss" scoped>
.fixed-container {
  position: fixed;
  right: .125rem /* 24/192 */;
  bottom: 1.291667rem /* 248/192 */;
  z-index: 9999;
}
.fixed-group,.fixed-back {
  background: #FFFFFF;
  box-shadow: 0px 5px .078125rem /* 15/192 */ 0px rgba(0,0,0,0.03), 0px .078125rem /* 15/192 */ .182292rem /* 35/192 */ -2px rgba(0,0,0,0.05);
  border-radius: 8px;
  padding: 4px;
}
.fixed-back {
  margin-top: .041667rem /* 8/192 */;
  opacity: 0;
  transition: .5s;
}
.fixed-group {
  &-item:not(:first-child):not(:last-child) {
    ::v-deep .fixed-btn {
      margin: 8px 0;
    }
  }
}
.fixed-btn {
  width: .208333rem /* 40/192 */;
  height: .208333rem /* 40/192 */;
  background: #fff;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    background: #DEEBFF;
  }
  &-btn {
    width: .125rem /* 24/192 */;
    height: .125rem /* 24/192 */;
  }
}
.visible {
  transition: .5s;
  opacity: 1;
}
</style>