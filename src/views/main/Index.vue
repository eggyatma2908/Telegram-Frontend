<template>
    <router-view :socket = 'socket'/>
</template>

<script>
import io from 'socket.io-client'

export default {
  name: 'Main',
  data () {
    return {
      socket: io('ws://telegram-backend-eggy.fwdev.online/v1', { transports: ['websocket'] })
    }
  }
}
</script>

<style scoped>

</style>
