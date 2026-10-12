<!--
 * @Author: why
 * @Date: 2024-04-10 10:35:22
 * @LastEditors: why
 * @LastEditTime: 2024-04-10 11:02:45
 * @Description: div懒加载容器
-->
<template>
  <div
    v-if="!lazy || loaded || show"
    v-show="show"
    :aria-hidden="!show"
  >
    <slot></slot>
  </div>
</template>
<script>
  export default {
    name: "LazyWrap",
    props: {
      show: Boolean,
      lazy: Boolean
    },

    data() {
      return {
        loaded: false
      };
    },

    watch: {
      show(val) {
        if (val && !this.loaded) {
          this.loaded = true;
        }
      }
    }
  };
</script>
