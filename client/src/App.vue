<template>
  <div class="vue-tempalte">
    <app-header />

    <div class="App">
      <router-view />
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import AppHeader from "./components/AppHeader.vue";

export default Vue.extend({
  name: "App",
  components: {
    AppHeader
  }
});
</script>
