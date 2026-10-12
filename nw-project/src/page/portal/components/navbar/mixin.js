/*
 * @Author: why
 * @Date: 2025-01-13 10:50:55
 * @LastEditors: why
 * @LastEditTime: 2025-01-13 11:27:12
 * @Description: 
 */
import PortalRouter from "@/router/portal/"; // 门户路由

export default {
  data() {
    return {
      menuList: [],
      solutionList: [],
    };
  },

  computed: {
    solutionItemList() {
      return (
        (this.solutionList[this.solutionIndex] &&
          this.solutionList[this.solutionIndex].children) ||
        []
      );
    },
    portalRouter() {
      return PortalRouter.find((item) => item.path === "/portal");
    },
    menu() {
      return this.portalRouter ? this.portalRouter.children : [];
    },
    activeMenu() {
      return this.$route.path;
    },
  },

  methods: {
    async initData() {
    },
  },
};
