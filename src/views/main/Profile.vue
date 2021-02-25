<template>
    <div class="container">
        <div class="row">
            <div class="col-lg-4">
                <div class="boxprofile">
                    <div class="box">
                        <a href="#" @click.prevent="goPageChatlist"><img class="back" src="../../assets/back.png" alt="image"></a>
                        <p class="username" v-if="getUsername">@{{getUsername}}</p>
                        <p class="username" v-else>@{{getUserById.username}}</p>
                    </div>
                    <div class="box1">
                        <div class="boxphoto">
                            <label for="photoprofile">
                                <img id="update-photo" :src="getPhotoProfile" alt="image3" v-if="getPhotoProfile">
                                <img id="update-photo" :src="getUserById.photoProfile" alt="image3" v-else-if="getUserById.photoProfile">
                                <img src="../../assets/emptyprofile.jpg" alt="" v-else>
                            </label>
                        </div>
                        <div class="editprofile">
                            <input id="photoprofile" type="file" accept="image/x-png/,image/gif,image/jpeg" class="uploadphoto" v-on:change="updatePhoto">
                        </div>
                        <p class="name">{{getUserById.name}}</p>
                        <p class="username1" v-if="getUsername">@{{getUsername}}</p>
                        <p class="username1" v-else>@{{getUserById.username}}</p>
                    </div>
                    <div class="box2">
                        <p class="account">Account</p>
                        <p class="phoneNumber" v-if="getPhoneNumber">{{getPhoneNumber}}</p>
                        <p class="phoneNumber" v-else>{{getUserById.phoneNumber || '+62'}}</p>
                        <b-button v-b-modal.modalPhoneNumber style="background: transparent; border: none;"><a href="#" class="changephonenumber" style="text-decoration: none;">Tap to change phone number</a></b-button>

                        <b-modal id="modalPhoneNumber" title="Phone Number" @ok="updatePhoneNumber">
                            <div class="inputPhoneNumber">
                                <label for="phoneNumber">Phone : </label>
                                <input id="phoneNumber" class="updatephone" type="number" v-model.trim="$v.phoneNumber.$model" :class="{ 'is-invalid': validationStatus($v.phoneNumber) }" placeholder="Input your number">
                                <div class="invalid-feedback" v-if="!$v.phoneNumber.required">Field is required.</div>
                                <div class="invalid-feedback" v-if="!$v.phoneNumber.minLength">Field must have at least {{ $v.phoneNumber.$params.minLength.min }} characters.</div>
                            </div>
                        </b-modal>
                    </div>
                    <div class="box3">
                        <p class="username2" v-if="getUsername">@{{getUsername}}</p>
                        <p class="username2" v-else>@{{getUserById.username}}</p>
                        <b-button v-b-modal.modalUsername style="background: transparent; border: none;"><p class="title" style="margin: 5px">Username</p></b-button>

                        <b-modal id="modalUsername" title="Username" @ok="updateUsername">
                            <div class="inputUsername">
                                <label for="username">Username : </label>
                                <input id="username" class="updateusername" type="text" v-model.trim="$v.username.$model" :class="{ 'is-invalid': validationStatus($v.username) }" placeholder="Input username" style="padding: 10px">
                                <div class="invalid-feedback" v-if="!$v.username.required">Field is required.</div>
                            </div>
                        </b-modal>
                    </div>
                    <div class="box4">
                        <p class="bio">I'm Senior Frontend Developer from Microsoft</p>
                        <p class="title1">Bio</p>
                        <b-button v-b-modal.modalMap style="background: transparent; border: none;"><p class="title" style="margin: 5px">MAP</p></b-button>

                        <b-modal id="modalMap" title="Map" @shown="modalShown" @hidden="$emit('clear')" size="lg">
                            <div class="mapView">
                               <div style="display: flex; justify-content: center">
                                    <l-map :zoom="zoom" :center="center" style="height: 400px; width: 800px;" ref="mymap">
                                    <l-tile-layer :url="url" :attribution="attribution"/>
                                    <l-marker :lat-lng="markerLatLng" ></l-marker>
                                    </l-map>
                                </div>
                            </div>
                        </b-modal>
                    </div>
                    <div class="box5">
                        <p class="settings">Settings</p>
                        <button class="notification">Notification and Sounds</button>
                        <button class="privaty">Privaty and Security</button>
                        <button class="data">Data and Storage</button>
                        <button class="chat">Chat settings</button>
                        <button class="device">Devices</button>
                        <button @click.prevent="handleLogout" class="logout">Logout</button>
                    </div>
                </div>
            </div>
            <div class="col-lg-7">
                <div style="display: flex; justify-content: center; padding: 50%">
                    <img src="../../assets/logo.png" alt="">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators'
