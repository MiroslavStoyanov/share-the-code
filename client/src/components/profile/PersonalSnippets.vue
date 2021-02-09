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
              :items="items"
              @row-selected="toggleItems($event)"
            >
              <template v-slot:cell(actions)="data">
                <div class="text-center">
                  <b-button
                    class="ml-1"
                    title="Delete snippet"
                    icon="trash"
                    variant="transparent"
                    @click="deleteItem(data.item, data.index)"
                  >
                    <b-icon icon="trash-fill" variant="danger" />
                  </b-button>
                </div>
              </template>
            </b-table>
          </div>
        </b-container>
      </b-card-body>
    </b-collapse>
  </div>
</template>

<script>
import Vue from "vue";
import swal from "sweetalert";
import VueJwtDecode from "vue-jwt-decode";
import config from "../../config/development";

export default Vue.extend({
  name: "PersonalSnippets",
  props: {
    userToken: null,
    requestConfig: {}
  },
  data() {
    return {
      fields: [
        {
          key: "snippetName",
          label: "Snippet Name"
        },
        {
          key: "actions",
          label: "",
          thStyle: { width: "10%" }
        }
      ],
      selectedSnippetName: null,
      snippetDetails: {},
      items: []
    };
  },
  async created() {
    this.items = await this.itemsProvider();
  },
  methods: {
    async itemsProvider() {
      const decoded = VueJwtDecode.decode(this.userToken);
      const response = await this.$http.get(
        config.SNIPPETS.USER_SNIPPETS + decoded._id,
        this.requestConfig
      );
      this.items = response.data;

      return this.items;
    },
    async toggleItems(selectedItems) {
      const selectedSnippetName = selectedItems[0];
      const selectedSnippetObject = JSON.parse(
        JSON.stringify(selectedSnippetName)
      );
      this.selectedSnippetName = selectedSnippetObject.snippetName;
      const response = await this.$http.get(
        config.SNIPPETS.GET_SNIPPETS_BY_NAME + this.selectedSnippetName
      );
      if (response.data) {
        this.snippetDetails = JSON.parse(JSON.stringify(response.data[0]));
        console.log(this.snippetDetails);
        this.$router.push({
          name: "SnippetDetails",
          params: {
            ...this.snippetDetails,
            isUserLoggedIn: true
          }
        });
      }
    },
    async deleteItem(item, index) {
      const name = item.snippetName;
      const response = await this.$http.delete(
        config.SNIPPETS.BASE_URL + name,
        this.requestConfig
      );
      if (response.status === 200) {
        this.items.splice(index, 1);
        swal("Success", "Successfully deleted" + item.snippetName, "success");
      } else {
        swal(
          "Error",
          "Something went wrong while deleting the current snippet",
          "error"
        );
      }
    }
  }
});
</script>
