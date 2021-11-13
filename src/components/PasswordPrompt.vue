<template>
  <div class="password-prompt">
    <input v-model="password" class="password-prompt__input" type="password" placeholder="password" @keyup.enter="login()" autofocus>
    <div class="password-prompt__confirm" @click="login()">
      <font-awesome-icon class="password-prompt__icon" :icon="['fas', 'angle-right']"></font-awesome-icon>
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
      password: ""
    }
  },
  props: {
    user: Object,
    session: Object
  },
  methods: {
    login() {
      window.lightdm.respond(this.password)
    }
  },
}
</script>

<style lang="sass" scoped>
.password-prompt
  display: flex

  .password-prompt__input
    border: 1px solid white
    background: transparent
    border-radius: .75rem
    margin-right: .5rem
    padding: .25rem .5rem
    font-size: 1rem
    color: white
    text-align: center
    width: 10rem
    box-shadow: .25rem .25rem .5rem 0 #00000060
    text-shadow: .25rem .25rem .5rem #00000060
    font-weight: 300
    font-family: "Raleway", sans-serif

    &:focus
      outline: none

    &::placeholder
      color: #e7e7e7

  .password-prompt__confirm
    display: flex
    justify-content: center
    align-items: center
    color: white
    border-radius: .75rem
    border: 1px solid white
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
</style>