<template>
    <router-view :socket = 'socket'/>
</template>

<script>
import io from 'socket.io-client'

export default {
  name: 'Main',
  data () {
    return {
      socket: io('https://telegram-backend-eggy.fwdev.online')
    }
  }
}
</script>

<style scoped>

</style>
