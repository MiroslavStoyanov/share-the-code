<template>
  <nav
    class="navbar shadow bg-white rounded justify-content-between flex-nowrap flex-row"
  >
    <div class="container">
      <ul class="nav navbar-nav flex-row float-left">
        <li class="nav-item">
          <router-link class="btn btn-outline-primary" to="/snippet/browse"
            >Browse all snippets</router-link
          >
        </li>
        <li v-if="isUserLoggedIn" class="nav-item">
          <router-link class="btn btn-outline-primary" to="/snippet/create"
            >Create snippet</router-link
          >
        </li>
      </ul>
      <ul class="nav navbar-nav flex-row float-right">
        <div v-if="!isUserLoggedIn" id="login-register-nav-items">
          <li class="nav-item">
            <router-link class="btn btn-outline-primary" to="/login"
              >Sign in</router-link
            >
            <router-link class="btn btn-outline-primary" to="/"
              >Sign up</router-link
            >
          </li>
        </div>
        <div v-else>
          <li class="nav-item">
            <router-link class="btn btn-outline-primary" to="/profile"
              >Welcome, {{ loggedUserName }}</router-link
            >
            <b-button variant="outline-primary float-right" @click="signOut()"
              >Sign Out</b-button
            >
          </li>
        </div>
      </ul>
    </div>
  </nav>
</template>

<script>
import Vue from "vue";
import VueJwtDecode from "vue-jwt-decode";
import swal from "sweetalert";

export default Vue.extend({
  name: "AppHeader",
  data() {
    return {
      isUserLoggedIn: null,
      loggedUserName: null
    };
  },
  created() {
    this.isUserLoggedIn = this.isUserAuthenticated();
    this.loggedUserName = this.getLoggedUsername();
  },
  methods: {
    isUserAuthenticated() {
      const token = localStorage.getItem("jwt");
      return token ? true : false;
    },
    getLoggedUsername() {
      const token = localStorage.getItem("jwt");
      if (token) {
        const decoded = VueJwtDecode.decode(token);
        return decoded.username;
      }

      return "";
    },
    signOut() {
      localStorage.removeItem("jwt");
      this.$router.push("/");
      this.isUserLoggedIn = false;
      swal("Logged Out", "Successfully logged out of your profile", "success");
    }
  }
});
</script>
