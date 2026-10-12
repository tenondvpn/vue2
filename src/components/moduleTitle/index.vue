<!--
 * @Author: why
 * @Date: 2025-02-06 14:30:43
 * @LastEditors: why
 * @LastEditTime: 2025-02-06 14:53:46
 * @Description: 
-->
<template>
  <div class="title-container">
    {{ title }}
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ""
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/variables.scss';
.title-container {
  display: flex;
  align-items: center;
  font-size: .083333rem /* 16/192 */;
  color: #000000;
  margin-bottom: .125rem /* 24/192 */;
  line-height: .104167rem /* 20/192 */;
  &::before {
    content: "";
    width: .020833rem /* 4/192 */;
    height: .072917rem /* 14/192 */;
    background: $theme;
    margin-right: .041667rem /* 8/192 */;
  }
}
</style>