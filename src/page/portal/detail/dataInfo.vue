<!--
 * @Author: why
 * @Date: 2025-02-06 14:42:05
 * @LastEditors: why
 * @LastEditTime: 2025-03-11 14:35:08
 * @Description: 
-->
<template>
  <div class="info-container">
    <module-title title="基本信息"></module-title>
    <el-descriptions :column="2" border :label-style="descStyle" :content-style="descStyle">
      <el-descriptions-item label="数据名称">{{ eleInfo.name }} </el-descriptions-item>
      <el-descriptions-item label="数据类型">{{ eleInfo.data_type }} </el-descriptions-item>
      <el-descriptions-item label="应用场景">{{ eleInfo.application_scene }} </el-descriptions-item>
      <el-descriptions-item label="表名">{{ eleInfo.table_name }} </el-descriptions-item>
      <el-descriptions-item label="竞价开始日期">{{ dayjs(detail.start_time).format("YYYY-MM-DD") }} </el-descriptions-item>
      <el-descriptions-item label="竞价截止日期">{{ dayjs(detail.end_time).format("YYYY-MM-DD") }} </el-descriptions-item>
      <el-descriptions-item label="数据描述">{{ eleInfo.description }} </el-descriptions-item>
    </el-descriptions>
    <module-title title="数据字段"></module-title>
    <Table :data-source="fields" :columns="fieldsColumns" :options="tableOptions" :pagination="tablePagination" :max-height="528" border></Table>
    <module-title title="实例数据"></module-title>
    <Table :data-source="fieldsData" :columns="fieldsDataColumns" :options="tableOptions" :pagination="tablePagination" :max-height="518" border></Table>
  </div>
</template>

<script>
import { hexToStr } from "@/util/util"
import dayjs from 'dayjs'
export default {
  props: {
    detail: {
      type: Object,
      default: () => ({
        name: "LAFAN1_Retargeting_Dataset",
        description: "为了使人形机器人的运动更加自然，我们将LAFAN1运动捕捉数据重定向到Unitree",
        price: 25,
        data_type: "数据集",
        createTime: "2024-08-27 12:12:45",
        application_scene: "机器人模拟行走、跳跃",
        fields: [
          {
            fieldName: "id",
            fieldType: "int",
            fieldLength: 64,
            fieldRemark: "主键",
          },
          {
            fieldName: "arm_horizontal_angle",
            fieldType: "int",
            fieldLength: 64,
            fieldRemark: "手臂横向摆动幅度",
          },
          {
            fieldName: "arm_vertical_angle",
            fieldType: "int",
            fieldLength: 64,
            fieldRemark: "手臂纵向摆动幅度",
          },
        ],
        fieldsData: [
          {
            id: "1881621488398893057",
            arm_horizontal_angle: 45,
            arm_vertical_angle: 106,
          },
          {
            id: "1811697767777570817",
            arm_horizontal_angle: 67,
            arm_vertical_angle: 98,
          },
        ],
      })
    },
    fields: {
      type: Array,
      default: () => ([])
    },
    fieldsData: {
      type: Array,
      default: () => ([])
    }
  },
  computed: {
    eleInfo() {
      return this.detail.info ? JSON.parse(hexToStr(this.detail.info)) : {}
    },
    fieldsDataColumns() {
      return (this.fields || []).map(item => {
        return {
          label: item.name,
          key: item.name
        }
      })
    }
  },
  data() {
    return {
      descStyle: { 'width': '1.770833rem' },
      tableOptions: { isIndex: true },
      tablePagination: { pageNo: 1, pageSize: 10, hidden: true },
      fieldsColumns: [
        {
          label: "字段名称",
          key: "name"
        },
        {
          label: "字段类型",
          key: "type"
        },
        {
          label: "长度",
          key: "ttl_expression"
        },
        {
          label: "备注",
          key: "comment"
        },
      ],
    };
  },
  methods: {
    dayjs
  }
  
}
</script>

<style lang="scss" scoped>
.title-container {
  margin-top: .208333rem /* 40/192 */;
  &:first-child {
    margin-top: 0;
  }
}
</style>