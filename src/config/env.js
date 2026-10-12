/*
 * @Author: why
 * @Date: 2025-01-13 10:50:55
 * @LastEditors: why
 * @LastEditTime: 2025-03-11 17:11:21
 * @Description: 
 */
// 阿里矢量图标库配置
let iconfontVersion = ['567566_pwc3oottzol'];
let iconfontUrl = `//at.alicdn.com/t/font_$key.css`;

let baseUrl = '';
let codeUrl = `${baseUrl}/code`
const env = process.env
if (env.NODE_ENV === 'development') {
    baseUrl = `/api`; // 开发环境地址
} else if (env.NODE_ENV === 'production') {
    baseUrl = `/api`; //生产环境地址
} else if (env.NODE_ENV === 'test') {
    baseUrl = ``; //测试环境地址
}
export {
    baseUrl,
    iconfontUrl,
    iconfontVersion,
    codeUrl,
    env
}
