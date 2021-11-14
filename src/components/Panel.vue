<template>
  <div class="content">
    <Toolbar class="toolbar"
             v-on:displaySessionChooser="$emit('displaySessionChooser')"
             v-on:displayUserChooser="$emit('displayUserChooser')"></Toolbar>
    <Login @hideWrongPasswordIndicator="hideWrongPasswordIndicator()"
           :showWrongPasswordIndicator="showWrongPasswordIndicator"
           :user="user"
           :session="session"></Login>
  </div>
</template>

<script>
import Toolbar from "./Toolbar";
import Login from "./Login";

export default {
  name: "Panel",
  components: {Login, Toolbar},
  emits: [
    'displaySessionChooser',
    'displayUserChooser'
  ],
  props: {
    user: Object,
    session: Object,
    showWrongPasswordIndicator: Boolean
  },
  methods: {
    hideWrongPasswordIndicator() {
      this.$emit('hideWrongPasswordIndicator')
    }
  }
}
</script>

<style lang="sass" scoped>
.content
  display: flex

  .toolbar
    margin-right: 1.5rem
</style>