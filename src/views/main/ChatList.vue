<template>
    <div class="container">
        <notifications position="bottom left" group="notif-message"/>
        <div class="row">
            <div class="col-lg-4">
                <div class="boxchatlist">
                    <div class="box">
                        <p class="title">Telegram</p>
                        <a href="" @click.prevent="goPageProfile"><img class="menu" src="../../assets/menu.png" alt="image"></a>
                    </div>
                    <div class="box1">
                        <img class="iconsearch" src="../../assets/search.png" alt="image1">
                        <input class="search" type="text" name="search" id="search" placeholder="Type your message...">
                        <div>
                            <b-button v-b-modal.modal-1 style="background: transparent; border: none;"><img class="plus" src="../../assets/plus.png" alt="image2"></b-button>

                            <b-modal id="modal-1" title="Add Friend" @ok="addFriend">
                                <div class="friendlist" v-for="user in userRegistered()" :key="user.id">
                                    <router-link :to="{ path: `/main/chatlist/${user.id}`}">
                                    <div class="boxprofilelist" style="display: flex; align-items:center; margin: 10px 0;">
                                        <div class="boxphoto">
                                            <div>
                                                <img id="update-photo" :src="user.photoProfile" alt="image3" v-if="user.photoProfile">
                                                <img src="../../assets/emptyprofile.jpg" alt="" v-else>
                                            </div>
                                        </div>
                                        <div class="box2">
                                            <p class="name" style="margin-left: 30px; font-size: 20px">{{user.name}}</p>
                                        </div>
                                    </div>
                                    </router-link>
                                </div>
                            </b-modal>
                        </div>
                    </div>
                    <div class="menulist">
                        <button class="all">All</button>
                        <button class="important">Important</button>
                        <button class="unread">Unread</button>
                    </div>
                    <div class="boxlistchat">
                        <div v-if="listFriends().length !== 0">
                            <div class="listchat" v-for="friend in listFriends()" :key="friend.id">
                                <router-link :to="{ path: `/main/chatlist/${friend.friendId}`}" style="text-decoration: none;" @click="scrollToEnd()">
                                <div class="contactprofile">
                                    <div class="boxphoto">
                                        <div>
                                            <img id="update-photo" :src="friend.photoProfile" alt="image3" v-if="friend.photoProfile">
                                            <img src="../../assets/emptyprofile.jpg" alt="" v-else>
                                        </div>
                                    </div>
                                   <div class="box2">
                                        <p class="name">{{friend.name}}</p>
                                        <div v-if="checkMessages().length !== 0 && checkMessages().filter(e => e.senderName === friend.name).length !== 0">
                                            <p class="newchat">{{checkMessages().filter(e => e.senderName === friend.name).slice(-1)[0].message}}</p>
                                        </div>
                                    </div>
                                    <div class="box3" v-if="checkMessages().length !== 0 && checkMessages().filter(e => e.senderName === friend.name).length !== 0">
                                        <p class="time">{{moment(checkMessages().filter(e => e.senderName === friend.name).slice(-1)[0].time).format('hh:mm')}}</p>
                                        <!-- <div class="notification">
                                            <p id="notification">{{checkMessages().filter(e => e.senderName === friend.name).length}}</p>
                                        </div> -->
                                    </div>
                                </div>
                                </router-link>
                            </div>
                        </div>
                        <div v-else>
                            <div class="listchat" v-for="friend in listFriends1()" :key="friend.id">
                                <router-link :to="{ path: `/main/chatlist/${friend.friendId}`}" style="text-decoration: none;" @click="scrollToEnd()">
                                <div class="contactprofile">
                                    <div class="boxphoto">
                                        <div>
                                            <img id="update-photo" :src="friend.photoProfile" alt="image3" v-if="friend.photoProfile">
                                            <img src="../../assets/emptyprofile.jpg" alt="" v-else>
                                        </div>
                                    </div>
                                    <div class="box2">
                                        <p class="name">{{friend.name}}</p>
                                        <div v-if="checkMessages().length !== 0 && checkMessages().filter(e => e.senderName === friend.name).length !== 0">
                                            <p class="newchat">{{checkMessages().filter(e => e.senderName === friend.name).slice(-1)[0].message}}</p>
                                        </div>
                                    </div>
                                    <div class="box3" v-if="checkMessages().length !== 0 && checkMessages().filter(e => e.senderName === friend.name).length !== 0">
                                        <p class="time">{{moment(checkMessages().filter(e => e.senderName === friend.name).slice(-1)[0].time).format('hh:mm')}}</p>
                                        <!-- <div class="notification">
                                            <p id="notification">{{checkMessages().filter(e => e.senderName === friend.name).length}}</p>
                                        </div> -->
                                    </div>
                                </div>
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-7" id="content">
                <div v-if="chatHistory()">
                    <div class="boxreceiverprofile" @click="show()">
                        <div class="receiverprofile" v-if="friendProfile().length === 1">
                            <div class="boxphoto">
                                <div>
                                    <img id="update-photo" :src="friendProfile()[0].photoProfile" alt="image3" v-if="friendProfile()[0].photoProfile">
                                    <img src="../../assets/emptyprofile.jpg" alt="" v-else>
                                </div>
                            </div>
                            <div>
                                <p>{{friendProfile()[0].name}}</p>
                            </div>
                        </div>
                    </div>
                    <div :class="friendProfile().length === 1 ? 'boxmessages1' : 'boxmessages'" v-if="chatHistory().length >= 1" ref="messagesContainer">
                        <div v-for="(chating, index) in chatHistory()" :key="index">
                            <div :class="chating.senderId === id ? 'left' : 'right'" v-if="chating.senderId === id || chating.receiverId === id">
                                <div :class="chating.senderId === id ? 'boxprofilechatleft' : 'boxprofilechatright'" v-if="chating.senderId === id || chating.receiverId === id">
                                    <img :src="chating.profileSender" alt="image4" v-if="chating.profileSender">
                                    <img src="../../assets/emptyprofile.jpg" alt="" v-else>
                                </div>
                                <div :class="chating.senderId === id ? 'boxchatleft' : 'boxchatright'" v-if="chating.senderId === id || chating.receiverId === id">
                                    <p>{{chating.message}}</p>
                                    <p class="time" style="text-align: right; font-size: 12px; margin: 0">{{moment(chating.time).format('hh:mm')}}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="box4">
                        <div class="input-group mb-3">
                            <input type="text" class="form-control" placeholder="Type your message ..." v-model="inputMessage" @keypress.enter="send">
                            <div class="input-group-append">
                                <button class="btn btn-outline-secondary" type="button" id="button-addon2" @click.prevent="send">Send</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else style="display: flex; justify-content: center; padding: 35%;">
                    <img src="../../assets/logo.png" alt="">
                </div>
            </div>
        </div>
        <div class="profilefriend">
            <div class="row">
                <div class="col-lg-3" id="myDIV">
                    <div class="box5">
                        <a href="#" @click="show()"><img class="back" src="../../assets/back.png" alt="image"></a>
                        <p class="username" v-if="friendProfile()[0].username">@{{friendProfile()[0].username}}</p>
                        <p class="username" v-else>@{{friendProfile()[0].username}}</p>
                    </div>
                    <div class="boxprofilefriend">
                        <div class="boxphotofriend">
                            <label for="photoprofile">
                                <img id="update-photo" :src="friendProfile()[0].photoProfile" alt="image3" v-if="friendProfile()[0].photoProfile">
                                <img src="../../assets/emptyprofile.jpg" alt="" v-else>
                            </label>
                        </div>
                    </div>
                    <div class="box6">
                        <div class="boxnamestatus">
                            <p class="name">{{friendProfile()[0].name}}</p>
                            <p>Online</p>
                        </div>
                        <img src="../../assets/chat.png" alt="">
                    </div>
                    <div class="box7">
                        <div class="boxphonefriend">
                            <p class="title">Phone Number</p>
                            <p v-if="friendProfile()[0].phoneNumber">{{friendProfile()[0].phoneNumber}}</p>
                            <p v-else>+62</p>
                        </div>
                    </div>
                    <button class="location">Location</button>
                    <div class="map" style="display: flex; justify-content: center">
                        <l-map :zoom="zoom" :center="center" style="height: 200px; width: 300px;" ref="mymap">
                        <l-tile-layer :url="url" :attribution="attribution"/>
                        <l-marker :lat-lng="markerLatLng" ></l-marker>
                        </l-map>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import moment from 'moment'
