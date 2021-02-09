<template>
  <div class="vue-tempalte">
    <div class="vertical-center">
      <div class="snippet-background-block">
        <h3>Browse all snippets</h3>

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
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import config from "../../config/development";

export default Vue.extend({
  name: "BrowseSnippets",
  data() {
    return {
      fields: [
        {
          key: "snippetName",
          label: "Snippet Name"
        }
      ],
      selectedSnippetName: null,
      snippetDetails: {}
    };
  },
  methods: {
    async itemsProvider() {
      const response = await this.$http.get(config.SNIPPETS.BASE_URL);
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

<style scoped>
.snippet-background-block {
  width: 60%;
  margin: auto;
  background: #ffffff;
  box-shadow: 0px 14px 80px rgba(34, 35, 58, 0.2);
  padding: 40px 55px 45px 55px;
  border-radius: 15px;
  transition: all 0.3s;
}
</style>
