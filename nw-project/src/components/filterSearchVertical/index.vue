<!--
 * @description: 描述信息
 * @author: hujialiang
 * @Date: 2024-12-05 11:05:22
 * @LastEditors: why
 * @LastEditTime: 2025-02-14 15:33:40
-->
<template>
  <div class="filter-selector">
    <!-- 产品类型 -->
    <div v-for="(item, index) in option" :key="index" class="filter-group">
      <div class="filter-label" :style="{ 'width': labelWidth }">{{ item.name }}：</div>
      <el-checkbox-group v-if="item.type == 'checkbox'" v-model="item.modelValue" @change="handleSearch">
        <el-checkbox
          v-for="oitem in item.childrens"
          :label="oitem.valueKey"
          :key="oitem.valueKey"
        >
          {{ oitem.label }}
        </el-checkbox>
      </el-checkbox-group>
      <el-radio-group v-if="item.type == 'radio'" v-model="item.modelValue" @change="handleSearch">
        <el-radio
          v-for="oitem in item.childrens"
          :label="oitem.valueKey"
          :key="oitem.valueKey"
        >
          {{ oitem.label }}
        </el-radio>
      </el-radio-group>
      <render
        v-else-if="item.type == 'custom'"
        :item="item"
        :index="index"
        :render="item.render"
      />
      <template v-else-if="item.type == 'slot'">
        <slot :name="item.key"></slot>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: "th-filter-search-vertical",
  props: {
    labelWidth: {
      type: String,
      default: "auto"
    },
    valueWidth: {
      type: String,
      default: "auto"
    },
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
    // 查询条件配置 <br>
    // [{ <br>
    // name: '', //label，文字描述 <br>
    // key: '', //key，搜索关键字 <br>
    // type: '',  //数据项类型，可配置checkbox/radio/custom/slot <br>
    // modelValue: '', //数据值(可用于设置默认值) <br>
    // childrens: [{name:'', code:''}] //下拉框选项配置，仅type=select时有效 <br>
    // render: (h, params) => {} //数据项渲染自定义组件，仅type=custom时有效 <br>
    // }]
    option: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      cdForm: {}
    };
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
  }
};
</script>

<style scoped>
.filter-selector {
  display: flex;
  flex-direction: column;
  gap: .166667rem /* 32/192 */;
}

.filter-group {
  display: flex;
}

.filter-label {
  font-weight: bold;
  font-size: .072917rem /* 14/192 */;
  text-align: right;
  margin-right: .109375rem /* 21/192 */;
}
</style>