import { mapActions, mapGetters } from 'vuex'
import Swal from 'sweetalert2'
import { latLng } from 'leaflet'
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet'

export default {
  name: 'Profile',
  props: ['socket'],
  components: {
    LMap,
    LTileLayer,
    LMarker
  },
  data () {
    return {
      username: '',
      phoneNumber: '',
      photoProfile: [],
      previewImg: '',
      zoom: 13,
      center: latLng(0, 0),
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      markerLatLng: [0, 0]
    }
  },
  validations: {
    phoneNumber: { required, minLength: minLength(11) },
    username: { required }
  },
  methods: {
    ...mapActions(['getDataUserById', 'updateUserProfile', 'updatedUserPhone', 'updatedUsername', 'logout']),
    goPageChatlist () {
      this.$router.push('/main/chatlist')
    },
    modalShown () {
      setTimeout(() => {
        this.$refs.mymap.mapObject.invalidateSize()
      }, 100)
    },
    updatePhoto () {
      const imagename = (event.target.files[0].name)
      this.photoProfile = imagename
      this.previewImg = URL.createObjectURL(event.target.files[0])
      const form = new FormData()
      const image = document.getElementById('photoprofile').files[0]
      form.append('photoProfile', image)
      const userId = this.getUserById.id
      const payload = {
        userId,
        formData: form
      }
      this.updateUserProfile(payload)
    },
    validationStatus (validation) {
      return typeof validation !== 'undefined' ? validation.$error : false
    },
    updatePhoneNumber (bvModalEvt) {
      bvModalEvt.preventDefault()
      this.$v.$touch()
      if (this.$v.phoneNumber.$pending || this.$v.phoneNumber.$error) return
      const userId = this.getUserById.id
      const payload = {
        userId,
        phoneNumber: this.phoneNumber
      }
      this.updatedUserPhone(payload)
      this.$nextTick(() => {
        this.$bvModal.hide('modalPhoneNumber')
      })
    },
    updateUsername (bvModalEvt) {
      bvModalEvt.preventDefault()
      this.$v.$touch()
      if (this.$v.username.$pending || this.$v.username.$error) return
      const userId = this.getUserById.id
      const payload = {
        userId,
        username: this.username
      }
      this.updatedUsername(payload)
      this.$nextTick(() => {
        this.$bvModal.hide('modalUsername')
      })
    },
    handleLogout () {
      this.logout()
        .then(() => {
          localStorage.removeItem('vuex')
          Swal.fire({
            icon: 'success',
            title: 'Succeed logout',
            showConfirmButton: false,
            timer: 1500
          })
          this.$router.push('/auth/login')
        })
    }
  },
  computed: {
    ...mapGetters(['getUserById', 'getPhotoProfile', 'getPhoneNumber', 'getUsername'])
  },
  mounted () {
    this.$getLocation()
      .then(coordinates => {
        this.center = latLng(coordinates.lat, coordinates.lng)
        this.markerLatLng = [coordinates.lat, coordinates.lng]
      })
    this.getDataUserById()
  }
}
</script>

<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type=number] {
  -moz-appearance: textfield;
}

.col-lg-4 {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 10px;
    border-radius: 20px;
    box-shadow: 0 4px 20px rgba(0,0,0,.5);
}

.boxprofile {
    width: 100%;
    height: auto;
    padding: 20px;
}

.box {
    display: flex;
    position: relative;
    justify-content: center;
}

.back {
    position: absolute;
    left: 0px;
    top: 5px;
}

.username {
    font-family: Rubik;
    font-style: normal;
    font-weight: 500;
    font-size: 24px;

    color: #7E98DF;
}

