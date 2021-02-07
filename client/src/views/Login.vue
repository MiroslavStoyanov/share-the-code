<template>
  <div class="vue-tempalte">
    <div class="vertical-center">
      <div class="inner-block">
        <form @submit="checkForm" @submit.prevent="signIn">
          <h3>Sign In</h3>

          <div v-if="errors.length">
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
            <label>Password</label>
            <input
              type="password"
              v-model="user.password"
              class="form-control form-control-lg"
            />
          </div>

          <button type="submit" class="btn btn-dark btn-lg btn-block">
            Sign In
          </button>
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
  name: "Login",
  data() {
    return {
      errors: [],
      user: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    checkForm: function(e) {
      if (
        this.user.username &&
        this.user.password &&
        this.user.password.length >= 8
      ) {
        return true;
      }

      this.errors = [];

      if (!this.user.username) {
        this.errors.push("Username is required.");
      }

      if (!this.user.password) {
        this.errors.push("Password is required.");
      }

      if (this.user.password && this.user.password.length < 8) {
        this.errors.push("Password's minimum required length is 8 characters.");
      }

      e.preventDefault();
    },
    async signIn() {
      try {
        let response = await this.$http.post(
          config.USERS.AUTHENTICATE,
          this.user
        );
        let token = response.data.token;
        localStorage.setItem("jwt", token);
        if (token) {
          swal("Success", "Login Successful", "success");
          this.$router.push("/profile");
          window.location.reload();
        }
      } catch (err) {
        swal("Error", "Something Went Wrong", "error");
        console.log(err.response);
      }
    }
  }
});
</script>
