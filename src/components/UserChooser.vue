<template>
  <Overlay class="user-chooser">
    <div class="user-chooser__wrapper">
      <input id="username" class="user-chooser__input" type="text" placeholder="username" v-model="username"
             @keypress="showErrorMessage = false" @keyup.enter="chooseUser()" @keyup.esc="$emit('userChosen', activeUser)" autofocus>
      <transition name="fade">
        <div v-if="showErrorMessage" class="user-chooser__error-message">This user does not exist.</div>
      </transition>
    </div>
  </Overlay>
</template>

<script>
import Overlay from "./Overlay";

export default {
  name: "UserChooser",
  components: {Overlay},
  data: () => {
    return {
      username: "",
      showErrorMessage: false
    }
  },
  props: {
    users: Array,
    activeUser: String
  },
  emits: [
    'userChosen'
  ],
  methods: {
    chooseUser: function () {
      let foundUser = this.users.filter(user => user.username === this.username)
      if (foundUser.length > 0) {
        this.$emit('userChosen', foundUser[0])
      } else {
        this.showErrorMessage = true
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.user-chooser
  .user-chooser__wrapper
    position: relative
    width: 100%

    .user-chooser__input
      font-size: 2rem
      text-align: center
      background: none
      color: white
      width: 100%
      font-family: "Raleway", sans-serif
      font-weight: 300
      border: none

      &:focus
        outline: none

    .user-chooser__error-message
      color: #e7e7e7
      position: absolute
      bottom: 0
      width: 100%
      font-size: 1.5rem
      padding-top: 1rem
      transform: translateY(100%)
      text-align: center
</style>