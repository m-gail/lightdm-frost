<template>
  <div class="root">
    <Panel
        :showWrongPasswordIndicator="showWrongPasswordIndicator"
        @hideWrongPasswordIndicator="showWrongPasswordIndicator = false"
        v-on:displaySessionChooser="displaySessionChooser = true"
        v-on:displayUserChooser="displayUserChooser = true"
        :user="activeUser"
        :session="activeSession"></Panel>
  </div>
  <transition name="fade">
    <UserChooser
        @userChosen="handleUserChosen($event)"
        :users="users"
        :activeUser="activeUser"
        v-if="displayUserChooser"></UserChooser>
  </transition>
  <transition name="fade">
    <SessionChooser @sessionChosen="activeSession = $event"
                    @hide="displaySessionChooser = false"
                    :sessions="sessions"
                    :activeSession="activeSession"
                    v-if="displaySessionChooser"></SessionChooser>
  </transition>
</template>

<style lang="sass">
html
  font-size: 28px

body
  margin: 0
  font-family: 'Raleway', sans-serif

.root
  background: url("assets/img/background.jpg") center
  background-size: cover
  width: 100vw
  height: 100vh
  overflow: hidden
  display: flex
  align-items: center
  justify-content: center

.fade-enter-active, .fade-leave-active
  transition: .4s opacity

.fade-enter-from, .fade-leave-to
  opacity: 0
</style>

<script>
import Panel from "./components/Panel";
import UserChooser from "./components/UserChooser";
import SessionChooser from "./components/SessionChooser";

export default {
  components: {SessionChooser, Panel, UserChooser},
  data: () => {
    return {
      'displaySessionChooser': false,
      'displayUserChooser': false,
      'showWrongPasswordIndicator': false,
      'sessions': window.lightdm.sessions,
      'activeSession': window.lightdm.sessions.filter(session => session.key === window.lightdm.users[0].session)[0],
      'users': window.lightdm.users,
      'activeUser': window.lightdm.users[0]
    }
  },
  mounted() {
    window.lightdm.authentication_complete.connect(() => {
      if (window.lightdm.is_authenticated) {
        window.lightdm.start_session(this.activeSession.key)
      } else {
        window.lightdm.authenticate(this.activeUser.username)
        this.showWrongPasswordIndicator = true
      }
    })
    this.startNewAuthentication();
  },
  methods: {
    handleUserChosen($event) {
      this.activeUser = $event
      this.displayUserChooser = false
      this.showWrongPasswordIndicator = false
      this.startNewAuthentication()
    },
    startNewAuthentication() {
      window.lightdm.cancel_authentication();
      window.lightdm.authenticate(this.activeUser.username)
    }
  }
}
</script>