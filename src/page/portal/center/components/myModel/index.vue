<template>
  <div class="">
    <FilterSearch ref="cdf" :btnSpan="18" :option="filterOptions" @onReset="handleReset(1)" @onSearch="handleSearchTable(1)" />
    <Table ref="table" :loading="loading" :data-total="total" :data-source="tableData" :options="options" :columns="columns" @paginationChange="handleSearchTable()">
      <div slot="btnGroup" style="margin-bottom: 24px">
        <el-button type="primary" icon="el-icon-plus" size="small" @click="handleAdd">发布模型</el-button>
      </div>
      <!-- <template #totalAmount="{ row }">
        <el-statistic :precision="2" :value="row.totalAmount || 0" :value-style="{ 'font-size': '14px' }"></el-statistic>
      </template> -->
      <template #options="{ row }">
        <el-button type="text" size="mini" @click="handleDetail(row)">查看</el-button>
        <el-button type="text" size="mini" v-if="row.selled == 0" @click="handleEndPrice(row)">结束竞价</el-button>
      </template>
    </Table>
    <add ref="addRef" @handleSuccess="handleSearchTable"></add>
  </div>
</template>

<script>
import config from "@/config/variable"
import add from "./add.vue"
import { getElePage, confirmElePrice } from "@/api/home"
import { hexToStr } from "@/util/util"
import dayjs from 'dayjs'
export default {
  components: {
    add,
  },
  data() {
    return {
      loading: false,
      total: 0,
      options: {
        // 表格配置,支持el-table原生属性
        isIndex: false
      },
      tableData: [],
      columns: [
        {
          label: "模型名称",
          key: "info",
          formatter: (row, value) => {
            const info = JSON.parse(hexToStr(value))
            return info.name
          }
        },
        {
          label: "模型类型",
          key: "info",
          formatter: (row, value) => {
            const info = JSON.parse(hexToStr(value))
            return info.model_type
          }
        },
        {
          label: "竞价开始日期",
          key: "start_time",
          formatter: (row, value) => {
            return dayjs(value).format("YYYY-MM-DD")
          },
        },
        {
          label: "竞价截止日期",
          key: "end_time",
          formatter: (row, value) => {
            return dayjs(value).format("YYYY-MM-DD")
          },
        },
        {
          label: "状态",
          key: "selled",
          formatter: (row, value) => {
            const statusItem = config.selledStatus.find(item => item.valueKey == value)
            return statusItem ? statusItem.label : "-"
          }
        },
        {
          label: "积分",
          key: "selled_price",
          formatter: (row, value) => {
            return row.selled == 1 ? value : "-"
          }
        },
        {
          label: "操作",
          key: "options",
          width: "140",
          slot: true
        }
      ],
      filterOptions: [
        {
          name: "关键字",
          key: "search",
          type: "input",
          modelValue: ""
        },
        // {
        //   name: "模型类型",
        //   key: "model_type",
        //   type: "select",
        //   childrens: [...config.modelTypeList],
        //   modelValue: ""
        // }
      ]
    }
  },
  mounted() {
    this.handleSearchTable()
  },
  methods: {
    handleReset() {
      this.handleSearchTable(1)
    },
    handleSearchTable(pageNo_) {
      this.loading = true
      const pagination = this.$refs.table.getPagination()
      const start_pos = pageNo_ || pagination.pageNo
      const len = pagination.pageSize
      const search = this.$refs.cdf && this.$refs.cdf.getCondition()
      getElePage({
        start_pos,
        len,
        type: 1,
        owner: 1,
        ...search
      }).then((response) => {
        if (pageNo_) {
          this.$refs.table.setPagination({ pageNo: pageNo_ })
        }
        this.loading = false
        this.total = response.data.total
        this.tableData = response.data.data
      })
    },
    handleAdd() {
      this.$refs.addRef.open()
    },
    handleDetail(row) {
      this.$router.push({
        path: "/portal/detail",
        query: {
          hash: row.hash,
          type: 1
        }
      })
    },
    handleEndPrice(row) {
      this.$confirm("确定结束竞价?", "信息提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        await confirmElePrice({ hash: row.hash })
        this.handleSearchTable()
        this.$message.success("操作成功")
      })
    },
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-statistic .con {
  justify-content: start;
}
</style>
