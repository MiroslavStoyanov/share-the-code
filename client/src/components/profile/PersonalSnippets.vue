<template>
  <div id="personal-snippets">
    <b-card-header header-tag="header" class="m-1" role="tab">
      <a v-b-toggle href="#personal-snippets-collapse" @click.prevent
        >Browse Personal Snippets</a
      >
    </b-card-header>
    <b-collapse id="personal-snippets-collapse" class="mt-2">
      <b-card-body>
        <b-container fluid> </b-container>
      </b-card-body>
    </b-collapse>
  </div>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  name: "PersonalSnippets"
});
</script>
