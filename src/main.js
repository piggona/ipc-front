import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";
import { Layout, Card, List, Table, Row, Col, Tag } from "ant-design-vue";
import "vue-awesome/icons";
import Icon from "vue-awesome/components/Icon";
// import "ant-design-vue/dist/antd.less";

Vue.config.productionTip = false;

Vue.use(Layout);
Vue.use(Card);
Vue.use(List);
Vue.use(Table);
Vue.use(Row);
Vue.use(Col);
Vue.use(Tag);
Vue.component("v-icon", Icon);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
