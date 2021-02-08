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
              bordered
              hover
              fixed
              selectable
              primary-key="id"
              select-mode="single"
              thead-tr-class="text-center"
              :fields="fields"
              :items="itemsProvider"
              @row-selected="toggleItems($event)"
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
      selectedSnippetName: null,
      snippetDetails: {}
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
    },
    async toggleItems(selectedItems) {
      const selectedSnippetName = selectedItems[0];
      const stringifiedVersion = JSON.parse(
        JSON.stringify(selectedSnippetName)
      );
      this.selectedSnippetName = stringifiedVersion.snippetName;
      const response = await this.$http.get(
        config.SNIPPETS.GET_SNIPPETS_BY_NAME + this.selectedSnippetName
      );
      if (response.data) {
        this.snippetDetails = JSON.parse(JSON.stringify(response.data[0]));
        this.$router.push({
          name: "SnippetDetails",
          params: this.snippetDetails
        });
      }
    }
  }
});
</script>
