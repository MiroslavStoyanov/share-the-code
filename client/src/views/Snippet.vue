<template>
  <div class="vue-tempalte">
    <div class="vertical-center">
      <div class="snippet-background-block">
        <form @submit.prevent="save">
          <h3>Create snippet</h3>

          <div v-if="errors.length">
            <b>Please correct the following error(s):</b>
            <ul>
              <li :key="error" v-for="error in errors">{{ error }}</li>
            </ul>
          </div>

          <b-container fluid>
            <b-row>
              <b-col sm="2">
                <label for="snippet-name">Name:</label>
              </b-col>
              <b-col sm="10"
                ><b-form-input
                  id="snippet-name"
                  placeholder="Something to remember your code by"
                  v-model="snippetDetails.name"
                ></b-form-input
              ></b-col>
            </b-row>
            <br />
            <b-row>
              <b-col sm="2">
                <label for="textarea-auto-height">Place snippet here:</label>
              </b-col>
              <b-col sm="10">
                <b-form-textarea
                  id="textarea-auto-height"
                  placeholder="Code goes here"
                  rows="20"
                  max-rows="25"
                  v-model="snippetDetails.snippet"
                ></b-form-textarea>
              </b-col>
            </b-row>
            <br />
            <b-button
              @click="checkForm"
              type="submit"
              variant="outline-primary float-right"
              >Create</b-button
            >
          </b-container>
        </form>
        <tag-input @on-tag-add="addTag($event)" />
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import swal from "sweetalert";
import config from "../config/development";
import VueJwtDecode from "vue-jwt-decode";
import TagInput from "../components/snippets/TagInput";

export default Vue.extend({
  name: "Snippet",
  components: {
    TagInput
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
    async checkForm(e) {
      if (this.snippetDetails.name && this.snippetDetails.snippet) {
        return true;
      }

      this.errors = [];

      if (!this.snippet.name) {
        this.errors.push("Snippet name is required.");
      }

      if (!this.snippetDetails.snippet) {
        this.errors.push("You need to submit a snippet before saving it.");
      }

      if (!this.snippetDetails.snippet.length > 5000) {
        this.errors.push(
          "You have reached the maximum amount for a snippet - 5000 characters."
        );
      }

      e.preventDefault();
    },
    addTag(tag) {
      this.snippetDetails.tags.push(tag);
    },
    async save() {
      try {
        const token = localStorage.getItem("jwt");
        const decoded = VueJwtDecode.decode(token);
        const requestConfig = {
          headers: {
            Authorization: "Bearer " + token
          }
        };
        const response = await this.$http.post(
          config.SNIPPETS.BASE_URL,
          {
            ...this.snippetDetails,
            userId: decoded._id
          },
          requestConfig
        );
        if (response) {
          swal("Success", "Update successful", "success");
        }
      } catch (err) {
        swal("Error", "Something Went Wrong", "error");
        console.log(err);
      }
    }
  }
});
</script>

<style scoped>
.snippet-background-block {
  width: 1500px;
  margin: auto;
  background: #ffffff;
  box-shadow: 0px 14px 80px rgba(34, 35, 58, 0.2);
  padding: 40px 55px 45px 55px;
  border-radius: 15px;
  transition: all 0.3s;
}
</style>