.box1 {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.boxphoto {
    width: 82px;
    height: 82px;
    background-image: url('../../assets/email.jpg');
    background-repeat: no-repeat;
    background-position: 100px;
}

.boxphoto img {
    width: 82px;
    height: 82px;

    border-radius: 20px;
}

.editprofile {
    position: relative;
}

.edit {
    position: absolute;
    left: 25px;
    top: -85px;
    border: 2px solid black;
    border-radius: 10px;
    background: white;
}

.uploadphoto {
    display: none;
}

.name {
    margin-top: 20px;
    margin-bottom: 5px;
    font-family: Rubik;
    font-style: normal;
    font-weight: 900;
    font-size: 22px;

    color: #232323;
}

.username1 {
    font-family: Rubik;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;

    color: #848484;
}

.box2 {
    margin-top: 30px;
    margin-bottom: 30px;
}

.account {
    font-family: Rubik;
    font-style: normal;
    font-weight: 900;
    font-size: 19px;

    color: #232323;
}

.phoneNumber {
    font-family: Rubik;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;

    color: #232323;
}

.inputPhoneNumber {
    display: flex;
    flex-direction: column;
}

.updatephone {
    border: none;
    border-bottom: 1px solid black;
    padding: 10px;
}

.inputUsername {
    display: flex;
    flex-direction: column;
    border: none;
}

.updateusername {
    border: none;
    border-bottom: 1px solid black;
}

.username2 {
    font-family: Rubik;
    font-style: normal;
    font-weight: 900;
    font-size: 16px;

    color: #232323;
}

.title {
    font-family: Rubik;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;

    color: #848484;
}

.bio {
    width: 260px;
    font-family: Rubik;
    font-style: normal;
    font-weight: 900;
    font-size: 16px;

    color: #232323;
}

.title1 {
    font-family: Rubik;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;

    color: #848484;
}

.settings {
    margin-bottom: 20px;
    font-family: Rubik;
    font-style: normal;
    font-weight: 900;
    font-size: 19px;

    color: #232323;
}

.box5 {
    display: flex;
    flex-direction: column;
    margin-top: 30px;
}

.box5 button {
    width: max-content;
    padding-left: 50px ;
    background-color: transparent;
    border: none;
    font-family: Rubik;
    font-style: normal;
    font-weight: normal;
    font-size: 17px;

    color: #232323;
    outline: none;
}

.box5 button:hover {
    color: #7E98DF;
}

.box5 button:focus {
    color: #7E98DF;
}

.notification {
    background-image: url('../../assets/union.png');
    background-repeat: no-repeat;
}

.privaty {
    background-image: url('../../assets/key.png');
    background-repeat: no-repeat;
    margin-top: 35px;
}

.data {
    background-image: url('../../assets/vector.png');
    background-repeat: no-repeat;
    margin-top: 35px;
}

.chat {
    background-image: url('../../assets/chat1.png');
    background-repeat: no-repeat;
    margin-top: 35px;
}

.device {
    background-image: url('../../assets/device.png');
    background-repeat: no-repeat;
    margin-top: 35px;
}

.logout {
    background-image: url('../../assets/logout.png');
    margin-top: 35px;
}

.col-lg-8 {
    position: relative;
}

.scroll{
    width: 100%;
    height: 750px;
    padding: 0px;
    overflow-y: scroll;
    background: #FAFAFA;
}

.scroll::-webkit-scrollbar {
    display: none;
}

.box6 {
    display: flex;
    position: relative;
    margin-top: 10px;
}

.boxprofilechat {
    position: absolute;
    bottom: 0;
    width: 54px;
    height: 54px;
}

.boxprofilechat img {
    width: 100%;
    height: 54px;

    border-radius: 20px;
}

.boxchat {
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

.box7 {
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

.col-lg-7 {
    position: relative;
    margin: 10px;
    padding: 15px;
    border-radius: 20px;
    box-shadow: 0 4px 20px rgba(0,0,0,.5);
}

@media (max-width: 991px) {
    .col-lg-7 {
        display: none;
    }
}

@media (max-width: 435px) {
    .modal-open .modal {
        padding: 0 !important;
    }
}

@media (max-width: 320px) {
    .col-lg-4 {
        margin: 0;
    }
}
</style>
