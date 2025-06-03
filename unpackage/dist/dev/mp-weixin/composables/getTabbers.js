"use strict";
const common_vendor = require("../common/vendor.js");
const pages = [
  {
    path: "pages/user/user",
    style: {
      navigationBarTitleText: "我的"
    }
  },
  {
    path: "pages/index/index",
    style: {
      navigationBarTitleText: "首页"
    }
  },
  {
    path: "pages/login/login",
    style: {
      navigationBarTitleText: ""
    }
  },
  {
    path: "pages/policy/privacy",
    style: {
      navigationBarTitleText: "用户隐私政策"
    }
  },
  {
    path: "pages/policy/service",
    style: {
      navigationBarTitleText: "用户服务协议"
    }
  },
  {
    path: "pages/product/product",
    style: {
      navigationBarTitleText: "商品详细展示"
    }
  },
  {
    path: "pages/search/search",
    style: {
      navigationBarTitleText: ""
    }
  }
];
const globalStyle = {
  navigationStyle: "custom",
  navigationBarTextStyle: "black",
  navigationBarTitleText: "uni-app",
  navigationBarBackgroundColor: "#F8F8F8",
  backgroundColor: "#F8F8F8",
  usingComponents: {
    towxml: "/wxcomponents/towxml/towxml",
    decode: "/wxcomponents/towxml/decode"
  }
};
const uniIdRouter = {};
const tabBar = {
  custom: true,
  color: "#F0AD4E",
  selectedColor: "#3cc51f",
  borderStyle: "black",
  backgroundColor: "#F8F8F8",
  list: [
    {
      pagePath: "pages/index/index",
      text: "购物中心",
      name: "home",
      icon: "home"
    },
    {
      pagePath: "pages/user/user",
      text: "我的",
      name: "account",
      icon: "account"
    }
  ]
};
const easycom = {
  autoscan: true,
  custom: {
    "^uv-(.*)": "@climblee/uv-ui/components/uv-$1/uv-$1.vue",
    "^my-(.*)": "@/components/$1/$1.vue",
    layout: "@/layout/index.vue"
  }
};
const pages$1 = {
  pages,
  globalStyle,
  uniIdRouter,
  tabBar,
  easycom
};
function getTabbers() {
  const tabBar2 = pages$1.tabBar;
  const list = tabBar2.list.map((item) => {
    return { ...item, pagePath: `/${item.pagePath}`, go() {
      common_vendor.index.switchTab({
        url: `/${item.pagePath}`
      });
    } };
  });
  const res = {};
  list.forEach((item) => {
    res[item.name] = item;
  });
  return res;
}
const __vite_glob_0_4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getTabbers
}, Symbol.toStringTag, { value: "Module" }));
exports.__vite_glob_0_4 = __vite_glob_0_4;
//# sourceMappingURL=../../.sourcemap/mp-weixin/composables/getTabbers.js.map
