<template>
  <div class="vue-tempalte">
    <div class="vertical-center">
      <div class="profile-background-block">
        <h3>Welcome</h3>

        <div class="accordion" role="tablist">
          <b-card no-body class="mb-1">
            <personal-details :user="this.user" />
            <personal-snippets />
          </b-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import PersonalDetails from "../../components/profile/PersonalDetails";
import PersonalSnippets from "../../components/profile/PersonalSnippets";
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
  created() {
    this.getUserDetails();
  },
  methods: {
    getUserDetails() {
      const token = localStorage.getItem("jwt");
      const decoded = VueJwtDecode.decode(token);
      this.user = decoded;
    }
  }
});
</script>

<style scoped>
.profile-background-block {
  width: 1000px;
  margin: auto;
  background: #ffffff;
  box-shadow: 0px 14px 80px rgba(34, 35, 58, 0.2);
  padding: 40px 55px 45px 55px;
  border-radius: 15px;
  transition: all 0.3s;
}
</style>
