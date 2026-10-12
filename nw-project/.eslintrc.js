/*
 * @Author: zoujp
 * @Date: 2021-11-30 16:21:40
 * @LastEditTime: 2024-12-22 09:31:44
 * @LastEditors: zoujp
 * @Description:
 * @FilePath: \THAuthorization-Services-Client\.eslintrc.js
 */
module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ["plugin:vue/essential", "eslint:recommended"],
  rules: {
    "no-console": "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    //"comma-dangle": [2, "never"], // 尾逗号
    quotes: ["error", "double"], // 双引号
    "vue/valid-v-for": 0,
    "vue/no-template-key": 0,
    "no-plusplus": 0, // ++ --
    "no-underscore-dangle": 0, // 悬挂下划线
    "no-param-reassign": 0, // 修改或重新分配引起的意外行为
    "linebreak-style": [0, "error", "windows"], // 换行符
    "import/extensions": "off",
    "max-len": ["error", 1000], // 单行最大长度
    "default-case": "off",
    //"space-before-function-paren": ["error", "never"],
    "no-restricted-globals": "off", // 全局变量
    "no-unused-expressions": "off", // 逻辑表达式
    "no-nested-ternary": "off", // 嵌套三元表达式
    "no-shadow": "off", // 变量重复问题
    "import/prefer-default-export": "off", // 只导出一个的时候，必须用default
    "prefer-destructuring": ["error", { array: false }], // 解构
    "class-methods-use-this": "off", // class 方法关闭 强制used this
    "template-curly-spacing": "off", // 允许花括号空格
    "vue/no-mutating-props": "off",
    "no-sparse-arrays": "off",
  },
  parserOptions: {
    parser: "babel-eslint",
    ecmaFeatures: {
      legacyDecorators: true,
    },
  },
  globals: {
    Mock: true,
    JSEncrypt: true,
  },
};
