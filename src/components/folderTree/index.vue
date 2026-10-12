<template>
  <div class="tree-container">
    <div v-if="showFilter" class="tree-search">
      <el-input class="input-tree" placeholder="请输入搜索关键字" v-model="filterText" size="large" maxlength="64" suffix-icon="el-icon-search"> </el-input>
      <div class="add-wrap">
        <i class="icon iconfont icon-icon_sx1 add-icon" title="刷新" @click="refresh"></i>
      </div>
    </div>
    <div v-if="showButton" class="tree-button">
      <!-- <el-tooltip placement="top">
        <div slot="content">{{ rootTips }}</div> -->
      <span class="tree-button-item" @click="addNode(parentsDefaultId, 0, 'saveRoot', parentsDefaultId)">
        <i class="el-icon-plus"></i>
        添加目录
      </span>
      <!-- </el-tooltip> -->
      <!-- <el-tooltip placement="top">
        <div slot="content">{{ rootTips }}</div> -->
      <span class="tree-button-item" @click="addNode(parentsDefaultId, 1, 'saveRoot', parentsDefaultId)">
        <i class="el-icon-plus"></i>
        添加{{ nodeTypeName }}
      </span>
      <!-- </el-tooltip> -->
    </div>
    <div class="tree-panel" ref="tree-panel" :style="{ height: 'calc(100% - ' + (showButton ? '112px' : '60px') + ')' }">
      <PerfectScrollbar :class="{'tree-panel-scroll': true }">
        <el-tree
          v-loading="treeLoading"
          ref="tree"
          class="filter-tree"
          :data="treeData"
          :props="calcProps"
          :indent="isPhone ? 16 : (htmlFonSize / 10.67)"
          node-key="id"
          highlight-current
          :default-expanded-keys="expandNodeIds"
          :current-node-key="currentNodeId"
          :filter-node-method="filterNode"
          :expand-on-click-node="expandOnClickNode"
          :draggable="draggable"
          :allow-drop="allowDrop"
          :allow-drag="allowDrag"
          @node-drop="handleNodeDrop"
          @node-click="handleNodeClick"
          @node-expand="nodeExpand"
          @node-collapse="nodeCollapse"
        >
          <slot slot-scope="{node, data}" :node="node" :data="data">
            <div class="custom-tree-node" :id="'node_' + data.id">
              <div class="cus-node-icon" v-if="isNodeIcon">
                <!-- <i v-if="data[calcProps.type] === 0" class="icon-type isFolder" :class="node.expanded ? 'icon-opened_folder' : 'icon-folder'" /> -->
                <svg v-if="data[calcProps.type] === 0" class="icon icon-class" aria-hidden="true">
                  <use v-if="folderIconShare && data[calcProps.own] == 0" :xlink:href="'#' + (node.expanded ? 'icon-folder-share-opened' : 'icon-folder-share')"></use>
                  <use v-else :xlink:href="'#' + (node.expanded ? 'icon-opened_folder' : 'icon-folder')"></use>
                </svg>
                <img v-else-if="data[calcProps.icon]" class="icon-class" :src="data[calcProps.icon]" alt="" />
                <svg v-else class="icon icon-class" aria-hidden="true">
                  <use :xlink:href="'#' + nodeTypeIcon"></use>
                </svg>
                <i v-if="data[calcProps.type] === 1 && data.status === 1 && showStatus" class="el-icon-s-tools icon-status"></i>
              </div>
              <div class="cus-node-label" :title="node.label">
                {{ node.label }}<span v-if="data[calcProps.type] === 1 && showCount">（{{ data.count }}）</span>
              </div>
              <div v-if="showMenu && nodeMenuShow(node, data)" class="cus-node-menu">
                <el-popover :ref="'menuPop_' + data.id" placement="right-start" width="120" popper-class="ds-node-menu" trigger="hover">
                  <div class="node-menu-ct">
                    <template v-if="customMenu.length">
                      <div v-for="(memuItem, menuIndex) in customMenu" :key="menuIndex" class="ns-menu" @click="customMenuItemClick(memuItem, node, data)">
                        <div class="menu-icon">
                          <span><i :class="memuItem.icon"></i></span>
                        </div>
                        <div class="menu-text">{{memuItem.label}}</div>
                      </div>
                    </template>
                    <template v-else>
                      <div v-if="data[calcProps.type] === 0" class="ns-menu" @click="addNode(data.id, 0, 'saveSubordinateDir', data.id)">
                        <div class="menu-icon">
                          <span><i class="el-icon-folder-add"></i></span>
                        </div>
                        <div class="menu-text">下级目录</div>
                      </div>
                      <div v-if="data[calcProps.type] === 0" class="ns-menu" @click="addNode(data.id, 0, 'saveEqualDir', data.parentId)">
                        <div class="menu-icon">
                          <span><i class="el-icon-folder-add"></i></span>
                        </div>
                        <div class="menu-text">同级目录</div>
                      </div>
                      <div v-if="data[calcProps.type] === 0" class="ns-menu" @click="addNode(data.id, 1, 'saveSubordinateGroup', data.id)" title="添加至该目录下">
                        <div class="menu-icon">
                          <span><i class="el-icon-plus"></i></span>
                        </div>
                        <div class="menu-text">{{ nodeTypeName }}</div>
                      </div>
                      <div class="ns-menu" @click="editNode(node, 'updateDirOrGroup')">
                        <div class="menu-icon">
                          <span><i class="el-icon-edit"></i></span>
                        </div>
                        <div class="menu-text">编辑</div>
                      </div>
                      <div class="ns-menu" @click="delNode(node)">
                        <div class="menu-icon">
                          <span><i class="el-icon-delete"></i></span>
                        </div>
                        <div class="menu-text">删除</div>
                      </div>
                      <div class="ns-menu" @click="moveupNode(node)">
                        <div class="menu-icon">
                          <span><i class="el-icon-top"></i></span>
                        </div>
                        <div class="menu-text">上移</div>
                      </div>
                      <div class="ns-menu" @click="movedownNode(node)">
                        <div class="menu-icon">
                          <span><i class="el-icon-bottom"></i></span>
                        </div>
                        <div class="menu-text">下移</div>
                      </div>
                      <div v-if="data[calcProps.type] === 1" class="ns-menu" @click="movetoNode(node)">
                        <div class="menu-icon">
                          <span><i class="el-icon-s-unfold"></i></span>
                        </div>
                        <div class="menu-text">移动到</div>
                      </div>
                      <div v-if="data[calcProps.type] === 1 && nodeAuthShow(node, data)" class="ns-menu" @click="setNodeAuth(node)">
                        <div class="menu-icon">
                          <span><i class="el-icon-user"></i></span>
                        </div>
                        <div class="menu-text">管理员</div>
                      </div>
                    </template>
                  </div>
                  <span slot="reference"><i class="el-icon-more"></i></span>
                </el-popover>
              </div>
            </div>
          </slot> 
        </el-tree>
      </PerfectScrollbar>
    </div>
  </div>
