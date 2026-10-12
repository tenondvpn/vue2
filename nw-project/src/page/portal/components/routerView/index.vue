<template>
  <keep-alive :include="aliveRoutes">
    <router-view class="avue-view" @scrollPosition="updateScroll"></router-view>
  </keep-alive>
</template>

<script>
import {mapGetters} from "vuex";
export default {
  computed: {
    ...mapGetters(["aliveRoutes"]),
  },
  methods: {
    updateScroll(top) {
      this.$emit('scrollPosition', top);
    }
  }
}
</script>

<style>

</style>