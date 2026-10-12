# 前端开发规范

## 门户路由缓存

1. 带分页查询、tab切换和跳转二级详情页的主页面都需要在路由配置中开启alive路由缓存。
2. 导航栏中切换页面、从首页跳转至缓存页面都需要调用 `DelAliveRoutes ` 清除路由缓存；
3. 开启了路由缓存的页面，需酌情在activated中执行刷新列表数据（仅刷新当前页不要回到第一页），比如列表页中带有收藏类似操作状态变化的，用户可能会在详情页进行收藏操作，返回后就需要刷新当前页列表数据。

## 附件上传下载

1. 存储格式：单字段存储JSON串 ，文件路径只存相对路径。

   ```javascript
   {
   	file: '[{"url":"/oss/489113-th-file-data/upload/common/20250108/cb64855a5ff6428b1a54ec7cd1c1e80a.docx","name":"匿名投票样例 20240913.docx"}]'
   }
   ```

2. 附件上传全局组件：`<Upload />`  直接使用v-model双向绑定。

3. 附件上传组件使用图片模式时`（listType == 'picture-card' || listType == 'picture'）`，组件内部会将文件相对路径拼接成绝对路径渲染，所以在业务层保存数据时需调用 `import { removePrefixFromUrl } from "@/util/util"` 方法转换为相对路径。

4. 附件列表全局组件：`<FileList />` 

5. 附件下载方法：`import { downloadFile } from "@/util/util"`