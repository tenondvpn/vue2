/*
 * @Author: why
 * @Date: 2025-01-07 19:48:10
 * @LastEditors: why
 * @LastEditTime: 2025-01-07 19:56:09
 * @Description: 获取用户信息相关
 */
import { mapGetters } from "vuex";
import { clientGetUserInfo } from "@/api/user";
export default {
  computed: {
    ...mapGetters(["userInfo"]),
  },
  methods: {
    async getClientUserInfo() {
      const res = await clientGetUserInfo({ id: this.userInfo.user_id });
      this.$store.commit("SET_CLIENT_USER_INFO", res.data.data);
    },
  }
}
