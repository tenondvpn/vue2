<!--
 * @description: 描述信息
 * @Author: Cheng kaixuan
 * @Date: 2024-03-05 19:33:01
 * @LastEditors: why
 * @LastEditTime: 2024-08-01 15:41:29
-->
<template>
    <component :is="getView"></component>
  </template>
  
  <script>
    import PCHeader from './pc.vue'
    import PhoneHeader from './phone.vue' 
    export default {
      components: {
        PCHeader,
        PhoneHeader
      },
      
      computed: {
        getView() {
          return this.isPhone ? 'PhoneHeader' : 'PCHeader'
        }
      },
    }
  
  </script>
  
  <style lang="scss" scoped>
  
  </style>