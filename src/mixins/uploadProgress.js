/*
 * @Author: zoujp
 * @Date: 2024-08-02 15:29:20
 * @LastEditTime: 2025-01-07 14:14:39
 * @LastEditors: zoujp
 * @Description: 上传进度提示
 * @FilePath: \THDataPortCloudWeb\src\views\as\mixins\uploadProgress.js
 */
import _ from "lodash"
const uploadProgressMixin = {
  data() {
    return {}
  },
  methods: {
    handleChange(uploadRef = "upload", listKey = "fileList") {
      const files = this.$refs[uploadRef].$refs.uploadRef.uploadFiles
      const res = _.cloneDeep(files)
      const _files = []
      res.forEach((ele) => {
        if (ele.status === "success" && ele.percentage == 100) {
          _files.push({ name: ele.name, url: ele.response.data.link })
        } else {
          _files.push({ ...ele })
        }
      })
      this[listKey] = _files
    },
    verifyUploadProgress(listKey = "fileList") {
      const has = this[listKey].some((ele) => typeof ele.percentage !== "undefined")
      if (has) {
        this.$message.warning("请等待上传完成")
        return false
      }
      return true
    }
  }
}
export default uploadProgressMixin
