<!--
 * @Author: why
 * @Date: 2025-02-06 14:42:05
 * @LastEditors: why
 * @LastEditTime: 2025-03-11 11:14:29
 * @Description: 
-->
<template>
  <div class="info-container">
    <Table :data-source="detail.buyers" :columns="columns" :options="options" :pagination="pagination" :max-height="528" border></Table>
  </div>
</template>

<script>
export default {
  props: {
    detail: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      options: { isIndex: true },
      pagination: { pageNo: 1, pageSize: 10, hidden: true },
      columns: [
        {
          label: "竞价积分",
          key: "price"
        },
        {
          label: "竞价用户",
          key: "buyer"
        },
        {
          label: "竞价时间",
          key: "time"
        },
      ],
    };
  },
  
}
</script>

<style lang="scss" scoped>
</style>