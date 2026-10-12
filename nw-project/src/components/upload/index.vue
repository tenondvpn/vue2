<!--
  * @Description: 上传业务组件
  * @author liumengniu
  * @date 2021/8/30
-->

<template>
  <div>
    <el-upload
      ref="uploadRef"
      :class="{ 'upload-disabled': disabled }"
      v-bind="$attrs"
      v-on="$listeners"
      :action="action"
      :headers="headers"
      :accept="accept"
      :list-type="listType"
      :limit="limit"
      :disabled="disabled"
      :file-list="fileList"
      :before-upload="handleBeforeUpload"
      :on-preview="onPreview"
      :on-success="onSuccess"
      :on-error="onError"
      :on-remove="onRemove"
      :on-exceed="onExceed"
      :on-change="onChange"
    >
      <slot name="upload-body"> </slot>
      <div slot="tip" class="upload-tip">
        {{ tip }}
      </div>
    </el-upload>
    <ImageViewer
      v-if="showViewer"
      :on-close="
        () => {
          showViewer = false
        }
      "
      :url-list="urlList"
      :initialIndex="initialIndex"
      :zIndex="99999"
      :maskClosable="true"
    ></ImageViewer>
  </div>
</template>

<script>
import website from "@/config/website"
import { getToken } from "@/util/auth"
import { Base64 } from "js-base64"
import { validFileType, validFileSize } from "@/util/validate"
import { deepClone, downloadFile, formatUrl } from "@/util/util"
export default {
  props: {
    action: {
      type: String,
      default: "/api/thdata-platform/upload/put-object?type=3",
    },
    // http://lk.thdlake.com:40002
    headers: {
      type: Object,
      default: () => ({
        Authorization: `Basic ${Base64.encode(`${website.clientId}:${website.clientSecret}`)}`,
        "Blade-Auth": `bearer ${getToken()}`
      })
    },
    value: {
      type: String,
      default: ""
    },
    accept: {
      type: String
    },
    size: {
      type: Number
    },
    limit: {
      type: Number,
      default: 10
    },
    tip: {
      type: String,
      default: ""
    },
    listType: {
      type: String,
      default: "text"
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    isPictureType() {
      return this.listType == "picture-card" || this.listType == "picture"
    },
    uploadList: {
      get() {
        let arr = this.value ? JSON.parse(this.value) : []
        if (this.isPictureType) {
          arr.map((item) => {
            if (!(item.url.startsWith("http") || item.url.startsWith("https"))) {
              item.url = formatUrl(item.url)
            }
            return {
              ...item
            }
          })
        }
        return arr
      },
      set(val) {
        let inputValue = ""
        if (val.length) {
          inputValue = JSON.stringify(
            val.map((item) => {
              return {
                url: item.url,
                name: item.name
              }
            })
          )
        }
        this.$emit("input", inputValue)
      }
    },
    urlList() {
      return this.uploadList.map((item) => item.url)
    }
  },
  watch: {
    value: {
      handler(val) {
        if (val && !this.flag && !this.successFlag) {
          // 第一次回显赋值
          this.fileList = this.uploadList
          this.flag = true
        } else if (!val) {
          if (this.removeFlag) {
            // 通过删除按钮被清空
            this.removeFlag = false
          } else {
            // 通过业务层清空
            this.clearFiles()
          }
        }
      },
      immediate: true
    }
  },
  data() {
    return {
      website,
      showViewer: false,
      initialIndex: 0,
      fileList: [],
      flag: false, // 通过此变量控制业务层回显赋值和清空列表
      successFlag: false, // 通过此变量保证不触发watch中的赋值语句
      removeFlag: false // 通过此变量保证不触发watch中的清空语句
    }
  },
  methods: {
    /**
     * 上传前检查
     */
    handleBeforeUpload(file) {
      let res = true
      if (res && this.accept) {
        res = validFileType(file, this.accept, this.$message.warning)
      }
      if (res && this.size) {
        res = validFileSize(file, this.size, this.$message.warning)
      }
      return res
    },
    onPreview(file) {
      let fileUrl, fileName
      if (file.response) {
        fileUrl = file.response.data.link
        fileName = file.response.data.originalName
      } else {
        fileUrl = file.url
        fileName = file.name
      }
      if (this.isPictureType) {
        this.initialIndex = this.uploadList.findIndex((item) => item.url.indexOf(fileUrl) > -1)
        this.showViewer = true
      } else {
        this.$message("开始下载，请稍候...")
        downloadFile(fileUrl, fileName, file.id)
      }
      this.$emit("onPreview", file)
    },
    onSuccess(res) {
      this.successFlag = true // 保证不触发watch中的赋值fileList语句
      const { link, originalName } = res.data
      const url = this.isPictureType ? formatUrl(link) : link
      this.uploadList = [...this.uploadList, { name: originalName, url }]
      this.$emit("onSuccess", res)
    },
    onRemove(file) {
      let fileUrl
      if (file.response) {
        fileUrl = this.isPictureType ? formatUrl(file.response.data.link) : file.response.data.link
      } else {
        fileUrl = file.url
      }
      const i = this.uploadList.findIndex((item) => item.url == fileUrl)
      if (i > -1) {
        this.removeFlag = true // 保证不触发watch中的清空语句
        let arr = deepClone(this.uploadList)
        arr.splice(i, 1)
        this.uploadList = arr
        this.$emit("onRemove", { file })
      }
    },
    onExceed(files, fileList) {
      this.$message.warning(`最多选择${this.limit}个文件`)
      this.$emit("onExceed", { files, fileList })
    },
    onChange(file, fileList) {
      this.$emit("onChange", { file, fileList })
    },
    onError(err) {
      this.$emit("onError", err)
    },
    submit() {
      this.$refs.uploadRef && this.$refs.uploadRef.submit()
    },
    clearFiles() {
      this.$refs.uploadRef && this.$refs.uploadRef.abort()
      this.$refs.uploadRef && this.$refs.uploadRef.clearFiles()
    }
  }
}
</script>

<style lang="scss" scoped>
.upload-tip {
  color: #606266;
  line-height: 24px;
}
.upload-disabled {
  ::v-deep .el-upload {
    display: none;
  }
}
/* 去除 el-upload 文件列表的动画效果 */
::v-deep .el-upload-list__item {
  transition: none !important;
}

::v-deep .el-upload-list__item.is-success,
::v-deep .el-upload-list__item.is-error {
  animation: none !important;
}
</style>
