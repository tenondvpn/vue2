<!--
 * @Author: why
 * @Date: 2023-06-07 14:42:50
 * @LastEditors: zoujp
 * @LastEditTime: 2024-12-26 17:16:28
 * @Description: 附件列表-下载
-->
<template>
  <div class="file-container" :style="{ 'max-width': maxWidth }">
    <template v-if="fileList.length && fileList[0][normalize.url] != ''">
      <div v-for="fileItem in fileList" :key="fileItem[normalize.url]" class="file-item">
        <span :title="fileItem[normalize.name]" @click="download(fileItem)">{{ fileItem[normalize.name] }}</span>
      </div>
    </template>
    <template v-else>
      <div>无</div>
    </template>
  </div>
</template>

<script>
import { downloadFile } from "@/util/util"
export default {
  name: "FileList",
  props: {
    file: {},
    normalize: {
      type: Object,
      default: () => ({
        name: "name",
        url: "url"
      })
    },
    maxWidth: {
      type: String,
      default: "500px"
    },
    isDownloadByHref: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    fileList() {
      try {
        if (!this.file) return []
        if (typeof this.file === "object") {
          return [this.file]
        } else if (Array.isArray(this.file)) {
          return this.file || []
        } else {
          const fileList_json = this.file ? JSON.parse(this.file) : []
          return Array.isArray(fileList_json) ? fileList_json : []
        }
      } catch (error) {
        console.log(error)
        return []
      }
    }
  },
  methods: {
    async download(file) {
      downloadFile(file[this.normalize.url], file[this.normalize.name])
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";

.file-container {
  .file-item {
    width: 100%;
    @include autoWrap;
    span {
      color: $theme;
      cursor: pointer;
      &:hover {
        color: #66b1ff;
        text-decoration: underline;
      }
    }
    &:not(:last-child) {
      padding-bottom: 10px;
    }
  }
}
</style>
