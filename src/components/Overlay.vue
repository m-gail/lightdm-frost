<template>
  <div class="overlay">
    <slot></slot>
  </div>
</template>

<script>
export default {
name: "Overlay"
}
</script>

<style lang="sass" scoped>
.overlay
  width: 100vw
  height: 100vh
  background-color: rgba(0, 0, 0, .8)
  position: fixed
  top: 0
  display: flex
  justify-content: center
  align-items: center
  backdrop-filter: blur(1rem)
</style>