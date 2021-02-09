<template>
  <div class="vue-tempalte">
    <div class="vertical-center">
      <div class="inner-block">
        <form @submit="checkForm">
          <h3>Sign Up</h3>

          <div class="alert alert-danger" v-if="errors.length">
            <b>Please correct the following error(s):</b>
            <ul>
              <li :key="error" v-for="error in errors">{{ error }}</li>
            </ul>
          </div>

          <div class="form-group">
            <label>Username</label>
            <input
              type="text"
              v-model="user.username"
              class="form-control form-control-lg"
            />
          </div>

          <div class="form-group">
            <label>First name</label>
            <input
              type="text"
              v-model="user.firstName"
              class="form-control form-control-lg"
            />
          </div>

          <div class="form-group">
            <label>Last name</label>
            <input
              type="text"
              v-model="user.lastName"
              class="form-control form-control-lg"
            />
          </div>

          <div class="form-group">
            <label>Email address</label>
            <input
              type="email"
              v-model="user.email"
              class="form-control form-control-lg"
            />
          </div>

          <div class="form-group">
            <label>Password</label>
            <input
              type="password"
              v-model="user.password"
              class="form-control form-control-lg"
            />
          </div>

          <button type="submit" class="btn btn-dark btn-lg btn-block">
            Sign Up
          </button>

          <p class="forgot-password text-right">
            Already registered
            <router-link :to="{ name: 'Login' }">sign in?</router-link>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import swal from "sweetalert";
import config from "../config/development";

export default Vue.extend({
  name: "Signup",
  data() {
    return {
      errors: [],
      user: {
        username: "",
        firstName: "",
        lastName: "",
        email: "",
        password: ""
      }
    };
  },
  methods: {
    async checkForm(e) {
      e.preventDefault();

      if (
        this.user.username &&
        this.user.email &&
        this.user.password &&
        this.user.password.length >= 8
      ) {
        this.errors = [];
        return await this.register();
      }

      this.errors = [];

      if (!this.user.username) {
        this.errors.push("Username is required.");
      }

      if (this.user.username && this.user.username.length < 3) {
        this.errors.push("A username needs to have at least 3 symbols.");
      }

      if (!this.user.email) {
        this.errors.push("Email is required.");
      }

      if (!this.user.password) {
        this.errors.push("Password is required.");
      }

      if (this.user.password && this.user.password.length < 8) {
        this.errors.push("Password's minimum required length is 8 characters.");
      }

      if (this.errors.length === 0) {
        return await this.register();
      }
    },
    async register() {
      try {
        let response = await this.$http.post(config.USERS.REGISTER, this.user);
        let token = response.data.token;
        if (token) {
          localStorage.setItem("jwt", token);
          this.$router.push("/profile");
          window.location.reload();
          swal("Success", "Registration was successful", "success");
        } else {
          swal("Error", "Something went wrong", "error");
        }
      } catch (err) {
        console.log(err.response);
        let error = err.response;
        if (error.status === 400) {
          swal("Error", error.data.error, "error");
        } else {
          swal("Error", error.data.err.message, "error");
        }
      }
    }
  }
});
</script>
