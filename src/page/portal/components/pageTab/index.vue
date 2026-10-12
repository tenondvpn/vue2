<template>
  <div class="tab-container">
    <div class="tab-header">
      <div class="tab-header-title" v-if="title">{{title}}</div>
      <div class="tab-header-inner">
        <div v-for="tabItem in tabs" :key="tabItem.id" class="tab-header-item" :class="{ 'header-item-current': value == tabItem.id }" @click="handleClick(tabItem)">
          <div class="item-name" :title="tabItem.name">
            <img class="item-name-icon" v-if="tabItem.icon" :src="value == tabItem.id ? tabItem.iconActive : tabItem.icon" />
            <div class="item-name-fill">{{tabItem.name}}</div>
          </div>
          <!-- <div class="item-arrow"><i class="el-icon-right"></i></div> -->
        </div>
      </div>
    </div>
    <div class="tab-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: [String],
    tabs: [Array],
    value: [String, Number],
  },
  computed: {
  },
  methods: {
    handleClick(tabItem) {
      if (this.value != tabItem.id) {
        this.$emit("input", tabItem.id)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";
.tab-container {
  display: flex;
  justify-content: space-between;
  width: 7.5rem /* 1440/192 */;
  margin: 0 auto;
  .tab-header {
    display: flex;
    flex-direction: column;
    width: 1.375rem /* 264/192 */;
    background: #fff;
    border-radius: .041667rem /* 8/192 */;
    margin-right: .125rem /* 24/192 */;
    padding: .166667rem /* 32/192 */ .125rem /* 24/192 */;
    &-title {
      background: transparent;
      font-weight: 600;
      font-size: .166667rem /* 32/192 */;
      color: $theme;
      line-height: .197917rem /* 38/192 */;
      padding-bottom: .083333rem /* 16/192 */;
      margin-bottom: .208333rem /* 40/192 */;
      position: relative;
      &::after {
        content: "";
        display: block;
        width: .375rem /* 72/192 */;
        height: .03125rem /* 6/192 */;
        background: #D8A781;
        position: absolute;
        left: 0;
        bottom: 0;
      }
    }
    &-inner {
      flex: 1;
      .tab-header-item {
        display: flex;
        justify-content: space-between;
        padding: .041667rem /* 8/192 */ .083333rem /* 16/192 */;
        margin-bottom: .083333rem /* 16/192 */;
        border-radius: .03125rem /* 6/192 */;
        cursor: pointer;
        position: relative;
        &:last-child {
          margin-bottom: 0;
        }
        .item-name {
          display: flex;
          align-items: center;
          width: .9375rem /* 180/192 */;
          &-fill {
            flex: 1;
            font-size: .072917rem /* 14/192 */;
            color: #000000;
            text-overflow: ellipsis;
            overflow: hidden;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1; /* 最多显示1行 */
          }
          &-icon {
            width: .104167rem /* 20/192 */;
            height: .104167rem /* 20/192 */;
            margin-right: .052083rem /* 10/192 */;
          }
        }
        .item-arrow {
          color: $theme;
          opacity: 0;
          transition: .5s;
          position: absolute;
          right: .229167rem /* 44/192 */;
          i {
            font-size: .104167rem /* 20/192 */;
          }
        }
      }
      .tab-header-item:hover,.header-item-current {
        background: #DEEBFF;
        .item-arrow {
          opacity: 1;
          right: .125rem /* 24/192 */;
          transition: .5s;
          i {
            font-size: .104167rem /* 20/192 */;
          }
        }
      }
      .header-item-current {
        .item-name {
          &-fill {
            color: $theme;
          }
        }
      }
    }
  }
  .tab-content {
    flex: 1;
    background: #fff;
    border-radius: .041667rem /* 8/192 */;
    padding: .166667rem /* 32/192 */ .125rem /* 24/192 */;
    box-sizing: border-box;
  }
}
</style>