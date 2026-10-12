/*
 * @Author: why
 * @Date: 2024-12-20 09:09:09
 * @LastEditors: why
 * @LastEditTime: 2025-01-03 10:34:21
 * @Description: 
 */
import { formatUrl, downloadFile } from "@/util/util"
import { getProtocolTempDetail } from "@/api/common"
export default {
  props: {
    protocolShow: {
      type: Array,
      default: () => [1, 2, 3]
    }
  },
  computed: {
    protocolList_show() {
      return this.protocolList.filter(pro => this.protocolShow.includes(pro.type))
    }
  },
  data() {
    return {
      protocolList: [
        { label: "数据安全保障承诺书", type: 1, code: "dataSecurityCommitmentProtocol" },
        { label: "保密协议", type: 2, code: "confidentialityAgreementProtocol" },
        { label: "知识产权协议", type: 3, code: "intellectualPropertyAgreementProtocol" },
      ],
      downLoading: false
    };
  },
  methods: {
    viewProtocol(code) {
      this.$refs.protocolDlg.open(code)
    },
    downTemp(code) {
      if (this.downLoading) {
        return
      }
      this.downLoading = true
      getProtocolTempDetail({ templateCode: code }).then(res => {
        const data = res.data.data
        const urlInfo = data.url ? JSON.parse(data.url) : []
        const { url, name } = urlInfo[0] || {}
        downloadFile(formatUrl(url), name, true)
        this.downLoading = false
      }).catch(() => {
        this.downLoading = false
      })
    }
  }
}