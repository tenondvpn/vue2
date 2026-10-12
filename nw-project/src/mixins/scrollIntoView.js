const scrollIntoView = {
  data() {
    return {}
  },
  methods: {
    scrollToError() {
      this.$nextTick(() => {
        const ele = this.$refs.addWrap.querySelector(".el-form-item__error")
        if (ele) {
          ele.scrollIntoView({ behavior: "smooth", block: "center" })
        }
      })
    }
  }
}
export default scrollIntoView