</template>

<script>
export default {
  name: "FolderTree",
  props: {
    // 树结构的数据源
    dataSource: {
      type: Array,
      default: () => []
    },
    // 默认选中
    defaultSelect: {
      type: String,
      default: ""
    },
    // 叶子节点类型名称
    nodeTypeName: {
      type: String,
      default: "标准组"
    },
    // 叶子节点默认icon
    nodeTypeIcon: {
      type: String,
      default: "icon-icon_L22"
    },
    // 根节点默认id值
    parentsDefaultId: {
      default: "0"
    },
    // 树加载loading
    treeLoading: {
      type: Boolean,
      default: false
    },
    // 是否在点击节点的时候展开或者收缩节点
    expandOnClickNode: {
      type: Boolean,
      default: false
    },
    // 是否自定义节点icon
    isNodeIcon: {
      type: Boolean,
      default: false
    },
    // 是否校验节点类型
    isValidateNodeType: {
      type: Boolean,
      default: false
    },
    // 是否显示顶部搜索栏
    showFilter: {
      type: Boolean,
      default: false
    },
    // 是否显示顶部操作按钮
    showButton: {
      type: Boolean,
      default: false
    },
    // 是否显示节点操作菜单(统一控制)
    showMenu: {
      type: Boolean,
      default: false
    },
    // 自定义节点操作菜单
    customMenu: {
      type: Array,
      default: () => []
    },
    // 是否叶子节点显示数量
    showCount: {
      type: Boolean,
      default: false
    },
    // 是否叶子节点显示状态标记
    showStatus: {
      type: Boolean,
      default: false
    },
    // 节点是否支持拖拽
    draggable: {
      type: Boolean,
      default: false
    },
    allowDrag: {
      type: Function,
      default: () => {
        return false;
      }
    },
    // 初始化是否默认选中第一个叶子节点
    defaultFirst: {
      type: Boolean,
      default: false
    },
    // 是否支持节点取消选中
    nodeCancel: {
      type: Boolean,
      default: false
    },
    // 是否显示节点操作菜单(节点控制)
    nodeMenuShow: {
      type: Function,
      default: () => {
        return false;
      }
    },
    // 是否显示节点操作菜单(节点控制)
    nodeAuthShow: {
      type: Function,
      default: () => {
        return false;
      }
    },
    // 目录图标是否区分当前用户
    folderIconShare: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      rootTips: "添加至根节点底部",
      filterText: "",
      defaultProps: {
        children: "children",
        label: "title",
        type: "nodeType",
        icon: "iconPath",
        own: "isOwn"
      },
      treeData: [], //节点数据
      expandNodeIds: [], //记录展开的几点，用于记录状态
      currentNodeId: null //经当前选中的节点数据id
    };
  },
  created() {},
  watch: {
    /**
     * @description: 过滤节点
     * @param {*} val 过滤关键字
     * @return {*}
     */
    filterText(val) {
      const tree = this.getTreeRef();
      tree.filter(val);
    },
    dataSource(val) {
      this.treeData = val;
      this.$nextTick(() => {
        if (this.currentNodeId) {
          this.setDefaultSelect(this.currentNodeId);
        } else if (this.defaultSelect) {
          const selectNode = this.setDefaultSelect(this.defaultSelect);
          this.$emit("handleNodeClick", selectNode.data, { isCurrent: true, trigger: "default" }); // 触发节点单击事件
        } else if (this.defaultFirst) {
          const firstNode = this.getFirstNode(val); // 获取第一个nodeType=1的节点
          if (!firstNode) {
            return;
          }
          this.setNodeSelected(firstNode.id); // 设置节点选中
          this.setNodeExpand([firstNode.parentId]); // 设置父节点展开
          this.$emit("handleNodeClick", firstNode, { isCurrent: true, trigger: "default" }); // 触发节点单击事件
        }
      });
      // this.updateScroll()
    }
  },
  computed: {
    // 配置选项
    calcProps() {
      return Object.assign(this.defaultProps, this.$attrs.props);
    },
    // 是否为火狐浏览器
    isFireFox() {
      return navigator.userAgent.toLowerCase().includes('firefox');
    },
    htmlFonSize() {
      return (document.documentElement.clientWidth / 1920) * 192
    }
  },
  methods: {
    /**
     * @description: 更新滚动条高度
     * @return {*}
     */
    updateScroll() {
      // setTimeout(() => {
      //   this.$refs["tree-panel-scroll"].update()
      // }, 500)
    },
    // 拖拽时允许放置的节点
    allowDrop(draggingNode, dropNode, type) {
      if (type === "inner") {
        return false; // 不允许放置到别的节点或目录内部
      } else {
        return dropNode.data.parentId === draggingNode.data.parentId; // 只允许在同层级进行拖拽
      }
    },
    // 树结构的数据源刷新后设置默认选中节点
    setDefaultSelect(nodeId) {
      const tree = this.getTreeRef();
      tree.setCurrentKey(nodeId); //设置节点选中
      const currentNode = tree.getNode(nodeId);
      this.setNodeExpand([currentNode.data.parentId]); // 设置父节点展开
      // this.setScrollTo(nodeId);
      return currentNode;
    },
    // // 允许被拖拽的节点
    // allowDrag(draggingNode) {
    //   return draggingNode.data[this.calcProps.type] === 1;
    // },
    // 获取树形结构中第一个子节点（递归）
    getFirstNode(list) {
      let res = null;
      for (const item of list) {
        const itemChildren = item[this.calcProps.children];
        if (item[this.calcProps.type] === 1) {
          res = item;
          break;
        } else if (itemChildren && itemChildren) {
          res = this.getFirstNode(itemChildren);
          if (res) break;
        }
      }
      return res;
    },
    /**
     * @description: 节点展开
     * @param {*} data
     * @return {*}
     */
    nodeExpand(itm, node) {
      if (!this.expandNodeIds.includes(node.data.id)) {
        this.expandNodeIds.push(node.data.id);
      }
      // this.updateScroll()
    },
    /**
     * @description: 节点收起
     * @param {*} data
     * @return {*}
     */
    nodeCollapse(itm, node) {
      if (this.expandNodeIds.includes(node.data.id)) {
        this.expandNodeIds.splice(this.expandNodeIds.indexOf(node.data.id), 1);
      }
      const childIds = this.getChildrenAllIds(node.data.id);
      for (let index = 0; index < this.expandNodeIds.length; index++) {
        const id = this.expandNodeIds[index];
        if (childIds.includes(id)) {
          this.expandNodeIds.splice(index, 1);
          index--;
        }
      }
      // this.updateScroll()
    },
    /**
     * @description: 筛选
     * @param {*} value
     * @param {*} data
     * @return {*}
     */
    filterNode(value, data) {
      if (!value) return true;
      return data[this.calcProps.label].indexOf(value) !== -1;
    },
    /**
     * @description: 节点拖拽成功完成时触发的事件
     * @param {*} draggingNode 被拖拽节点对应的 Node
     * @param {*} dropNode 结束拖拽时最后进入的节点
     * @param {*} dropType 被拖拽节点的放置位置（before、after、inner）
     * @return {*}
     */
    handleNodeDrop(draggingNode, dropNode, dropType) {
      const levelNodes = this.getChildrenData(dropNode.data.parentId); // 获取当前节点的同层级所有节点（拖拽排序后的）
      // 当节点拖拽成功完成时触发
      // @arg {Object} 被拖拽的节点、结束拖拽时最后进入的节点、被拖拽节点的放置位置（before、after、inner）、被拖拽节点的同层级所有节点（拖拽排序后的）
      this.$emit("handleNodeDrop", { draggingNode, dropNode, dropType, levelNodes });
    },
    /**
     * @description: 触发选中节点，获取流程列表数据
     * @param {*} item
     * @param {*} node
     * @return {*}
     */
    handleNodeClick(item, node) {
      const tree = this.getTreeRef();
      if (this.isValidateNodeType) {  // 需要校验节点类型，满足规则的节点才能执行选中
        if (item[this.calcProps.type] === 1) {
          this.nodeClickFunc(item, node)
        } else {
          tree.setCurrentKey(this.currentNodeId);
        }
      } else {
        this.nodeClickFunc(item, node)
      }
    },
    // 节点选中/取消选中事件触发
    nodeClickFunc(item, node) {
      if (this.nodeCancel && this.currentNodeId == item.id) {
        this.currentNodeId = null;
        node.trigger = "clickCancel";
      } else {
        this.currentNodeId = item.id;
        node.trigger = "click";
      }
      this.setNodeSelected(this.currentNodeId);
      // 当选中叶子节点时触发
      // @arg {item Object} 当前节点的数据对象 <br>
      // @arg {node Object} 当前节点对应的node
      this.$emit("handleNodeClick", item, node);
    },
    /**
     * @description: 刷新
     * @return {*}
     */
    refresh() {
      // 当点击刷新按钮时触发
      // @arg {currentNodeId String} 当前已选中的叶子节点key <br>
      // @arg {expandNodeIds Array} 当前已展开的目录节点key集合
      this.filterText = "";
      this.$emit("handleTreeRefresh", this.currentNodeId, this.expandNodeIds);
    },
    /**
     * @description:新增
     * @param iid //当前节点id
     * @param type //节点类型，1-叶子节点，2-目录
     * @param parentId //父节点id，表示在该父节点下添加目录或叶子节点
     * @return {*}
     */
    addNode(id, type, interFace, parentId) {
      // 当点击添加目录（同级/下级）、添加标准组按钮时触发
      // @arg {Object} 要添加目录或节点的父节点id和要添加的节点类型（1-叶子节点，2-目录）
      this.$emit("handleNodeAdd", { id, type, interFace, parentId });
    },
    /**
     * @description: 编辑
     * @return {*}
     */
    editNode(node, interFace) {
      // 当点击编辑按钮时触发
      // @arg {Object} 当前点击节点/目录对应的node
      this.$emit("handleNodeEdit", { node, interFace });
    },
    /**
     * @description: 删除
     * @param {*} node
     * @return {*}
     */
    delNode(node) {
      // 当点击删除确认按钮时触发
      // @arg {Object} 当前点击节点/目录对应的node
      this.$emit("handleNodeDelete", node);
    },
    /**
     * @description: 上移
     * @param {*} node
     * @return {*}
     */
    moveupNode(node) {
      node.dropType = "before";
      this.$refs["menuPop_" + node.data.id].doClose();
      // 当点击上移按钮时触发
      // @arg {Object} 当前点击节点/目录对应的node
      this.$emit("handleNodeMoveup", node);
    },
    /**
     * @description: 下移
     * @param {*} node
     * @return {*}
     */
    movedownNode(node) {
      node.dropType = "after";
      this.$refs["menuPop_" + node.data.id].doClose();
      // 当点击下移按钮时触发
      // @arg {Object} 当前点击节点/目录对应的node
      this.$emit("handleNodeMovedown", node);
    },
    /**
     * @description: 移动到
     * @param {*} node
     * @return {*}
     */
    movetoNode(node) {
      // 当点击移动到按钮时触发
      // @arg {Object} 当前点击节点/目录对应的node
      this.$emit("handleNodeMoveto", node);
    },
    /**
     * @description: 自定义菜单点击事件
     * @return {*}
     * @param {*} menuItem
     * @param {*} node
     * @param {*} data
     */
    customMenuItemClick(menuItem, node, data) {
      if (menuItem.click && typeof menuItem.click === "function") {
        menuItem.click({node, data})
      }
    },
    /**
     * @description: 管理员
     * @param {*} node
     * @return {*}
     */
    setNodeAuth(node) {
      // 当点击管理员按钮时触发
      // @arg {Object} 当前点击节点/目录对应的node
      this.$emit("handleNodeAuthSet", node);
    },
    /**
     * @vuese
     * 用于获取el-tree组件ref
     */
    getTreeRef() {
      return this.$refs.tree;
    },
    /**
     * @vuese
     * 用于获取某个父节点的子节点data集合
     * @arg @parentId {String}: 父节点key
     *
     */
    getChildrenData(parentId) {
      if (!parentId) {
        return null;
      }
      if (parentId === this.parentsDefaultId) {
        return this.treeData;
      }
      const tree = this.getTreeRef();
      const parentNode = tree.getNode(parentId);
      return parentNode.data[this.calcProps.children];
    },
    /**
     * @description: 用于获取某个父节点的所有子孙节点key
     * @return {*}
     * @param {*} parentId
     */
    getChildrenAllIds(parentId) {
      let res = [];
      const child = this.getChildrenData(parentId);
      if (child && child.length) {
        child.forEach((item) => {
          res.push(item.id);
          res = [...res, ...this.getChildrenAllIds(item.id)];
        });
      }
      return res;
    },
    /**
     * @vuese
     * 用于获取当前选中节点id
     */
    getNodeSelected() {
      return this.currentNodeId;
    },
    /**
     * @vuese
     * 用于获取当前选中节点对象
     */
    getNodeSelectedObj() {
      if (!this.currentNodeId) {
        return null;
      }
      const tree = this.getTreeRef();
      return tree.getNode(this.currentNodeId);
    },
    /**
     * @vuese
     * 用于设置某个节点选中
     * @arg @id {String}: 节点key，不传可清空当前选中
     */
    setNodeSelected(id = null) {
      this.currentNodeId = id;
      const tree = this.getTreeRef();
      tree && tree.setCurrentKey(this.currentNodeId);
    },
    /**
     * @vuese
     * 用于设置某个目录节点展开
     * @arg @ids {Array}: 节点key集合
     */
    setNodeExpand(ids = []) {
      ids.forEach((id) => {
        if (!this.expandNodeIds.includes(id)) {
          this.expandNodeIds.push(id);
        }
      });
      // this.updateScroll()
    },
    /**
     * @vuese
     * 用于设置某个目录节点收起
     * @arg @ids {Array}: 节点key集合
     */
    setNodeCollapse(ids = []) {
      ids.forEach((id, index) => {
        if (this.expandNodeIds.includes(id)) {
          this.expandNodeIds.splice(index, 1);
        }
      });
      // this.updateScroll()
    },
    /**
     * @vuese
     * 用于设置滚动条位置
     * @arg @position {String}: 位置 top-顶部，bottom-底部，节点id值-将该节点置于顶部
     */
    setScrollTo(position = "bottom") {
      this.$nextTick(() => {
        const treeRef = this.$refs["tree-panel-scroll"];
        if (position === "top") {
          treeRef.scrollTop = 0;
        } else if (position === "bottom") {
          treeRef.scrollTop = treeRef.scrollHeight;
        } else {
          setTimeout(() => {
            const node_dom = document.getElementById("node_" + position);
            if (node_dom) {
              treeRef.scrollTop = node_dom.offsetTop - 10;
            }
          }, 500);
        }
      });
    },
    getScrollTop() {
      return this.$refs["tree-panel"].scrollTop
    },
    setScrollTop(value) {
      this.$refs["tree-panel"].scrollTop = value
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";
.tree-container {
  height: 100%;
  // min-width: 225px;
  .tree-search {
    display: flex;
    margin-top: .052083rem /* 10/192 */;
    .add-wrap {
      width: 30px;
      @include flex-center;
      .add-icon {
        font-size: 18px;
        color: #a39f9f;
        cursor: pointer;
      }
    }
  }
  .tree-button {
    display: flex;
    align-items: center;
    margin: 20px 0 10px;
    height: 32px;
    font-size: 14px;
    &-item {
      min-width: 100px;
      color: $theme;
      cursor: pointer;
    }
  }
  .tree-panel {
    margin-top: .052083rem /* 10/192 */;
    overflow: auto;
    &-scroll {
      height: 100%;
      // ::v-deep .el-scrollbar__wrap {
      //   overflow-x: hidden; /* 隐藏原生的横向滚动条 */
      // }
      .filter-tree {
        /* 增加横向滚动条 */
        min-width: 100%;
        white-space: nowrap;
        display: inline-block;
      }
    }
    .el-tree {
      flex-grow: 1;
      color: $dhFontColor;
      ::v-deep .el-tree-node__content {
        height: .208333rem /* 40/192 */;
        margin: 3px 0;
        &:hover .cus-node-menu i {
          display: block;
        }
      }
      ::v-deep .is-current > .el-tree-node__content {
        color: $theme;
      }
      ::v-deep .is-current > .el-tree-node__content .cus-node-label {
        color: $theme;
      }
      ::v-deep .is-current > .el-tree-node__content .cus-node-icon i {
        color: $theme;
      }
    }
    .custom-tree-node {
      width: 100%;
      overflow: hidden;
      color: $dhFontColor;
      display: flex;
      align-items: center;
      .cus-node-icon {
        margin-right: 5px;
        display: flex;
        align-items: center;
        flex: none;
        position: relative;
        .icon-class {
          width: 24px;
          height: 24px;
        }
        .icon-type {
          font-size: 24px !important;
          vertical-align: middle;
        }
        .isFolder {
          color: #ffd600;
        }
        .icon-status {
          font-size: 12px;
          color: #f00 !important;
          position: absolute;
          right: 0;
          top: 0;
        }
      }
      .cus-node-label {
        font-size: 14px;
        line-height: 20px;
        @include autoWrap;
        flex-grow: 1;
      }
      .cus-node-menu {
        width: 20px;
        padding-right: 10px;
       @include flex-center;
        i {
          transform: rotate(90deg);
          color: #78818e;
          display: none;
        }
      }
    }
  }
}
</style>
<style lang="scss">
@import "~@/styles/variables.scss";
.ds-node-menu {
  padding: 10px;
  min-width: 120px !important;
  .ns-menu {
    display: flex;
    align-items: center;
    height: 30px;
    padding-left: 10px;
    cursor: pointer;
    &:not(:last-child) {
      border-bottom: 1px solid $dhBorder;
    }
    &:hover {
      background: #f3f4f7;
      .menu-icon {
        color: $theme;
      }
      .menu-text {
        color: $theme;
      }
    }
    .menu-icon {
      width: 16px;
      flex: none;
      margin-right: 10px;
      display: flex;
      align-items: center;
    }
    .menu-text {
      flex-grow: 1;
      color: $dhFontColor;
    }
  }
}
</style>
