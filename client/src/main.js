import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "./assets/main.css";

Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);

const base = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-type": "application/json"
  }
});

Vue.prototype.$http = base;
Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
