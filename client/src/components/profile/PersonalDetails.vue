<template>
  <div id="personal-details">
    <b-card-header header-tag="header" class="m-1" role="tab">
      <a v-b-toggle href="#personal-details-collapse" @click.prevent
        >Personal Details</a
      >
    </b-card-header>
    <b-collapse id="personal-details-collapse" class="mt-2">
      <b-card-body>
        <b-container fluid>
          <b-row class="my-1">
            <b-col sm="2">
              <label for="username">Username:</label>
            </b-col>
            <b-col sm="10">
              <b-form-input
                id="username"
                v-model="user.username"
                placeholder="Enter your username"
              ></b-form-input>
            </b-col>
          </b-row>

          <b-row class="my-1">
            <b-col sm="2">
              <label for="first-name">First name:</label>
            </b-col>
            <b-col sm="10">
              <b-form-input
                id="first-name"
                v-model="user.firstName"
                placeholder="Enter your first name"
              ></b-form-input>
            </b-col>
          </b-row>

          <b-row class="my-1">
            <b-col sm="2">
              <label for="last-name">Last name:</label>
            </b-col>
            <b-col sm="10">
              <b-form-input
                id="last-name"
                v-model="user.lastName"
                placeholder="Enter your last name"
              ></b-form-input>
            </b-col>
          </b-row>

          <b-row class="my-1">
            <b-col sm="2">
              <label for="user-email">Email:</label>
            </b-col>
            <b-col sm="10">
              <b-form-input
                id="user-email"
                v-model="user.email"
                placeholder="Enter your email"
              ></b-form-input>
            </b-col>
          </b-row>
          <b-button
            @click="updateUserDetails()"
            class="float-right"
            variant="primary"
            >Update</b-button
          >
        </b-container>
      </b-card-body>
    </b-collapse>
  </div>
</template>

<script>
import Vue from "vue";
import swal from "sweetalert";
import VueJwtDecode from "vue-jwt-decode";

export default Vue.extend({
  name: "PersonalDetais",
  props: {
    user: {}
  },
  methods: {
    async updateUserDetails() {
      try {
        const token = localStorage.getItem("jwt");
        const decoded = VueJwtDecode.decode(token);
        const requestConfig = {
          headers: {
            Authorization: "Bearer " + token
          }
        };
        const response = await this.$http.put(
          `/users/${decoded._id}`,
          this.user,
          requestConfig
        );
        if (response) {
          swal("Success", "Update successful", "success");
        }
      } catch (err) {
        swal("Error", "Something went wrong", "error");
        console.log(err);
      }
    }
  }
});
</script>
