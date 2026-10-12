/*
 * @Author: why
 * @Date: 2025-01-13 10:50:55
 * @LastEditors: why
 * @LastEditTime: 2025-03-11 15:18:36
 * @Description: 
 */
export default {
  getObj: (arrayList, value) => {
    const obj = arrayList.find((ele) => ele.valueKey == value)
    return obj || {}
  },
  registerTypeList: [
    { value: "个人注册", label: "个人用户", valueKey: 1 },
    { value: "法人注册", label: "企业用户", valueKey: 2 }
  ],
  legalPersonTypeList: [
    {
      value: "普通公司（含“个体工商户”）",
      label: "普通公司（含“个体工商户”）",
      valueKey: 1
    },
    { value: "香港公司", label: "香港公司", valueKey: 2 },
    { value: "社会组织", label: "社会组织", valueKey: 3 },
    { value: "律所", label: "律所", valueKey: 4 },
    { value: "事业单位", label: "事业单位", valueKey: 5 },
    { value: "基金会", label: "基金会", valueKey: 6 },
    { value: "新机构类型", label: "新机构类型", valueKey: 9 },
    { value: "政府机关", label: "政府机关", valueKey: 10 }
  ],
  certificateTypeList: [
    { value: "身份证", label: "身份证", valueKey: 1 },
    {
      value: "港澳居民来往内地通行证",
      label: "港澳居民来往内地通行证",
      valueKey: 2
    },
    {
      value: "台湾居民来往大陆通行证",
      label: "台湾居民来往大陆通行证",
      valueKey: 3
    },
    {
      value: "外国人永久居留身份证",
      label: "外国人永久居留身份证",
      valueKey: 4
    },
    {
      value: "外国人居留证或居留许可",
      label: "外国人居留证或居留许可",
      valueKey: 5
    }
  ],
  sexList: [
    { value: "男", label: "男", valueKey: 1 },
    { value: "女", label: "女", valueKey: 2 }
  ],
  eleTypeList: [
    { label: "数据", valueKey: 0, icon: "/img/pages/home/ele_data.png" },
    { label: "算力", valueKey: 2, icon: "/img/pages/home/ele_computing.png" },
    { label: "模型", valueKey: 1, icon: "/img/pages/home/ele_model.png" },
  ],
  applicationSceneList: [
    { value: "能源", label: "能源", valueKey: "能源" },
    { value: "交通", label: "交通", valueKey: "交通" },
    { value: "医疗", label: "医疗", valueKey: "医疗" },
  ],
  dataTypeList: [
    { value: "文本", label: "文本", valueKey: "文本" },
    { value: "图片", label: "图片", valueKey: "图片" },
    { value: "图文", label: "图文", valueKey: "图文" },
    { value: "视频", label: "视频", valueKey: "视频" },
  ],
  modelTypeList: [
    { value: "deepseekR1", label: "deepseekR1", valueKey: "deepseekR1" },
    { value: "PaddleOCR", label: "PaddleOCR", valueKey: "PaddleOCR" },
  ],
  gpuTypeList: [
    { value: "A100", label: "A100", valueKey: "A100" },
    { value: "H100", label: "H100", valueKey: "H100" },
    { value: "A800", label: "A800", valueKey: "A800" },
    { value: "H800", label: "H800", valueKey: "H800" },
    { value: "H20", label: "H20", valueKey: "H20" },
  ],
  gpuCountList: [
    { value: "1-5", label: "1-5", valueKey: "1-5" },
    { value: "5-8", label: "5-8", valueKey: "5-8" },
    { value: "8-10", label: "8-10", valueKey: "8-10" },
    { value: "10-20", label: "10-20", valueKey: "10-20" },
    { value: "20-50", label: "20-50", valueKey: "20-50" },
  ],
  storageSizeList: [
    { value: "100G以下", label: "100G以下", valueKey: "0-100" },
    { value: "100-200G", label: "200-500G", valueKey: "100-200" },
    { value: "500-800G", label: "500-800G", valueKey: "500-800" },
    { value: "800-1000G", label: "800-1000G", valueKey: "800-1000" },
    { value: "1T以上", label: "1T以上", valueKey: "1000-" },
  ],
  selledStatus: [
    { value: "竞价中", label: "竞价中", valueKey: 0 },
    { value: "完成竞价", label: "完成竞价", valueKey: 1 },
  ],
}
