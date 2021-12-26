<template>
  <div class="password-section">
    <div class="password-prompt">
      <div class='password-prompt__input-container'>
        <input v-model="password" class="password-prompt__input" :type="displayPassword ? 'text' : 'password'" placeholder="password"
                @keyup.enter="login()" @keypress="hideWrongPasswordIndicator()" autofocus>
        <font-awesome-icon class="password-prompt__eye" :icon="['fas', displayPassword ? 'eye-slash' : 'eye']" @click="displayPassword = !displayPassword"></font-awesome-icon>
      </div>
      <div class="password-prompt__confirm" @click="login()">
        <font-awesome-icon class="password-prompt__icon" :icon="['fas', 'angle-right']"></font-awesome-icon>
      </div>
    </div>
    <div class="password-section__wrong-password" :class="{'password-section__wrong-password--show': showWrongPasswordIndicator}">
      Wrong password!
    </div>
  </div>
</template>

<script>
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

export default {
  components: {FontAwesomeIcon},
  name: "PasswordPrompt",
  data: () => {
    return {
      password: "",
      displayPassword: false
    }
  },
  props: {
    user: Object,
    session: Object,
    showWrongPasswordIndicator: Boolean
  },
  methods: {
    login() {
      window.lightdm.respond(this.password)
    },
    hideWrongPasswordIndicator() {
      this.$emit('hideWrongPasswordIndicator')
    }
  },
  emits: [
     'hideWrongPasswordIndicator'
  ]
}
</script>

<style lang="sass" scoped>
.password-section
  display: flex
  flex-direction: column

  .password-prompt
    display: flex

    .password-prompt__input-container
      border: 1px solid var(--font-color)
      border-radius: .75rem
      padding: .25rem .5rem
      margin-right: .5rem
      width: 10rem
      box-shadow: .25rem .25rem .5rem 0 #00000060
      text-shadow: .25rem .25rem .5rem #00000060
      display: flex
      align-items: center

      .password-prompt__input
        border: none
        background: transparent
        font-size: 1rem
        color: var(--font-color)
        text-align: center
        font-weight: 300
        font-family: "Raleway", sans-serif
        flex: 1
        width: 100%

        &:focus
          outline: none

        &::placeholder
          color: var(--font-color-darkened)
      
      .password-prompt__eye
        color: var(--font-color)
        font-size: .6rem
        cursor: pointer
        width: 1rem
        text-align: center
        transition: .4s opacity


    .password-prompt__confirm
      display: flex
      justify-content: center
      align-items: center
      color: var(--font-color)
      border-radius: .75rem
      border: 1px solid var(--font-color)
      width: 1.8rem
      height: 1.8rem
      cursor: pointer
      box-shadow: .25rem .25rem .5rem 0 #00000060
      transition: .4s transform

      .password-prompt__icon
        font-size: 1.5rem
        filter: drop-shadow(.25rem .25rem .35rem #00000080)

      &:hover
        transform: translateY(-.2rem)

  .password-section__wrong-password
    color: var(--font-color-darkened)
    font-size: .8rem
    opacity: 0
    transition: .4s opacity
    margin-top: .75rem
    text-align: center

    &.password-section__wrong-password--show
      opacity: 1
</style>