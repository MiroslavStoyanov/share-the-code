<template>
  <main>
    <div class="vue-template">
      <app-header />

      <div class="App align-items-center">
        <div class="vertical-center">
          <div class="inner-block">
            <router-view />
          </div>
        </div>
      </div>
    </div>
  </main>
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