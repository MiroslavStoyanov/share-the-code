<template>
  <snippet-details :isCreateSnippet="true" />
</template>

<script>
import Vue from "vue";
import SnippetDetails from "../../components/snippets/SnippetDetails";

export default Vue.extend({
  name: "Snippet",
  components: {
    SnippetDetails
  }
});
</script>
