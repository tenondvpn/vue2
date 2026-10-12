/*
 * @description: 描述信息
 * @author: hujialiang
 * @Date: 2024-12-26 17:30:42
 * @LastEditors: hujialiang
 * @LastEditTime: 2024-12-26 17:31:55
 */
export default {
  methods: {
    scrollToBottom(domRef) {
      const element = this.$refs[domRef]
      if (element) {
        element.scrollTo({ top: element.scrollHeight, behavior: "smooth" })
      }
    }
  }
}
