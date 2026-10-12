<!--
 * @Author: [why]
 * @Date: 2021-04-08 10:01:57
 * @LastEditors: why
 * @LastEditTime: 2025-02-05 17:18:53
 * @Description: 表格分页组件
-->
<template>
  <div>
    <div class="custom-table">
      <el-row style="text-align: right;">
        <!-- slot 功能按钮 -->
        <slot name="btnGroup" />
      </el-row>
      <!-- table start -->
      <el-table
        ref="etable"
        v-loading="loading"
        style="width: 100%;"
        :class="{ 'none-bordered': !border }"
        :row-key="options && (options.rowKey || rowKeyDefault)"
        :data="dataSource"
        :row-class-name="tableRowClassName"
        :header-cell-style="{
          'background': '#f3f3f3',
          'color': 'rgba(0,0,0,0.6)',
          'font-weight': 'normal'
        }"
        :border="border"
        v-bind="$attrs"
        v-on="$listeners"
        @selection-change="handleSelectionChange"
      >
        <!-- 单选框 -->
        <el-table-column
          v-if="options && options.isRadio"
          label=""
          width="50"
        >
          <template slot-scope="scope">
            <el-radio
              v-model="singleSelectedIndex"
              :label="scope.$index"
              :disabled="options.isRadioDisabled ? options.isRadioDisabled(scope.row, scope.$index) : false"
              @change.native="handleRadioChange(scope.row, scope.$index)"
            >{{ '' }}</el-radio>
          </template>
        </el-table-column>
        <!-- 复选框 -->
        <el-table-column
          v-else-if="options && options.isCheckbox"
          type="selection"
          width="50"
          :selectable="options.isCheckboxEnabled"
          :reserve-selection="true"
        />
        <!-- 序号 -->
        <el-table-column
          v-if="options && options.isIndex"
          width="50"
          type="index"
          :align="options.indexAlign || 'left'"
          :label="options.indexLabel || '序号'"
          :index="indexMethod"
        />

        <!-- 表格数据 -->
        <template v-for="(column, index) in columns">
          <el-table-column
            v-if="column.isShow === undefined || (typeof column.isShow === 'boolean' && column.isShow) || (typeof column.isShow === 'function' && column.isShow())"
            :key="index"
            v-bind="column.props"
            :prop="column.key"
            :label="column.label"
            :align="column.align || 'left'"
            :width="column.width"
            :show-overflow-tooltip="column.tooltip"
          >
            <template slot-scope="scope">
              <!-- 自定义插槽 -->
              <template v-if="column.slot">
                <slot :name="column.key" :row="scope.row" :index="index" :rowIndex="scope.$index"></slot>
              </template>
              <!-- 自定义模板 -->
              <template v-else-if="column.render && ((options.dynamic && scope.row.edit) || !options.dynamic)">
                <render :column="column" :row="scope.row" :render="column.render" :index="index" :rowIndex="scope.$index" />
              </template>
              <!-- 自定义文本格式，可绑定点击事件，支持html标签 -->
              <template v-else-if="column.formatter">
                <span
                  :style="column.click ? 'color: #0074FF; cursor: pointer;' : null"
                  @click="column.click && column.click(scope.row, scope.$index)"
                  v-html="column.formatter(scope.row, scope.row[column.key], scope.$index)"
                />
              </template>
              <!-- 自定义路由跳转 -->
              <template v-else-if="column.router">
                <router-link
                  class="newjump"
                  v-bind="{ target : '_blank', ...column.target }"
                  :to="column.router(scope.row, scope.row[column.key], scope.$index)"
                >{{ renderCell(scope.row, column) }}</router-link>
              </template>
              <!-- 默认属性值 -->
              <template v-else>
                <span
                  :style="column.click ? 'color: #0074FF; cursor: pointer;' : null"
                  @click="column.click && column.click(scope.row, scope.$index)"
                >
                  {{ renderCell(scope.row, column) }}
                </span>
              </template>
            </template>
          </el-table-column>
        </template>

        <!-- 操作按钮 -->
        <el-table-column
          v-if="operates && operates.length > 0"
          :label="options.operatesLabel || '操作'"
          :align="options.operatesAlign || 'left'"
          :width="options.operatesWidth"
          v-bind="options.operatesProps"
        >
          <template slot-scope="scope">
            <div class="operate-group">
              <template v-for="(btn, key) in operates">
                <span
                  v-if="btn.isShow === undefined || (typeof btn.isShow === 'boolean' && btn.isShow) || (typeof btn.isShow === 'function' && btn.isShow(scope.row, scope.$index))"
                  :key="key"
                >
                  <el-popconfirm v-if="btn.popConfirm" :title="btn.popConfirmText || '确认删除？'" @confirm="btn.click(scope.row, scope.$index)">
                    <el-button
                      slot="reference"
                      :size="btn.size || 'medium'"
                      :type="btn.type || `text`"
                      :class="btn.class"
                      :icon="btn.icon"
                      :plain="btn.plain"
                      :disabled="btn.disabled && btn.disabled(scope.row, scope.$index)"
                    >{{ btn.label }}</el-button>
                  </el-popconfirm>
                  <el-button
                    v-else
                    :size="btn.size || 'medium'"
                    :type="btn.type || `text`"
                    :class="btn.class"
                    :icon="btn.icon"
                    :plain="btn.plain"
                    :disabled="btn.disabled && btn.disabled(scope.row, scope.$index)"
                    @click.native.prevent="btn.click(scope.row, scope.$index)"
                  >{{ btn.label }}</el-button>
                </span>
              </template>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <!-- table end -->
    </div>
    <!-- pagination -->
    <pagination
      :hidden="pagination.hidden"
      :total="dataTotal"
      :page-no.sync="pagination.pageNo"
      :page-size.sync="pagination.pageSize"
      :page-sizes="pagination.pageSizes"
      :layout="pagination.layout"
      :background="pagination.background"
      @paginationChange="handlePageChange"
    />
  </div>
