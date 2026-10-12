<template>
  <div class="">
    <FilterSearch ref="cdf" :btnSpan="18" :option="filterOptions" @onReset="handleReset(1)" @onSearch="handleSearchTable(1)" />
    <Table ref="table" :loading="loading" :data-total="total" :data-source="tableData" :options="options" :columns="columns" @paginationChange="handleSearchTable()">
      <div slot="btnGroup" style="margin-bottom: 10px">
        <el-button type="primary" icon="el-icon-plus" size="medium" @click="handleAdd()">应用</el-button>
      </div>
      <!-- <template #totalAmount="{ row }">
        <el-statistic :precision="2" :value="row.totalAmount || 0" :value-style="{ 'font-size': '14px' }"></el-statistic>
      </template> -->
      <template #options="{ row }">
        <el-button type="text" size="mini" v-if="row.subscriptionStatus === 0" @click="handleAdd(row)">编辑</el-button>
        <el-button type="text" size="mini" @click="handleDetail(row)">查看</el-button>
        <el-button type="text" size="mini" v-if="row.subscriptionStatus === 0" @click="handleDel(row)">删除</el-button>
      </template>
    </Table>
    <add ref="addRef" @handleSuccess="handleSearchTable"></add>
  </div>
</template>

<script>
import add from "./add.vue"
import { getAppList, removeApp } from "@/api/app"
export default {
  components: {
    add,
  },
  data() {
    return {
      loading: false,
      total: 2,
      options: {
        // 表格配置,支持el-table原生属性
        isIndex: false
      },
      tableData: [],
      columns: [
        {
          label: "应用ID",
          key: "appId"
        },
        {
          label: "应用名称",
          key: "appName"
        },
        {
          label: "应用简介",
          key: "description"
        },
        {
          label: "创建时间",
          key: "createTime",
          width: 180
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
          name: "应用名称",
          key: "appName",
          type: "input",
          modelValue: ""
        }
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
      const current = pageNo_ || pagination.pageNo
      const size = pagination.pageSize
      const condition = this.$refs.cdf && this.$refs.cdf.getCondition()
      getAppList({
        current,
        size,
        ...condition
      }).then((response) => {
        if (pageNo_) {
          this.$refs.table.setPagination({ pageNo: pageNo_ })
        }
        this.loading = false
        this.total = response.data.data.total
        this.tableData = response.data.data.records
      })
    },
    handleDel(row) {
      this.$confirm("确认删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        await removeApp({ ids: row.id })
        this.handleSearchTable()
        this.$message.success("操作成功")
      })
    },
    handleAdd(row) {
      this.$refs.addRef.open(row)
    },
    handleDetail() {
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-statistic .con {
  justify-content: start;
}
</style>
