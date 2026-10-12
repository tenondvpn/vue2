<!--
 * @Author: why
 * @Date: 2024-07-18 10:38:45
 * @LastEditors: why
 * @LastEditTime: 2024-08-12 14:19:48
 * @Description: 
-->
<template>
  <Dialog
    :visible.sync="dialogVisible"
    title="重置密码"
    width="430px"
    custom-class="reset-pswd-dlg"
    :confirmLoading="confirmLoading"
    @handleConfirm="handleConfirm"
  >
    <template #content>
      <resetPassword v-if="dialogVisible" ref="resetPasswordRef" :isDlg="true"></resetPassword>
    </template>
  </Dialog>
</template>

<script>
import resetPassword from "@/page/portal/resetPassword/index.vue"
import { mapGetters } from "vuex";
export default {
  components: { resetPassword },
  data() {
    return {
      dialogVisible: false,
      confirmLoading: false,
    };
  },
  computed:{
    ...mapGetters(['userInfo']),
    isCompany(){
      return this.userInfo.systemType === 3;
    }
  },
  methods: {
    open() {
      this.dialogVisible = true
    },
    handleConfirm() {
      this.confirmLoading = true
      this.$refs.resetPasswordRef.handleSubmit().then(() => {
        this.confirmLoading = false
        this.dialogVisible = false
      }).catch(() => {
        this.confirmLoading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.reset-pswd-dlg {
  .register-container-bg {
    height: auto;
    background: none;
    ::v-deep .register-form {
      width: 1.770833rem /* 340/192 */ !important;
      padding: 0 !important;
      box-shadow: none !important;
    }
  }
}
</style>