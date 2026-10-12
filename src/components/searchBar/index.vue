<!--
 * @description: 描述信息
 * @author: hujialiang
 * @Date: 2024-12-05 15:50:07
 * @LastEditors: why
 * @LastEditTime: 2024-12-24 09:37:26
-->
<template>
  <div>
    <el-input
      class="custom-input"
      v-model="dataValue"
      v-bind="$attrs"
      @input="onInput"
      @clear="hansleSearch"
      @keyup.enter.native="hansleSearch"
      clearable
    >
      <template slot="append">
        <div class="append-box" @click="hansleSearch">
          <i class="icon el-icon-search"></i>
        </div>
      </template>
    </el-input>
  </div>
</template>

<script>
export default {
  name: "SearchBar",
  props: {
    value: {
      type: String,
      default: "",
    },
  },
  computed: {
    dataValue: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      },
    },
  },
  methods: {
    hansleSearch() {
      this.$emit("search");
    },
    onInput(e) {
      this.$emit("input", e);
    },
  },
};
</script>

<style lang="scss" scoped>
.custom-input {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 0.041667rem /* 8/192 */;
  border: 1px solid rgba(255, 255, 255, 0.6);
  height: 0.333333rem /* 64/192 */;
  box-sizing: border-box;

  :deep(.el-input__suffix) {
    .el-input__suffix-inner {
      .el-input__clear {
        color: #fff;
      }
    }
  }

  ::v-deep .el-input__inner::placeholder,
  .el-textarea__inner::placeholder {
    color: #fff;
    font-size: 0.083333rem /* 16/192 */;
  }
  ::v-deep .el-input__inner {
    background: none;
    border: none;
    color: #fff;
    height: 100%;
    font-size: 0.083333rem; /* 16/192 */
  }
  ::v-deep .el-input-group__append {
    background: none;
    border: none;
    border-radius: 0 0.041667rem 0.041667rem 0 /* 8/192 */;
  }
  ::v-deep .el-input-group__append,
  .el-input-group__prepend {
    padding-right: 0.046875rem /* 9/192 */;
  }
}
.append-box {
  transition: all 0.3s ease;
  width: 0.25rem /* 48/192 */;
  height: 0.25rem /* 48/192 */;
  background: #d8a781;
  border-radius: 0.041667rem; /* 8/192 */
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  .icon {
    color: #fff;
    font-size: 0.104167rem; /* 20/192 */
  }
}
</style>
