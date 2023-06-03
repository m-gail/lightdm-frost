<template>
  <Overlay class="session-chooser" :keydown="keyDownHandler">
    <div
      :key="session.id"
      v-for="session of sessions"
      :class="{
        'session-chooser__session': true,
        'session-chooser__session--active': activeSession.key === session.key,
      }"
      @click="$emit('sessionChosen', session)"
    >
      {{ session.name }}
    </div>
    <div class="session-chooser__submit" @click="$emit('hide')">Confirm</div>
  </Overlay>
</template>

<script>
import Overlay from "./Overlay";

export default {
  name: "SessionChooser",
  components: { Overlay },
  props: {
    sessions: Array,
    activeSession: Object,
  },
  emits: ["sessionChosen", "hide"],
  methods: {
    keyDownHandler: function(event) {

    }
  },
};
</script>

<style lang="sass" scoped>
.session-chooser
  flex-direction: column

  .session-chooser__session
    color: white
    padding: .25rem 1rem
    margin: .2rem
    cursor: pointer
    border-radius: .75rem
    border: 1px solid transparent
    transition: .4s border

    &.session-chooser__session--active
      border: 1px solid white

  .session-chooser__submit
    border: 1px solid white
    border-radius: .75rem
    margin-top: 1rem
    cursor: pointer
    padding: .25rem 1rem
    color: white
</style>