import { latLng } from 'leaflet'
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet'

export default {
  name: 'Chatlist',
  props: ['socket'],
  components: {
    LMap,
    LTileLayer,
    LMarker
  },
  data () {
    return {
      id: null || localStorage.getItem('id'),
      receiverId: this.$route.params.id,
      message: '',
      messages: [],
      inputMessage: '',
      moment: moment,
      zoom: 13,
      center: latLng(0, 0),
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      markerLatLng: [0, 0]
    }
  },
  updated () {
    this.$nextTick(() => this.scrollToEnd())
    this.$nextTick(() => this.scrollToEnd1())
  },
  methods: {
    ...mapActions(['getDataUsers', 'getDataFriends', 'getDataUserById', 'insertDataFriend', 'getDataMessages', 'insertDataMessage']),
    chatHistory () {
      if (this.$route.params.id) {
        return this.messages.filter(e => e.receiverId.match(this.$route.params.id) || e.senderId.match(this.$route.params.id))
      }
    },
    show () {
      document.getElementById('myDIV').classList.toggle('active')
    },
    scrollToEnd () {
      if (this.$refs.messagesContainer !== undefined) {
        var content = this.$refs.messagesContainer
        content.scrollTop = content.scrollHeight
      }
    },
    scrollToEnd1 () {
      var elment = document.getElementById('content')
      elment.scrollIntoView()
    },
    // read () {
    //   this.notification = document.getElementById('notification').innerHTML
    // },
    checkMessages () {
      return this.messages.filter(e => e.receiverId.match(this.id) || e.senderId.match(this.id))
    },
    listFriends () {
      return this.getSaveFriends.filter(e => e.userId.match(this.id) && e.photoProfile.match(this.getPhotoProfile))
    },
    listFriends1 () {
      return this.getFriends.filter(e => e.userId.match(this.id))
    },
    friendProfile () {
      return this.getUsers.filter(e => e.id.match(this.$route.params.id))
    },
    goPageProfile () {
      this.$router.push('/main/profile')
    },
    addFriend () {
      const payload = {
        userId: this.id,
        friendId: this.$route.params.id
      }
      this.insertDataFriend(payload)
      this.$router.push('/main/chatlist')
    },
    userRegistered () {
      return this.getUsers.filter((user) => {
        return !user.id.match(this.getUserById.id)
      })
    },
    send () {
      const dataMessage = {
        message: this.inputMessage,
        senderId: this.getUserById.id,
        receiverId: this.$route.params.id,
        profileSender: this.getUserById.photoProfile,
        senderName: this.getUserById.name,
        time: new Date()
      }
      this.socket.emit('privateMessage', dataMessage, data => {
        this.messages.push(data)
      })
      this.inputMessage = ''
    }
  },
  computed: {
    ...mapGetters(['getUsers', 'getMessages', 'getUserById', 'getSaveFriends', 'getFriends', 'getPhotoProfile'])
  },
  mounted () {
    this.getDataUsers()
    this.getDataUserById()
    this.getDataMessages()
    this.getDataFriends()
    this.socket.on('receiverMessage', (data) => {
      this.messages.push(data)
      this.$notify({
        group: 'notif-message',
        title: 'Message',
        text: 'New Message'
      })
    })
    this.socket.emit('userJoin', this.id)
    this.messages = this.getMessages
    this.$getLocation()
      .then(coordinates => {
        this.center = latLng(coordinates.lat, coordinates.lng)
        this.markerLatLng = [coordinates.lat, coordinates.lng]
      })
  }
}
</script>

