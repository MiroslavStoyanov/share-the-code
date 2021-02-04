<template>
  <div class="vue-tempalte">
    <div class="vertical-center">
      <div class="snippet-background-block">
        <form>
          <h3>Create snippet</h3>
          <b-container fluid>
            <b-row>
              <b-col sm="2">
                <label for="snippet-name">Name:</label>
              </b-col>
              <b-col sm="10"
                ><b-form-input id="snippet-name" placeholder="Something to remember your code by"></b-form-input
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
                ></b-form-textarea>
              </b-col>
            </b-row>
            <br />
            <b-button variant="outline-primary float-right">Create</b-button>
          </b-container>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  name: "Snippet",
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