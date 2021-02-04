<template>
  <nav
    class="navbar shadow bg-white rounded justify-content-between flex-nowrap flex-row fixed-top"
  >
    <div class="container">
      <ul class="nav navbar-nav flex-row float-left">
        <li class="nav-item">
          <router-link class="btn btn-outline-primary" to="/snippet/create"
            >Create snippet</router-link
          >
        </li>
      </ul>
      <ul class="nav navbar-nav flex-row float-right">
        <li class="nav-item">
          <router-link class="nav-link pr-3" to="/login">Sign in</router-link>
        </li>
        <li class="nav-item">
          <router-link class="btn btn-outline-primary" to="/"
            >Sign up</router-link
          >
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  name: "AppHeader",
});
</script>