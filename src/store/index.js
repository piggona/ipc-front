import Vue from "vue";
import Vuex from "vuex";
import search from "./modules/search";
import patent from "./modules/patent";
import fund from "./modules/fund";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo: {
      username: "User Not Found",
      userrole: ""
    },
  },
  mutations: {
    getUsername() {
      var ca = document.cookie.split(";");
      console.log("getUsername:", ca);
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf("patent_username=") == 0)
          this.state.userInfo.username = c.substring(
            "patent_username=".length,
            c.length
          );
      }
    },
    getUserRole() {
      console.log("into getUserRole!")
      var ca = document.cookie.split(";");
      console.log("getAuth:", ca);
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf("userrole=") == 0)
          console.log("set state.userInfo.userrole")
          this.state.userInfo.userrole = c.substring(
            "userrole=".length,
            c.length
          );
      }
    }
  },
  modules: {
    search,
    patent,
    fund
  }
});
