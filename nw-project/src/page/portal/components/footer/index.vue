<!--
 * @description: 描述信息
 * @Author: Cheng kaixuan
 * @Date: 2024-03-05 19:33:01
 * @LastEditors: Cheng kaixuan
 * @LastEditTime: 2024-05-13 14:42:28
-->
<template>
  <component :is="getView"></component>
</template>

<script>
  import PCFooter from './pc.vue'
  import PhoneFooter from './phone.vue' 
  export default {
    components: {
      PCFooter,
      PhoneFooter
    },
    
    computed: {
      getView() {
        return this.isPhone ? 'PhoneFooter' : 'PCFooter'
      }
    },
  }

</script>

<style lang="scss" scoped>

</style>