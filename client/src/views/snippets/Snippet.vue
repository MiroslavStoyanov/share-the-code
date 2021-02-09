<template>
  <snippet-details :isCreateSnippet="true" />
</template>

<script>
import Vue from "vue";
import VueJwtDecode from "vue-jwt-decode";
import SnippetDetails from "../../components/snippets/SnippetDetails";

export default Vue.extend({
  name: "Snippet",
  components: {
    SnippetDetails
  },
  data() {
    return {
      errors: [],
      snippetDetails: {
        name: "",
        snippet: "",
        tags: []
      }
    };
  },
  methods: {
    getToken() {
      return localStorage.getItem("jwt");
    },
    getUserDetails(token) {
      return VueJwtDecode.decode(token);
    },
    getRequestConfig(token) {
      const requestConfig = {
        headers: {
          Authorization: "Bearer " + token
        }
      };
      return requestConfig;
    }
  }
});
</script>
