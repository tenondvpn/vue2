/*
 * @Author: zoujp
 * @Date: 2023-08-31 09:40:07
 * @LastEditTime: 2025-01-03 14:30:07
 * @LastEditors: zoujp
 * @Description: 计时器
 * @FilePath: \THAuthorization-Services-Client\src\mixins\timer.js
 */
import { isMobile } from "@/util/validate"
import { sendSms } from "@/api/user"
export default {
  data() {
    return {
      isGetting: false,
      second: 60,
      timer: null
    }
  },
  methods: {
    countTimer() {
      this.timer = setInterval(() => {
        this.second -= 1
        if (this.second <= 0) {
          this.clearTimer()
        }
      }, 1000)
    },
    clearTimer() {
      clearInterval(this.timer)
      this.timer = null
      this.second = 60
      this.isGetting = false
    },
    /**
     * @description: 获取短信验证码
     * @return {*}
     */
    async getSmsCode() {
      if (!this.form.phone) {
        this.$message.warning("请输入手机号码")
        return
      }
      if (this.needVerifyPhone && !isMobile(this.form.phone)) {
        this.$message.warning("手机号码格式不正确")
        return
      }
      try {
        this.isGetting = true
        await sendSms({ phone: this.form.phone, smsSendType: this.type, tenantId: this.tenantId, account: this.form.account || "" })
        this.$message.success("发送成功")
        this.countTimer()
      } catch (e) {
        this.isGetting = false
      }
    }
  }
}
