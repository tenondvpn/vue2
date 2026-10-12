<!--
 * @description: 描述信息
 * @Author: Cheng kaixuan
 * @Date: 2024-07-02 14:30:33
 * @LastEditors: why
 * @LastEditTime: 2025-02-13 15:52:43
-->
<template>
  <component :is="getView"></component>
</template>

<script>
  import PCHome from './pc.vue'
  import PhoneHome from './phone.vue' 
  export default {
    name: "PortalHome",
    components: {
      PCHome,
      PhoneHome
    },
    
    computed: {
      getView() {
        return this.isPhone ? 'PhoneHome' : 'PCHome'
      }
    },
  }

</script>

<style lang="scss" scoped>

</style>