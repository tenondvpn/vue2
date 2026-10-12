<!--
 * @Author: why
 * @Date: 2025-02-06 10:09:49
 * @LastEditors: why
 * @LastEditTime: 2025-03-11 14:49:34
 * @Description: 详情页
-->
<template>
  <div class="page-container">
    <div class="page-inner">
      <Breadcrumb :current-title="pageTitle"></Breadcrumb>
      <div class="page-top">
        <div class="page-top-ele">
          <div class="page-top-type">
            <img :src="eleType.icon" />
            <span class="type-name" :class="{ 'type-1': eleType.valueKey == 1, 'type-2': eleType.valueKey == 2, 'type-3': eleType.valueKey == 3 }">{{ eleType.label }}</span>
          </div>
          <div class="page-top-tag" v-if="detail.selled == 1">售罄</div>
        </div>
        <div class="page-top-name" :title="eleInfo.name">{{ eleInfo.name }}</div>
        <div class="page-top-desc" :title="eleInfo.description">{{ eleInfo.description }}</div>
        <div class="page-top-price">
          <span class="price-label">竞价标底：</span>
          <span class="price-value">{{detail.price}}</span>
          <span class="price-label">积分</span>
          <el-button type="primary" size="small" class="price-btn" @click="submitPrice">竞价购买</el-button>
        </div>
      </div>
      <el-tabs v-model="activeName">
        <el-tab-pane :label="pageTitle" name="1">
          <data-info v-if="eleType.valueKey == 0" :detail="detail" :fields="fields" :fieldsData="fieldsData"></data-info>
          <model-info v-else-if="eleType.valueKey == 1" :detail="detail"></model-info>
          <computing-info v-else-if="eleType.valueKey == 2" :detail="detail"></computing-info>
        </el-tab-pane>
        <el-tab-pane label="确权信息" name="2" lazy>
          <chain-info :detail="chainInfo" :eleType="eleType"></chain-info>
        </el-tab-pane>
        <el-tab-pane label="竞价排名" name="3" lazy>
          <price-info :detail="detail"></price-info>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import config from "@/config/variable"
import modelInfo from "./modelInfo.vue"
import computingInfo from "./computingInfo.vue"
import dataInfo from "./dataInfo.vue"
import chainInfo from "./chainInfo.vue"
import priceInfo from "./priceInfo.vue"
import { getEleDetail, purchaseElePrice } from "@/api/home"
import { hexToStr } from "@/util/util"

export default {
  components: { modelInfo, computingInfo, dataInfo, chainInfo, priceInfo },
  data() {
    return {
      pageTitle: "",
      activeName: "1",
      detail: {},
      fields: [],
      fieldsData: [],
      chainInfo: {},
    };
  },
  computed: {
    eleType() {
      return config.eleTypeList.find(ele => ele.valueKey == this.$route.query.type) || {}
    },
    eleInfo() {
      return this.detail.info ? JSON.parse(hexToStr(this.detail.info)) : {}
    }
  },
  created() {
    this.pageTitle = `${this.eleType.label}详情`
    this.$router.$avueRouter.setTitle(this.pageTitle);
  },
  mounted() {
    this.getDetail()
  },
  methods: {
    getDetail() {
      getEleDetail({ hash: this.$route.query.hash }).then(res => {
        const data = res.data.data
        this.detail = data.sell_info
        this.fields = data.table_info
        this.fieldsData = data.data_example
        this.chainInfo = data.confirm_info
      })
    },
    submitPrice() {
      if (this.detail.selled == 1) {
        this.$alert('已售罄，无法提交竞价！', '温馨提示', { type: 'warning' });
        return
      }
      this.$prompt('请输入竞价积分', '竞价购买', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        closeOnClickModal: false,
        closeOnPressEscape: false,
        inputType: 'number',
        inputValidator: (value) => {
          if (!value) {
            return "请输入竞价积分"
          } else {
            if (value < this.detail.price) {
              return `竞价积分最低为${this.detail.price}积分`
            } else {
              return true
            }
          }
        }
      }).then(async ({ value }) => {
        await purchaseElePrice({ hash: this.detail.hash, price: value })
        this.$message.success("操作成功")
        this.getDetail()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/variables.scss';
.page-container {
  padding: .541667rem /* 104/192 */ 0;
  min-height: 100vh;
  background: #E1E8FE;
  box-sizing: border-box;
  .page-inner {
    width: 7.5rem /* 1440/192 */;
    margin: 0 auto;
    .page-top {
      padding: .208333rem /* 40/192 */;
      background: #ffffff;
      border-radius: .041667rem /* 8/192 */;
      margin-bottom: .208333rem /* 40/192 */;
      &-ele {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: .125rem /* 24/192 */;
      }
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
      &-name {
        width: 100%;
        font-weight: 600;
        font-size: .09375rem /* 18/192 */;
        color: #000000;
        margin-bottom: .125rem /* 24/192 */;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      &-desc {
        background: #EFF3FF;
        padding: .166667rem /* 32/192 */ .125rem /* 24/192 */;
        font-size: .072917rem /* 14/192 */;
        color: rgba($color: #000000, $alpha: 0.6);
        line-height: .114583rem /* 22/192 */;
        margin-bottom: .166667rem /* 32/192 */;
        text-overflow: ellipsis;
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2; /* 最多显示2行 */
      }
      &-price {
        display: flex;
        align-items: center;
        .price-label {
          font-size: .083333rem /* 16/192 */;
          color: #000000;
        }
        .price-value {
          font-size: .125rem /* 24/192 */;
          color: #F97801;
          margin-right: .041667rem /* 8/192 */;
        }
        .price-btn {
          margin-left: .416667rem /* 80/192 */;
        }
      }
    }
    ::v-deep .el-tabs__header {
      height: .291667rem /* 56/192 */;
      line-height: .291667rem /* 56/192 */;
      padding: 0 .208333rem /* 40/192 */;
      background: #ffffff;
      border-radius: .041667rem /* 8/192 */;
      margin-bottom: .208333rem /* 40/192 */;
    }
    ::v-deep .el-tabs__item {
      font-size: .083333rem /* 16/192 */;
    }
    ::v-deep .el-tabs__content {
      padding: .208333rem /* 40/192 */;
      background: #ffffff;
      border-radius: .041667rem /* 8/192 */;
    }
    ::v-deep .el-tabs__nav-wrap::after {
      height: 0;
    }
    ::v-deep .custom-table {
      padding-bottom: 0;
    }
  }
}
</style>