<!--
 * @description: 描述信息
 * @Author: Cheng kaixuan
 * @Date: 2024-03-05 19:33:01
 * @LastEditors: Cheng kaixuan
 * @LastEditTime: 2024-05-16 17:25:07
-->
<template>
  <component :is="getView" :menuList="menuList"></component>
</template>

<script>
  import PC from './pc.vue'
  import Phone from './phone.vue' 

  export default {
    components: {
      PC,
      Phone
    },
    computed: {
      getView() {
        return this.isPhone ? 'Phone' : 'PC'
      }
    },
  }

</script>

<style lang="scss" scoped>

</style>