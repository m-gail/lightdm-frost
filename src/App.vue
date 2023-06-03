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
  <transition name="fade">
    <div v-if="fadeOut" class="fade-out-overlay"></div>
  </transition>
</template>

<style lang="sass">
html
  font-size: var(--root-font-size)

body
  margin: 0
  font-family: 'Raleway', sans-serif

.root
  background: var(--background-image, url("assets/img/background.jpg")) center
  background-size: cover
  width: 100vw
  height: 100vh
  overflow: hidden
  display: flex
  align-items: center
  justify-content: center

.fade-out-overlay
  width: 100vw
  height: 100vh
  background-color: black
  position: fixed
  top: 0
  left: 0
  z-index: 100

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
    let activeSession = window.lightdm.sessions.filter(session => session.key === window.lightdm.users[0].session)[0] ?? window.lightdm.sessions[0];
    return {
      'displaySessionChooser': false,
      'displayUserChooser': false,
      'showWrongPasswordIndicator': false,
      'fadeOut': false,
      'sessions': window.lightdm.sessions,
      'activeSession': activeSession,
      'users': window.lightdm.users,
      'activeUser': window.lightdm.users[0]
    }
  },
  mounted() {
    window.lightdm.authentication_complete.connect(() => {
      if (window.lightdm.is_authenticated) {
        this.fadeOut = true
        setTimeout(() => window.lightdm.start_session(this.activeSession.key), 400)
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
