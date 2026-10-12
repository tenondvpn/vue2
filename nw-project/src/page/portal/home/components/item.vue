<!--
 * @Author: why
 * @Date: 2025-01-13 15:16:08
 * @LastEditors: why
 * @LastEditTime: 2025-03-11 11:57:39
 * @Description: 
-->
<template>
  <div class="item-container" @click="goPageDetail">
    <div class="item-top">
      <div class="item-top-type">
        <img :src="typeIcon" />
        <span class="type-name" :class="{ 'type-1': dataInfo.type == 1, 'type-2': dataInfo.type == 2, 'type-3': dataInfo.type == 0 }">{{ typeName }}</span>
      </div>
      <div class="item-top-tag" v-if="data.selled == 1">售罄</div>
    </div>
    <div class="item-middle">
      <div class="item-middle-name" :title="dataInfo.name">
        {{ dataInfo.name }}
      </div>
      <div class="item-middle-desc" :title="dataInfo.description">
        {{ dataInfo.description }}
      </div>
    </div>
    <div class="item-bottom">
      <div class="item-bottom-user">
        <img src="/img/pages/header/user.png" />
        <span :title="data.owner">{{ data.owner }}</span>
      </div>
      <div class="item-bottom-time">
        {{ dayjs(data.end_time).format("YYYY-MM-DD") }}
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs"
import config from "@/config/variable"
import { hexToStr } from "@/util/util"
export default {
  props: {
    data: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    dataInfo() {
      return JSON.parse(hexToStr(this.data.info))
    },
    typeIcon() {
      const eleItem = this.eleTypeList.find(item => item.valueKey == this.dataInfo.type)
      return eleItem ? eleItem.icon : ""
    },
    typeName() {
      const eleItem = this.eleTypeList.find(item => item.valueKey == this.dataInfo.type)
      return eleItem ? eleItem.label : ""
    }
  },
  data() {
    return {
      eleTypeList: config.eleTypeList,
    };
  },
  methods: {
    dayjs,
    goPageDetail() {
      this.$router.push({
        path: "/portal/detail",
        query: {
          hash: this.data.hash,
          type: this.dataInfo.type
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/variables.scss';
.item-container {
  width: 1.78125rem /* 342/192 */;
  padding: .125rem /* 24/192 */;
  box-sizing: border-box;
  border-radius: 8px;
  border: 1px solid #DCDCDC;
  background: #fff;
  cursor: pointer;
  transition: 0.5s;
  &:hover {
    transition: 0.5s;
    transform: translateY(-8px);
  }
  .item-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: .208333rem /* 40/192 */;
    &-type {
      display: flex;
      align-items: center;
      .type-name {
        margin-left: .041667rem /* 8/192 */;
        font-size: .083333rem /* 16/192 */;
      }
      .type-1 {
        color: $theme;
      }
      .type-2 {
        color: #FFBC01;
      }
      .type-3 {
        color: #3DC4F5;
      }
    }
    &-tag {
      width: .3125rem /* 60/192 */;
      height: .125rem /* 24/192 */;
      line-height: .125rem /* 24/192 */;
      text-align: center;
      font-size: .072917rem /* 14/192 */;
      color: #fff;
      background: #F97801;
      border-radius: .020833rem /* 4/192 */;
    }
  }
  .item-middle {
    padding-bottom: .125rem /* 24/192 */;
    border-bottom: #DCDCDC solid 1px;
    margin-bottom: .333333rem /* 64/192 */;
    &-name {
      width: 100%;
      font-weight: 600;
      font-size: .09375rem /* 18/192 */;
      color: #000000;
      height: .130208rem /* 25/192 */;
      line-height: .130208rem /* 25/192 */;
      margin-bottom: .125rem /* 24/192 */;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    &-desc {
      font-size: .072917rem /* 14/192 */;
      color: rgba($color: #000000, $alpha: 0.6);
      height: .229167rem /* 44/192 */;
      line-height: .114583rem /* 22/192 */;
      text-overflow: ellipsis;
      overflow: hidden;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2; /* 最多显示2行 */
    }
  }
  .item-bottom {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    &-user {
      display: flex;
      align-items: center;
      flex: 1;
      img {
        width: .104167rem /* 20/192 */;
        height: .104167rem /* 20/192 */;
        margin-right: .041667rem /* 8/192 */;
      }
      span {
        flex: 1;
        font-size: .072917rem /* 14/192 */;
        color: #000000;
        line-height: .104167rem /* 20/192 */;
        text-overflow: ellipsis;
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1; /* 最多显示1行 */
        word-break: break-all;
      }
    }
    &-time {
      width: .625rem /* 120/192 */;
      text-align: right;
      font-size: .072917rem /* 14/192 */;
      color: rgba($color: #000000, $alpha: 0.4);
      line-height: .104167rem /* 20/192 */;
    }
  }
}
</style>