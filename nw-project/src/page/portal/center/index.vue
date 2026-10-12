<!--
 * @description: 描述信息
 * @Author: Cheng kaixuan
 * @Date: 2024-07-03 11:05:52
 * @LastEditors: why
 * @LastEditTime: 2025-01-13 11:11:14
-->
<template>
    <component :is="getView"></component>
  </template>
  
  <script>
    import PC from './pc.vue'
    import Phone from './phone.vue' 
    export default {
      name: "PortalCenter",
      components: {
        PC,
        Phone
      },
      
      computed: {
        getView() {
          return this.isPhone ? 'Phone' : 'PC'
        }
      },
      data() {
        return {
        };
      },
      
      mounted() {
        console.log(this.isPhone);
      }
    }
  
  </script>
  
  <style lang="scss" scoped>
  
  </style>