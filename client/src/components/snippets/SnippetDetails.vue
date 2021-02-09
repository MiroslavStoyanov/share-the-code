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
                :disabled="!isUserLoggedIn && !isCreateSnippet"
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
                :disabled="!isUserLoggedIn && !isCreateSnippet"
                id="textarea-auto-height"
                placeholder="Code goes here"
                rows="20"
                max-rows="25"
                v-model="code"
              ></b-form-textarea>
            </b-col>
          </b-row>
          <br />
          <b-row>
            <b-col sm="2">
              <label for="tag-input">Tags:</label>
            </b-col>
            <b-col sm="10">
              <tag-input
                id="tag-input"
                :disabled="isTagInputDisabled"
                @on-tag-add="addTag($event)"
                @on-tag-delete="deleteTag($event)"
              />
            </b-col>
          </b-row>
          <br />
          <b-row v-if="isUserLoggedIn && !isCreateSnippet">
            <b-col sm="6">
              <b-button @click="goBackToPreviousPage()" class="btn float-left"
                >Back</b-button
              >
            </b-col>
            <b-col sm="6"
              ><b-button
                class="btn float-right"
                variant="primary"
                @click="validateData()"
                >Update</b-button
              >
            </b-col>
          </b-row>

          <b-row v-else-if="isCreateSnippet">
            <b-col sm="6">
              <b-button @click="goBackToPreviousPage()" class="btn float-left"
                >Back</b-button
              >
            </b-col>
            <b-col sm="6">
              <b-button
                @click="validateData()"
                class="btn float-right"
                variant="primary"
                >Create</b-button
              >
            </b-col>
          </b-row>

          <b-row v-else>
            <b-col sm="12">
              <b-button @click="goBackToPreviousPage()" class="btn float-left"
                >Back</b-button
              >
            </b-col>
          </b-row>
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
  props: {
    isCreateSnippet: {
      type: Boolean,
      default: false
    }
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
  computed: {
    isTagInputDisabled() {
      if (this.isCreateSnippet || this.isUserLoggedIn) {
        return false;
      }
      return true;
    }
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
        if (this.isUserLoggedIn && !this.isCreateSnippet) {
          return await this.update();
        } else if (this.isUserLoggedIn && this.isCreateSnippet) {
          return await this.create();
        }
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
        if (this.isUserLoggedIn && !this.isCreateSnippet) {
          return await this.update();
        } else if (this.isCreateSnippet) {
          return await this.create();
        }
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
    async create() {
      try {
        const token = this.getToken();
        const decoded = this.getUserDetails(token);
        const requestConfig = this.getRequestConfig(token);
        const response = await this.$http.post(
          config.SNIPPETS.BASE_URL,
          {
            name: this.snippetName,
            snippet: this.code,
            userId: decoded._id,
            tags: this.tags
          },
          requestConfig
        );
        if (response.status === 200) {
          swal("Success", "Successfully created snippet", "success");
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
      if (this.isUserLoggedIn && !this.isCreateSnippet) {
        this.$router.push("/profile");
      } else {
        this.$router.push("/snippet/browse");
      }
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