</template>

<script>
import Pagination from '@/components/pagination' // Secondary package based on el-pagination

// Auth：吴环宇 <br>
// Desc：基于el-table表格（静态表格）的二次封装 <br>
// Demo：project/index.vue
export default {
  name: 'TableList',
  components: {
    Pagination,
    render: {
      functional: true,
      props: {
        row: Object,
        render: Function,
        index: Number,
        rowIndex: Number,
        column: {
          type: Object,
          default: null
        }
      },
      render: (h, opt) => {
        const params = {
          row: opt.props.row,
          index: opt.props.index,
          rowIndex: opt.props.rowIndex
        }
        if (opt.props.column) params.column = opt.props.column
        return opt.props.render(h, params)
      }
    }
  },
  props: {
    // 表格数据源
    dataSource: {
      type: Array,
      default: () => []
    },
    // 表格列配置 <br>
    // [{ <br>
    //  key: '', //列key <br>
    //  label: '', //列名 <br>
    //  width: '100', //列宽 <br>
    //  align: 'left/center/right', //对齐 <br>
    //  tooltip: '', //内容超出时显示的tooltip <br>
    //  isShow: Boolean/() => {}, //是否显示 <br>
    //  render: (h, params) => {} //单元格渲染自定义组件，优先级第一 <br>
    //  formatter: (row, value, index) => {} //单元格渲染自定义格式内容，支持html格式，优先级第二 <br>
    //  router: (row, value, index) => {} //单元格渲染带路由跳转的文本，返回一个路由地址path，优先级第三 <br>
    //  target: {} //用于绑定router-link组件的原生属性，仅针对配置了router时有效 <br>
    //  content: '' //单元格渲染的默认内容，仅针对row[key]等于null或undefined时有效 <br>
    //  click: (row, index) => {} //单元格内容绑定单击事件 <br>
    //  props: {} //用于表格普通列绑定el-table-column原生属性 <br>
    // }]
    columns: {
      type: Array,
      default: () => []
    },
    border: {
      type: Boolean,
      default: false
    },
    // 加载等待
    loading: {
      type: Boolean,
      default: false
    },
    // 操作栏按钮配置 <br>
    // [{ <br>
    //  isShow: Boolean/(row, index) => {}, //是否显示 <br>
    //  size: 'medium', //Button尺寸 <br>
    //  type: 'text', //Button类型 <br>
    //  icon: '', //Button的icon图标 <br>
    //  plain: false, //Button是否朴素样式 <br>
    //  disabled: Boolean/(row, index) => {}, //Button是否禁用 <br>
    //  click: (row, index) => {} //Button绑定单击事件 <br>
    //  popConfirm: false //Button是否需要popConfirm确认（一般用于删除） <br>
    //  popConfirmText: '确认删除' //popConfirm的提示文字，仅popConfirm等于true时有效 <br>
    // }]
    operates: {
      type: Array,
      default: () => []
    },
    // 表格属性配置 <br>
    // { <br>
    //  rowKey: 'id', //绑定每一行的关键key，如果是单选框的表格此项必须配置（默认为'id'） <br>
    //  isRadio: false, //是否为单选表格，优先级高于isCheckbox <br>
    //  isRadioDisabled: (row, index) => {} , //配置行内radio禁用 <br>
    //  isCheckbox: false, //是否为多选表格 <br>
    //  isCheckboxEnabled: (row, index) => {}, //配置行内checkbox可用 <br>
    //  isIndex: false, //是否显示"序号"列 <br>
    //  indexAlign: 'left/center/right', //"序号"列对齐方式 <br>
    //  indexLabel: '序号', //"序号"列名称 <br>
    //  operatesAlign: 'left/center/right', //操作列对齐方式 <br>
    //  operatesLabel: '操作', //操作列名称 <br>
    //  operatesWidth: '100', //操作列宽度 <br>
    //  operatesProps: {} //用于操作列绑定el-table-column原生属性 <br>
    // }
    options: {
      type: Object,
      default: () => ({})
    },
    // 分页器总数
    dataTotal: {
      type: Number,
      default: 0
    },
    // 分页器配置
    pagination: {
      type: Object,
      default: () => ({
        pageNo: 1,
        pageSize: 10,
        pageSizes: [10, 20, 30],
        layout: 'total, sizes, prev, pager, next, jumper',
        background: true,
        hidden: false
      })
    }
  },
  data() {
    return {
      rowKeyDefault: 'id',
      defaultRadioSelected: '', // radio默认选中, 选中行的rowKey值
      singleSelectedIndex: null,
      singleSelected: null,
      multipleSelected: []
    }
  },
  watch: {
    dataSource(newVal) {
      // 设置单选框选中逻辑
      // dataSource中必须含有配的rowKey字段
      if (this.options && this.options.isRadio) {
        this.calcSelectedItem()
      }
    }
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 === 0) {
        return ''
      }
      return 'row-odd-bg'
    },
    indexMethod(index) {
      if (this.pagination.hidden) {
        return index + 1
      } else {
        return (this.pagination.pageNo - 1) * this.pagination.pageSize + (index + 1)
      }
    },
    renderCell(row, column) {
      return (row[column.key] === null || row[column.key] === undefined) ? column.content : row[column.key]
    },
    handlePageChange(page) {
      // 当分页器页发生改变时触发该事件
      // @arg {Object} 分页参数
      this.$emit('paginationChange', page)
    },
    handleRadioChange(row, index) {
      this.singleSelected = row
      // 当单选表格的单选框的选中发生改变时触发该事件
      // @arg {Object} 被选中的单选框的行和索引
      this.$emit('radioSelectChange', { row, index })
    },
    handleSelectionChange(val) {
      this.multipleSelected = val
      // 当多选表格的复选框的选中发生改变时触发该事件
      // @arg {Array} 被选中的复选框集合
      this.$emit('checkboxSelectChange', val)
    },
    // 计算单选框选中
    calcSelectedItem(rowKeyVal) {
      const rowKey = this.options.rowKey || this.rowKeyDefault
      const hasSelectedValue = this.singleSelected ? this.singleSelected[rowKey] : ''
      const rowKeyValue = rowKeyVal || hasSelectedValue || this.defaultRadioSelected
      const { row, rowIndex } = this.getRowItem(rowKeyValue)
      if (rowIndex >= 0) {
        this.setRadioSelect(row, rowIndex)
      } else {
        this.singleSelectedIndex = null
      }
    },
    // 设置单选框选中
    setRadioSelect(row, index) {
      this.singleSelectedIndex = index
      this.singleSelected = row
    },
    /**
     * @vuese
     * 用于获取当前分页器参数
     */
    getPagination() {
      return { ...this.pagination }
    },
    /**
     * @vuese
     * 用于设置当前分页器参数
     */
    setPagination(pageConfig) {
      for (const keys in pageConfig) {
        if (Object.hasOwnProperty.call(pageConfig, keys)) {
          const pageValue = pageConfig[keys]
          this.pagination[keys] = pageValue
        }
      }
    },
    /**
     * @vuese
     * 用于获取某行数据
     * @arg @rowKeyVal {String}: rowKey值
     */
    getRowItem(rowKeyVal) {
      const rowKey = this.options.rowKey || this.rowKeyDefault
      const rowIndex = this.dataSource.findIndex(item => item[rowKey] === rowKeyVal)
      const row = this.dataSource.find(item => item[rowKey] === rowKeyVal)
      return { row, rowIndex }
    },
    /**
     * @vuese
     * 用于设置某几行数据为选中状态
     * @arg @rows {String/Array}: rowKey值或集合，单选模式下为字符串格式，多选模式下为数组格式
     */
    setSelected(rows) {
      if (this.options.isRadio && rows) {
        this.defaultRadioSelected = rows
        this.calcSelectedItem(rows)
      } else if (this.options.isCheckbox) {
        rows.forEach(element => {
          const { row } = this.getRowItem(element)
          this.$refs.etable.toggleRowSelection(row, true)
        });
      }
    },
    /**
     * @vuese
     * 用于获取当前所有选中的行数据
     */
    getSelected() {
      if (this.options && this.options.isRadio) {
        return this.singleSelected
      } else if (this.options && this.options.isCheckbox) {
        return this.multipleSelected
      }
      return null
    },
    /**
     * @vuese
     * 用于清除当前所有选中
     */
    clearSelected() {
      this.defaultRadioSelected = ''
      this.singleSelectedIndex = null
      this.singleSelected = null
      this.$refs.etable.clearSelection()
    },
    /**
     * @vuese
     * 用于取消某一行数据的选中状态，仅多选模式使用
     * @arg @rowKeyVal {String}: rowKey值
     */
    clearRowSelected(rowKeyVal) {
      const rowKey = this.options.rowKey || this.rowKeyDefault
      const { row } = this.getRowItem(rowKeyVal)
      this.$refs.etable.toggleRowSelection(row, false)
      this.multipleSelected = this.multipleSelected.filter(item => item[rowKey] !== rowKeyVal)
    }
  }
}
</script>

<style lang="scss">

.custom-table {
  padding-bottom: 20px;
  background-color: #fff;
  // .custom-table-header {
  //   background: rgb(129, 127, 127);
  // }
  .el-table {
    color: rgba(0,0,0,0.9);
  }
  .none-bordered {
    border: 1px solid #EBEEF5;
    border-bottom: none;
  }
  .operate-group .el-button {
    margin-right: 5px;
  }
}

</style>
