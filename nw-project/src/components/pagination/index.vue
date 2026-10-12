<!--
 * @Author: [why]
 * @Date: 2021-04-07 11:44:39
 * @LastEditors: why
 * @LastEditTime: 2025-02-06 17:28:41
 * @Description:
-->
<template>
  <div :class="{ hidden: hidden }" class="pagination-container">
    <el-pagination
      :background="background"
      :current-page.sync="currentPage"
      :page-size.sync="pgSize"
      :layout="
        isPhone
          ? 'total, prev, pager, next'
          : 'total, sizes, prev, pager, next, jumper'
      "
      :page-sizes="pageSizes"
      :pager-count="isPhone ? 5 : 7"
      :small="isPhone ? true : false"
      :total="total"
      v-bind="$attrs"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    >
      <slot name="before" />
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    total: {
      required: true,
      type: Number,
    },
    pageNo: {
      required: true,
      type: Number,
    },
    pageSize: {
      required: true,
      type: Number,
    },
    pageSizes: {
      type: Array,
      default: () => [10, 20, 30],
    },
    background: {
      type: Boolean,
      default: true,
    },
    hidden: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  computed: {
    currentPage: {
      get() {
        return this.pageNo;
      },
      set(val) {
        this.$emit("update:pageNo", val);
      },
    },
    pgSize: {
      get() {
        return this.pageSize;
      },
      set(val) {
        this.$emit("update:pageSize", val);
      },
    },
    pageMax() {
      const max = Math.ceil(this.total / this.pageSize);
      return max < 1 ? 1 : max;
    },
  },
  watch: {
    total() {
      if (this.currentPage > this.pageMax) {
        this.currentPage = this.pageMax
        this.handleCurrentChange(this.currentPage);
      }
    },
  },
  created() {},
  methods: {
    handleSizeChange(val) {
      this.$emit("paginationChange", {
        pageNo: this.currentPage,
        pageSize: val,
      });
    },
    handleCurrentChange(val) {
      this.$emit("paginationChange", { pageNo: val, pageSize: this.pgSize });
    },
  },
};
</script>

<style scoped>
.pagination-container {
  display: flex;
  justify-content: flex-end;
}
.pagination-container.hidden {
  display: none;
}
</style>