<style scoped>
.col-lg-4{
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 655px;
    margin: 10px;
    border-radius: 20px;
    box-shadow: 0 4px 20px rgba(0,0,0,.5);
}

.boxchatlist {
    width: 100%;
    height: auto;
    padding: 20px;
}

.box {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.title {
    margin: 0;
    font-family: Rubik;
    font-style: normal;
    font-weight: 500;
    font-size: 29px;

    color: #7E98DF;
}

.menu {
    width: 22px;
    height: 18.7px;
}

.box1 {
    position: relative;
    margin-top: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.iconsearch {
    position: absolute;
    top: 15px;
    left: 15px;
}

.search {
    width: 85%;
    height: 50px;

    padding-left: 50px;

    background: #FAFAFA;
    font-size: 15px;
    border: none;
    border-radius: 15px;
    outline: none;
}

.menulist {
    display: flex;
    justify-content: space-between;

    margin-top: 30px;
    margin-bottom: 30px;
}

.all {
    width: 20%;
    height: 50px;

    border: none;
    border-radius: 20px;
    outline: none;
}

.all:hover {
    color: white;
    background: #7E98DF;
}

.all:focus {
    color: white;
    background: #7E98DF;
}

.important {
    width: 45%;
    height: 50px;

    border: none;
    border-radius: 20px;
    outline: none;
}

.important:hover {
    color: white;
    background: #7E98DF;
}

.important:focus {
    color: white;
    background: #7E98DF;
}

.unread {
    width: 30%;
    height: 50px;

    border: none;
    border-radius: 20px;
    outline: none;
}

.unread:hover {
    color: white;
    background: #7E98DF;
}

.unread:focus {
    color: white;
    background: #7E98DF;
}

.listchat {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
}

.boxlistchat{
    width: 100%;
    height: 55%;
    padding: 0px;
    overflow-y: scroll;
    background: #FAFAFA;
}

.boxlistchat::-webkit-scrollbar {
    display: none;
}

.boxlistchat {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.contactprofile {
    display: flex;
    align-items: center;
    position: relative;
}

.contactprofile1 {
    display: flex;
    align-items: center;
    position: relative;
    justify-content: space-between;
}

.boxphoto {
    width: 64px;
    height: 64px;
    background-image: url('../../assets/email.jpg');
    background-repeat: no-repeat;
    background-position: 100px;
}

.boxphoto img {
    width: 100%;
    height: 64px;

    border-radius: 20px;
}

.edit {
    position: absolute;
    left: 50px;
    top: -2px;
    border: 2px solid black;
    border-radius: 10px;
    background: white;
}

.uploadphoto {
    display: none;
}

.box2 {
    display: flex;
    flex-direction: column;
    margin: 0 0 0 20px;
}

.name {
    width: max-content;
    margin-bottom: 5px;
    font-family: Rubik;
    font-style: normal;
    font-weight: 900;
    font-size: 14px;

    color: #232323;
}

.newchat {
    width: 130px;
    height: 17px;
    margin: 0;
    font-family: Rubik;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    overflow: hidden;

    color: #7E98DF;
}

.box3 {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.time {
    margin: 0;
    font-size: 14px;
}

/* .notification {
    width: 20px;
    height: 20px;
    background: #7E98DF;
    border-radius: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.notification p {
    margin: 0;
    font-size: 12px;
} */

.col-lg-7 {
    position: relative;
    height: 655px;
    margin: 10px;
    padding: 15px;
    border-radius: 20px;
    box-shadow: 0 4px 20px rgba(0,0,0,.5);
}

.boxreceiverprofile {
    cursor: pointer;
}

.receiverprofile {
    display: flex;
    flex-direction: row;
    padding-bottom: 10px;
    border-bottom: 1px solid black;
}

.receiverprofile p {
    margin: 10px 20px;
}

.boxmessages{
    width: 100%;
    height: 90%;
    padding: 0px;
    overflow-y: scroll;
    background: #FAFAFA;
}

.boxmessages::-webkit-scrollbar {
    display: none;
}

.boxmessages {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.boxmessages1{
    width: 100%;
    height: 500px;
    padding: 0px;
    overflow-y: scroll;
    background: #FAFAFA;
}

.boxmessages1::-webkit-scrollbar {
    display: none;
}

.boxmessages1 {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

/* .server {
    display: flex;
    position: relative;
    margin-top: 10px;
}

.server.boxchat {
    border-radius: 6px;
    max-width: 60%;
    word-wrap: break-word !important;
    margin-top: 10px;
    margin-bottom: 0;
    margin-left: 70px;
    padding: 20px;
    background: #7E98DF;
    border-radius: 35px 35px 35px 10px;
}

.server.boxprofilechat {
    position: absolute;
    bottom: 0;
    width: 54px;
    height: 54px;
}

.server.boxprofilechat img {
    width: 100%;
    height: 54px;

    border-radius: 20px;
}

.client {
    display: flex;
    position: relative;
    margin-top: 10px;
}

.client.boxchat {
    border-radius: 6px;
    max-width: 60%;
    word-wrap: break-word !important;
    margin-top: 10px;
    margin-bottom: 0;
    margin-left: 70px;
    padding: 20px;
    background: grey;
    border-radius: 35px 35px 35px 10px;
}

.client.boxprofilechat {
    position: absolute;
    bottom: 0;
    width: 54px;
    height: 54px;
}

.client.boxprofilechat img {
    width: 100%;
    height: 54px;

    border-radius: 20px;
} */

.left {
    display: flex;
    position: relative;
    margin: 10px 0;
    transform: rotate(180deg);
    transform: rotateY(180deg);
}

.boxprofilechatleft {
    position: absolute;
    bottom: 0;
    width: 54px;
    height: 54px;
}

.boxprofilechatleft img {
    width: 100%;
    height: 54px;

    border-radius: 20px;
}

.boxchatleft {
    border-radius: 6px;
    max-width: 60%;
    word-wrap: break-word;
    margin-top: 10px;
    margin-bottom: 0;
    margin-left: 70px;
    padding: 20px;
    background: #7E98DF;
    border-radius: 35px 35px 35px 10px;
}

.boxchatleft p {
    margin: 0 0 5px 0;
    transform: rotateY(180deg);
}

.right {
    display: flex;
    position: relative;
    margin: 10px 0;
}

.boxprofilechatright {
    position: absolute;
    bottom: 0;
    width: 54px;
    height: 54px;
}

.boxprofilechatright img {
    width: 100%;
    height: 54px;

    border-radius: 20px;
}

.boxchatright {
    border-radius: 6px;
    max-width: 60%;
    word-wrap: break-word;
    margin-top: 10px;
    margin-bottom: 0;
    margin-left: 70px;
    padding: 20px;
    background: #848484;
    border-radius: 35px 35px 35px 10px;
}

.boxchatright p {
    margin: 0 0 5px 0;
}

.box4 {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.input-group {
    width: 100%;
    padding: 10px;
    position: absolute;
    bottom: 0;
}

.col-lg-3 {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 655px;
    margin: 10px;
    padding: 30px;
    border-radius: 20px;
    box-shadow: 0 4px 20px rgba(0,0,0,.5);

    position: absolute;
    background: white;
    top: 0;
    right: -360px;
    transition: .4s;
}

.col-lg-3.active {
    right: 160px;
    transition: .4s;
    z-index: 10;
}

.box5 {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

p.username {
    font-family: Rubik;
    font-style: normal;
    font-weight: 500;
    font-size: 24px;

    color: #7E98DF;
    margin: 0 0 0 10px;
}

.boxphotofriend {
    width: 82px;
    height: 82px;
    background-image: url('../../assets/email.jpg');
    background-repeat: no-repeat;
    background-position: 100px;
    margin: 30px;
}

.boxphotofriend img {
    width: 82px;
    height: 82px;

    border-radius: 20px;
}

.box6, .box7 {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    align-items: center;
    margin: 10px;
}

.boxnamestatus p, .boxphonefriend p {
    margin: 0;
}

.box6 img {
    width: 22px;
    height: 20px;
}

.boxnamestatus .name {
    font-family: Rubik;
    font-style: normal;
    font-weight: 900;
    font-size: 19px;

    color: #232323;
}

.boxnamestatus p{
    font-family: Rubik;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;

    color: #232323;
}

.boxphonefriend .title {
    font-family: Rubik;
    font-style: normal;
    font-weight: 900;
    font-size: 19px;

    color: #232323;
}

.boxphonefriend p{
    font-family: Rubik;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;

    color: #232323;
}

.location {
    width: 100%;
    height: 50px;

    border: none;
    border-radius: 20px;
    outline: none;
    font-size: 20px;
    margin: 10px 0 20px 0;
}

.location:hover {
    color: white;
    background: #7E98DF;
}

.location:focus {
    color: white;
    background: #7E98DF;
}

@media (max-width: 1024px) {
    .col-lg-3.active {
        right: 70px;
    }
    .leaflet-container.leaflet-touch-drag.leaflet-touch-zoom {
        width: 220px !important;
    }
}

@media (max-width: 991px) {
    .col-lg-3 {
        top: 675px;
        right: -800px !important;
        display: none;
    }
    .col-lg-3.active {
        width: 40%;
        right: 135px !important;
        display: flex;
    }
    .leaflet-container.leaflet-touch-drag.leaflet-touch-zoom {
        width: 350px !important;
    }
}

@media (max-width: 768px) {
    .col-lg-3 {
        top: 675px;
        right: -800px !important;
        display: none;
    }
    .col-lg-3.active {
        width: 50%;
        right: 20px !important;
        display: flex;
    }
    .leaflet-container.leaflet-touch-drag.leaflet-touch-zoom {
        width: 350px !important;
    }
}

@media (max-width: 425px) {
    .col-lg-3 {
        top: 675px;
        right: -450px !important;
    }
    .col-lg-3.active {
        width: 50%;
        right: 0px !important;
    }
    .leaflet-container.leaflet-touch-drag.leaflet-touch-zoom {
        width: 180px !important;
    }
}

@media (max-width: 375px) {
    .boxnamestatus .name {
        font-size: 15px;
    }
    .boxnamestatus p {
        font-size: 12px;
    }
    .boxphonefriend .title {
        font-size: 15px;
    }
    .boxphonefriend p {
        font-size: 12px;
    }
    .location {
        font-size: 16px;
    }
    .leaflet-container.leaflet-touch-drag.leaflet-touch-zoom {
        width: 150px !important;
    }
}

@media (max-width: 375px) {
    .boxchatlist {
        padding: 20px 0;
    }
    .boxphonefriend .title {
        font-size: 14px;
    }
    .leaflet-container.leaflet-touch-drag.leaflet-touch-zoom {
        width: 130px !important;
    }
}
</style>
