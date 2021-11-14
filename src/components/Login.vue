<template>
  <div class="login">
    <img alt="User Icon" class="login__icon" :src="user.image">
    <h1 class="login__name">{{ user.display_name }}</h1>
    <PasswordPrompt @hideWrongPasswordIndicator="hideWrongPasswordIndicator()"
                    :showWrongPasswordIndicator="showWrongPasswordIndicator"
                    :user="user"
                    :session="session"></PasswordPrompt>
  </div>
</template>

<script>
import PasswordPrompt from "./PasswordPrompt";

export default {
  name: "Login",
  components: {PasswordPrompt},
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
.login
  background: linear-gradient(129.93deg, var(--gradient-start-color) 6.58%, var(--gradient-stop-color) 90.39%)
  box-shadow: .5rem .5rem 1rem 0 #000000A0
  display: flex
  justify-content: center
  align-items: center
  flex-direction: column
  border-radius: 1rem
  padding: 3rem 2.5rem 2rem

  .login__icon
    width: 7.5rem
    height: 7.5rem
    border-radius: 1rem
    box-shadow: .5rem .5rem 1rem 0 #00000060
    object-fit: cover

  .login__name
    font-weight: 300
    color: var(--font-color)
    font-size: 1.6rem
    margin: 1rem 0 2rem
    text-shadow: .25rem .25rem .5rem #00000060
</style>