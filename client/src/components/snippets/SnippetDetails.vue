<template>
  <div class="vue-tempalte">
    <div class="vertical-center">
      <div class="snippet-background-block">
        <h3>Snippet Details</h3>

        <div class="alert alert-danger" v-if="errors.length">
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
                :disabled="!isUserLoggedIn"
                id="snippet-name"
                placeholder="Something to remember your code by"
                v-model="snippetName"
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
                :disabled="!isUserLoggedIn"
                id="textarea-auto-height"
                placeholder="Code goes here"
                rows="20"
                max-rows="25"
                v-model="code"
              ></b-form-textarea>
            </b-col>
          </b-row>
          <br />
          <div class="row" v-if="isUserLoggedIn">
            <div class="col-md-10">
              <tag-input
                @on-tag-add="addTag($event)"
                @on-tag-delete="deleteTag($event)"
              />
            </div>
            <div class="col-md-1">
              <b-button @click="goBackToPreviousPage()" class="btn float-right"
                >Back</b-button
              >
            </div>
            <div class="cold-md-1">
              <b-button
                class="btn float-right"
                variant="primary"
                @click="validateData()"
                >Update</b-button
              >
            </div>
          </div>
        </b-container>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import swal from "sweetalert";
import TagInput from "./TagInput";
import config from "../../config/development";
import VueJwtDecode from "vue-jwt-decode";

export default Vue.extend({
  name: "SnippetDetails",
  components: {
    TagInput
  },
  data() {
    return {
      snippetName: null,
      code: null,
      isUserLoggedIn: false,
      tags: [],
      errors: []
    };
  },
  created() {
    this.snippetName = this.$attrs.name;
    this.code = this.$attrs.snippet;
    this.isUserLoggedIn = this.$attrs.isUserLoggedIn;
  },
  methods: {
    async validateData() {
      if (this.code && this.snippetName) {
        this.errors = [];
        return await this.update();
      }

      this.errors = [];

      if (!this.snippetName) {
        this.errors.push("Snippet name is required.");
      }

      if (!this.code) {
        this.errors.push("You need to submit a code snippet before saving it.");
      }

      if (!this.code.length > 5000) {
        this.errors.push(
          "You have reached the maximum amount for a snippet - 5000 characters."
        );
      }

      if (this.errors.length === 0) {
        return await this.update();
      }
    },
    addTag(tag) {
      this.tags.push(tag);
    },
    deleteTag(index) {
      this.tags.splice(index, 1);
    },
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
    },
    async update() {
      try {
        const token = this.getToken();
        const decoded = this.getUserDetails(token);
        const requestConfig = this.getRequestConfig(token);
        const response = await this.$http.put(
          config.SNIPPETS.BASE_URL + this.snippetName,
          {
            name: this.snippetName,
            snippet: this.code,
            userId: decoded._id,
            tags: this.tags
          },
          requestConfig
        );
        if (response.status === 200) {
          swal("Success", "Successfully updated snippet details", "success");
        }
      } catch (err) {
        let error = err.response;
        if (error.status === 400) {
          swal("Error", error.data.error, "error");
        } else {
          swal("Error", "Something went wrong", "error");
        }
      }
    },
    goBackToPreviousPage() {
      this.$router.push("/profile");
    }
  }
});
</script>

<style scoped>
.snippet-background-block {
  width: 70%;
  margin: auto;
  background: #ffffff;
  box-shadow: 0px 14px 80px rgba(34, 35, 58, 0.2);
  padding: 40px 55px 45px 55px;
  border-radius: 15px;
  transition: all 0.3s;
}
</style>
