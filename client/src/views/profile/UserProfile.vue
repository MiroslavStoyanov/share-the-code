<template>
  <div class="vue-tempalte">
    <div class="vertical-center">
      <div class="profile-background-block">
        <h3>Welcome</h3>

        <div class="accordion" role="tablist">
          <b-card no-body class="mb-1">
            <personal-details :user="this.user" />
            <personal-snippets
              :userToken="this.getToken()"
              :requestConfig="this.getRequestConfig(this.getToken())"
            />
          </b-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import swal from "sweetalert";
import PersonalDetails from "../../components/profile/PersonalDetails";
import PersonalSnippets from "../../components/profile/PersonalSnippets";
import config from "../../config/development";
import VueJwtDecode from "vue-jwt-decode";

export default Vue.extend({
  name: "UserProfile",
  components: {
    PersonalDetails,
    PersonalSnippets
  },
  data() {
    return {
      user: {}
    };
  },
  async created() {
    await this.getUserDetails();
  },
  methods: {
    getToken() {
      return localStorage.getItem("jwt");
    },
    decodeToken(token) {
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
    async getUserDetails() {
      const token = this.getToken();
      const decoded = this.decodeToken(token);
      const requestConfig = this.getRequestConfig(token);
      const response = await this.$http.get(
        config.USERS.BASE_URL + decoded._id,
        requestConfig
      );
      if (response.status === 200) {
        this.user = response.data;
      } else {
        swal(
          "Error",
          "Something went wrong while fetching the user details",
          "error"
        );
      }
    }
  }
});
</script>

<style scoped>
.profile-background-block {
  width: 60%;
  height: auto;
  margin: auto;
  background: #ffffff;
  box-shadow: 0px 14px 80px rgba(34, 35, 58, 0.2);
  padding: 40px 55px 45px 55px;
  border-radius: 15px;
  transition: all 0.3s;
}
</style>
