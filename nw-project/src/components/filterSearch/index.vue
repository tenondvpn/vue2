<!--
 * @Author: [why]
 * @Date: 2021-04-07 11:44:38
 * @LastEditors: why
 * @LastEditTime: 2025-02-21 11:12:06
 * @Description: 表格页查询组件
-->
<template>
  <div class="conditionFilter-container">
    <el-row :gutter="20">
      <el-col
        v-for="(item, index) in option"
        v-show="!item.hide"
        :key="index"
        :span="item.span ? item.span : 6"
        class="cd-col"
        :style="{ 'min-width': item.minWidth ? item.minWidth : 'none' }"
      >
        <label class="cd-label">{{ item.name }}：</label>
        <el-input
          v-if="item.type == 'input'"
          v-model="item.modelValue"
          :disabled="item.disabled"
          class="cd-input"
          placeholder="请输入"
          :size="size"
        />
        <el-input
          v-if="item.type == 'number'"
          v-model="item.modelValue"
          :disabled="item.disabled"
          class="cd-input"
          placeholder="请输入"
          :size="size"
          type="number"
        />
        <el-select
          v-else-if="item.type == 'select'"
          v-model="item.modelValue"
          :disabled="item.disabled"
          class="cd-input"
          placeholder="请选择"
          :size="size"
          clearable
          @change="item.onChange ? item.onChange(arguments) : undefined"
        >
          <el-option
            v-for="oitem in item.childrens"
            :key="oitem.valueKey"
            :label="oitem.label"
            :value="oitem.valueKey"
          />
        </el-select>
        <el-date-picker
          v-else-if="item.type == 'datetime'"
          v-model="item.modelValue"
          type="datetime"
          :disabled="item.disabled"
          :size="size"
          class="cd-input"
          placeholder="请选择时间"
          value-format="yyyy-MM-dd HH:mm:ss"
        />
        <el-date-picker
          v-else-if="item.type == 'date'"
          v-model="item.modelValue"
          type="date"
          :disabled="item.disabled"
          :size="size"
          class="cd-input"
          placeholder="请选择日期"
          value-format="yyyy-MM-dd"
        />
        <el-date-picker
          v-else-if="item.type == 'month'"
          v-model="item.modelValue"
          type="month"
          :disabled="item.disabled"
          :size="size"
          class="cd-input"
          placeholder="请选择月份"
          value-format="yyyy-MM"
        />
        <el-date-picker
          v-else-if="item.type == 'datetimeRange'"
          v-model="item.modelValue"
          type="datetimerange"
          :disabled="item.disabled"
          :size="size"
          class="cd-input"
          range-separator="-"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          value-format="yyyy-MM-dd HH:mm:ss"
        />
        <el-date-picker
          v-else-if="item.type == 'dateRange'"
          v-model="item.modelValue"
          type="daterange"
          :disabled="item.disabled"
          :size="size"
          class="cd-input"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd"
        />
        <el-date-picker
          v-else-if="item.type == 'monthRange'"
          v-model="item.modelValue"
          type="monthrange"
          :disabled="item.disabled"
          :size="size"
          class="cd-input"
          range-separator="-"
          start-placeholder="开始月份"
          end-placeholder="结束月份"
          value-format="yyyy-MM"
        />
        <render
          v-else-if="item.type == 'custom'"
          :item="item"
          :index="index"
          :render="item.render"
        />
        <template v-else-if="item.type == 'slot'">
          <slot :name="item.key"></slot>
        </template>
      </el-col>
      <el-col :span="btnSpan" style="text-align: right">
        <el-button
          type="primary"
          icon="el-icon-search"
          :size="size"
          :loading="btnLoading"
          @click="handleSearch"
          >查询</el-button
        >
        <el-button
          type="info"
          plain
          icon="el-icon-refresh-right"
          :size="size"
          @click="handleReset"
          >重置</el-button
        >
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { deepClone } from "@/util/util";

// Auth：吴环宇 <br>
// Desc：用于表格页条件查询模块 <br>
// Demo：project/index.vue
export default {
  name: "th-filter-search",
  components: {
    render: {
      functional: true,
      props: {
        render: Function,
        index: Number,
        item: {
          type: Object,
          default: null,
        },
      },
      render: (h, opt) => {
        const params = {
          index: opt.props.index,
        };
        if (opt.props.item) params.item = opt.props.item;
        return opt.props.render(h, params);
      },
    },
  },
  props: {
    // 查询条件配置 <br>
    // [{ <br>
    // name: '', //label，文字描述 <br>
    // key: '', //key，搜索关键字 <br>
    // type: '',  //数据项类型，可配置input/number/select/datetime/date/month/datetimeRange/dateRange/monthRange/custom/slot <br>
    // modelValue: '', //数据值(可用于设置默认值) <br>
    // childrens: [{name:'', code:''}] //下拉框选项配置，仅type=select时有效 <br>
    // disabled: false, //是否禁用 <br>
    // span: 6 //可调整一个数据项的占位自适应宽度，默认值为6 即一行4个数据项 <br>
    // minWidth: '300px' //设置一个数据项最短宽度，默认值300px <br>
    // render: (h, params) => {} //数据项渲染自定义组件，仅type=custom时有效 <br>
    // }]
    option: {
      type: Array,
      default: () => [],
    },
    // 查询按钮loading控制
    btnLoading: {
      type: Boolean,
      default: false,
    },
    // 表单控件的尺寸，有效值medium/small/mini
    size: {
      type: String,
      default: "small",
    },
    btnSpan: {
      type: Number,
      default: 6,
    },
  },
  data() {
    return {
      option_original: [], // 初始化时option配置，重置时使用
      cdForm: {},
    };
  },
  beforeCreate() {},
  mounted() {
    this.option_original = deepClone(this.option);
  },
  methods: {
    // @vuese
    // 获取当前条件参数
    getCondition() {
      this.option.forEach((item) => {
        this.cdForm[item.key] = item.modelValue;
      });
      return { ...this.cdForm };
    },
    handleSearch() {
      const formData = this.getCondition();
      // 点击查询时触发的事件
      // @arg {Object} 当前条件参数
      this.$emit("onSearch", formData);
    },
    handleReset() {
      this.option.forEach((item) => {
        const item_original = this.option_original.find(
          (oItem) => oItem.key === item.key
        );
        item.modelValue = item_original.modelValue;
        item.hide = item_original.hide;
        item.disabled = item_original.disabled;
      });
      // 点击重置时触发的事件
      this.$emit("onReset");
    },
  },
};
</script>

<style lang="scss" scoped>
.conditionFilter-container {
  background: #fff;
  .el-row {
    display: flex;
    flex-wrap: wrap;
    justify-content: start;
    // align-content: space-between;
    .el-col {
      margin-bottom: .078125rem /* 15/192 */;
    }
  }

  .cd-col {
    display: flex;
    align-items: center;
  }

  .cd-label {
    // width: 100px;
    // height: 20px;
    font-size: .072917rem /* 14/192 */;
    // line-height: 22px;
    color: rgba(0, 0, 0, 0.85);
    font-weight: normal;
    // display: inline-block;
    text-align: left;
  }
  .cd-input {
    // width: calc(95% - 100px);
    flex: 1;
  }
}
</style>
>
