<template>
  <b-card no-body class="mb-1">
    <b-card-header header-tag="header" class="p-1" role="tab">
      <b-button block v-b-toggle.personal-details-accordion variant="info"
        >Personal Details</b-button
      >
    </b-card-header>
    <b-collapse
      id="personal-details-accordion"
      accordion="profile-details-accordion"
      role="tabpanel"
    >
      <b-card-body>
        <b-container fluid>
          <b-row class="my-1">
            <b-col sm="2">
              <label for="username">Username:</label>
            </b-col>
            <b-col sm="10">
              <b-form-input
                id="username"
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
                placeholder="Enter your email"
              ></b-form-input>
            </b-col>
          </b-row>

          <b-row class="my-1">
            <b-col sm="2">
              <label for="user-password">Password:</label>
            </b-col>
            <b-col sm="10">
              <b-form-input
                id="user-password"
                placeholder="Enter your password"
              ></b-form-input>
            </b-col>
          </b-row>
        </b-container>
      </b-card-body>
    </b-collapse>
  </b-card>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  name: "PersonalDetais"
});
</script>
