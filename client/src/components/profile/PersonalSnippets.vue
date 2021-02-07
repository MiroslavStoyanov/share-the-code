<template>
  <div id="personal-snippets">
    <b-card-header header-tag="header" class="m-1" role="tab">
      <a v-b-toggle href="#personal-snippets-collapse" @click.prevent
        >Browse Personal Snippets</a
      >
    </b-card-header>
    <b-collapse id="personal-snippets-collapse" class="mt-2">
      <b-card-body>
        <b-container fluid>
          <div>
            <b-table
              striped
              hover
              :fields="fields"
              :items="itemsProvider"
            ></b-table>
          </div>
        </b-container>
      </b-card-body>
    </b-collapse>
  </div>
</template>

<script>
import Vue from "vue";
import VueJwtDecode from "vue-jwt-decode";
import config from "../../config/development";

export default Vue.extend({
  name: "PersonalSnippets",
  data() {
    return {
      fields: [
        {
          key: "snippetName",
          label: "Snippet Name"
        },
        {
          key: "actions",
          label: "Like your own snippet?"
        }
      ],
      snippets: {}
    };
  },
  methods: {
    async itemsProvider() {
      const token = localStorage.getItem("jwt");
      const decoded = VueJwtDecode.decode(token);
      const requestConfig = {
        headers: {
          Authorization: "Bearer " + token
        }
      };
      const response = await this.$http.get(
        config.SNIPPETS.USER_SNIPPETS + decoded._id,
        requestConfig
      );
      this.snippets = response.data;

      return response.data;
    }
  }
});
</script>
