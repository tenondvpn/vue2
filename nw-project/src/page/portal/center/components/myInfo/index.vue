<!--
 * @Author: why
 * @Date: 2024-07-18 09:19:35
 * @LastEditors: why
 * @LastEditTime: 2025-03-10 11:12:28
 * @Description:
-->
<template>
  <div>
    <div class="info-module">
      <div class="info-register">
        <img src="/img/pages/header/user-2x.png"></img>
        <div class="info-register-content">
          <el-descriptions :column="1" :label-style="{ width: '0.416667rem' }">
            <el-descriptions-item label="链上ID">{{ userInfo.id }}</el-descriptions-item>
            <el-descriptions-item label="秘钥">{{ token }}</el-descriptions-item>
          </el-descriptions>
        </div>
      </div>
    </div>
    <!-- <resetPswd ref="resetPswdRef"></resetPswd>
    <editInfo ref="editInfoRef" @close="handleRefresh" />
    <editPhone ref="editPhoneRef" @close="handleRefresh" /> -->
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import config from "@/config/variable"
import resetPswd from "./resetPswd.vue"
import editInfo from "./editInfo.vue"
import editPhone from "./editPhone.vue"
import getUserInfo from "@/mixins/getUserInfo"

export default {
  name: "Account",
  components: { resetPswd, editInfo, editPhone },
  mixins: [getUserInfo],
  computed: {
    ...mapGetters(["userInfo", "token"]),
  },
  data() {
    return {
      formData: {},
      loading: false,
      loadingDetail: true,
      total: 0,
      options: {
        // 表格配置,支持el-table原生属性
        isIndex: false,
        operatesWidth: 180
      },
    }
  },
  created() {
  },
  methods: {
    getObj: config.getObj,
    handleReset() {
      this.$refs.resetPswdRef.open()
    },
    handleEditInfo() {
      this.$refs.editInfoRef.open(this.formData)
    },
    handleEditPhone() {
      this.$refs.editPhoneRef.open(this.formData)
    },
    async handleRefresh() {
      await this.getClientUserInfo()
      this.getInfo()
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";
.info-module {
  .info-register {
    display: flex;
    align-items: center;
    img {
      width: .333333rem /* 64/192 */;
      height: .333333rem /* 64/192 */;
    }
    &-content {
      margin-left: .083333rem /* 16/192 */;
      ::v-deep .el-descriptions :not(.is-bordered) .el-descriptions-item__cell {
        padding: .026042rem /* 5/192 */ 0;
      }
    }
  }
}
</style>
