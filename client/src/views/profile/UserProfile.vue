<template>
  <div class="vue-tempalte">
    <div class="vertical-center">
      <div class="profile-background-block">
        <h3>Welcome,</h3>

        <div class="accordion" role="tablist">
          <personal-details />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import PersonalDetails from "../../components/profile/PersonalDetails";
import userDataService from "../../services/UserDataService";

export default Vue.extend({
  name: "UserProfile",
  components: {
    PersonalDetails
  },
  data() {
    return {
      user: null
    };
  },
  async created() {
    this.user = await userDataService.getCurrentUser();
  }
});
</script>

<style scoped>
.profile-background-block {
  width: 1500px;
  margin: auto;
  background: #ffffff;
  box-shadow: 0px 14px 80px rgba(34, 35, 58, 0.2);
  padding: 40px 55px 45px 55px;
  border-radius: 15px;
  transition: all 0.3s;
}
</style>
