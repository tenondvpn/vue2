<!--
 * @Author: why
 * @Date: 2024-07-18 09:19:35
 * @LastEditors: why
 * @LastEditTime: 2025-03-10 11:52:58
 * @Description:
-->
<template>
  <div class="info-module">
    <div class="module-top">
      <img src="/img/pages/center/icon_points.png">
      <span>累计积分：{{totalPoints}}</span>
    </div>
    <Table ref="table" :columns="columns" :data-source="tableData" :data-total="total" :loading="loading" :options="options" :pagination="{ pageNo: 1, pageSize: 10, hidden: true }" :max-height="518">
    </Table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { clientLoginByUsername } from "@/api/user"
import { numberThousands } from "@/util/util"
import dayjs from "dayjs"

export default {
  name: "Account",
  computed: {
    ...mapGetters(["token"]),
  },
  data() {
    return {
      totalPoints: 0,
      loading: false,
      total: 0,
      options: {
        // 表格配置,支持el-table原生属性
        isIndex: false,
        operatesWidth: 180
      },
      tableData: [],
      columns: [
        {
          label: "交易时间",
          key: "time",
          formatter: (row, value) => {
            return dayjs(value).format("YYYY-MM-DD HH:mm:ss")
          },
        },
        {
          label: "交易积分",
          key: "balance",
          formatter: (row, value) => {
            return numberThousands(value)
          }
        },
        {
          label: "交易明细",
          key: "amount"
        },
        {
          label: "交易链上地址",
          key: "gid"
        }
      ]
    }
  },
  mounted() {
    this.handleSearchTable()
  },
  methods: {
    async handleSearchTable() {
      this.loading = true
      clientLoginByUsername(this.token).then((response) => {
        this.loading = false
        this.totalPoints = numberThousands(response.data.balance)
        this.tableData = response.data.value
      })
    },
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";
.info-module {
  .module-top {
    display: flex;
    align-items: center;
    font-size: 18px;
    color: #FFBC01;
    margin-bottom: .208333rem /* 40/192 */;
    img {
      margin-right: .041667rem /* 8/192 */;
    }
  }
}
</style>
