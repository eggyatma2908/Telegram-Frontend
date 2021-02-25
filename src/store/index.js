import Vue from 'vue'
import Vuex from 'vuex'
import jwt from 'jsonwebtoken'
import axios from 'axios'
import createPersistedState from 'vuex-persistedstate'
// import router from '../router/index'
import Swal from 'sweetalert2'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: '',
    password: '',
    accessToken: null || localStorage.getItem('accessToken'),
    refreshToken: null || localStorage.getItem('refreshToken'),
    id: null || localStorage.getItem('id'),
    photoProfile: '',
    phoneNumber: '',
    username: '',
    registeredUser: {},
    users: [],
    userById: [],
    saveMessages: [],
    messages: [],
    saveFriends: [],
    friends: []
  },
  plugins: [createPersistedState()],
  mutations: {
    togglePassword (state) {
      state.password = document.getElementById('password')
      if (state.password.type === 'password') {
        state.password.type = 'text'
      } else {
        state.password.type = 'password'
      }
    },
    photoProfile (state, payload) {
      state.photoProfile = payload
    },
    phoneNumber (state, payload) {
      state.phoneNumber = payload
    },
    username (state, payload) {
      state.username = payload
    },
    registered (state, payload) {
      state.registeredUser = payload
    },
    userLogin (state, payload) {
      state.user = payload
      state.accessToken = payload.accessToken
      state.refreshToken = payload.refreshToken
    },
    allUser (state, payload) {
      state.users = payload
    },
    userById (state, payload) {
      state.userById = payload
    },
    saveMessage (state, payload) {
      state.saveMessages = payload
    },
    allMessage (state, payload) {
      state.messages = payload
    },
    saveFriend (state, payload) {
      state.saveFriends = payload
    },
    allFriend (state, payload) {
      state.friends = payload
    },
    removeToken (state) {
      state.accessToken = null
      state.refreshToken = null
    }
  },
  actions: {
    login (context, payload) {
      return new Promise((resolve, reject) => {
        axios.post(`${process.env.VUE_APP_URL_API}/users/login`, payload)
          .then((res) => {
            const result = res.data.result
            localStorage.setItem('accessToken', result.accessToken)
            localStorage.setItem('refreshToken', result.refreshToken)
            localStorage.setItem('id', result.id)
            context.commit('photoProfile', '')
            context.commit('phoneNumber', '')
            context.commit('username', '')
            jwt.verify(result.accessToken, process.env.VUE_APP_ACCESS_TOKEN_KEY, (error, data) => {
              if (!error) {
                delete data.iat
                delete data.exp
              }
            })
            context.commit('userLogin', result)
            context.dispatch('interceptorRequest')
            resolve(res)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    logout (context) {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('id')
      context.commit('removeToken')
    },
    register (context, payload) {
      return new Promise((resolve, reject) => {
        context.dispatch('interceptorRequest')
        axios.post(`${process.env.VUE_APP_URL_API}/users/register`, payload)
          .then(res => {
            const result = res.data.result
            context.commit('registered', result)
            resolve(res)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    getDataUsers (context) {
      return new Promise((resolve, reject) => {
        context.dispatch('interceptorRequest')
        axios.get(`${process.env.VUE_APP_URL_API}/users/`)
          .then(res => {
            const result = res.data.result.users
            context.commit('allUser', result)
            resolve(res.data.result)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    getDataUserById (context) {
      return new Promise((resolve, reject) => {
        context.dispatch('interceptorRequest')
        axios.get(`${process.env.VUE_APP_URL_API}/users/${localStorage.getItem('id')}`)
          .then(res => {
            const result = res.data.result[0]
            context.commit('userById', result)
            resolve(res.data.result)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    updateUserProfile (context, payload) {
      return new Promise((resolve, reject) => {
        context.dispatch('interceptorRequest')
        axios.patch(`${process.env.VUE_APP_URL_API}/users/profile/${payload.userId}`, payload.formData)
          .then(res => {
            Swal.fire({
              icon: 'success',
              title: 'Succeed',
              text: 'Your personal information has been updated',
              showConfirmButton: false,
              timer: 1500
            })
            const photoProfile = res.data.result.photoProfile
            context.commit('photoProfile', photoProfile)
            resolve(res)
          })
          .catch((err) => {
            Swal.fire({
              icon: 'error',
              title: 'Failed',
              text: 'Your personal information failed to updated',
              showConfirmButton: false,
              timer: 1500
            })
            // router.push({ path: '/main/chatlist' })
            reject(err)
          })
      })
    },
    updatedUserPhone (context, payload) {
      return new Promise((resolve, reject) => {
        context.dispatch('interceptorRequest')
        axios.patch(`${process.env.VUE_APP_URL_API}/users/phonenumber/${payload.userId}`, payload)
          .then(res => {
            Swal.fire({
              icon: 'success',
              title: 'Succeed',
              text: 'Your phone number has been updated',
              showConfirmButton: false,
              timer: 1500
            })
            const phoneNumber = payload.phoneNumber
            context.commit('phoneNumber', phoneNumber)
            resolve(res)
          })
      })
    },
    updatedUsername (context, payload) {
      return new Promise((resolve, reject) => {
        context.dispatch('interceptorRequest')
        axios.patch(`${process.env.VUE_APP_URL_API}/users/username/${payload.userId}`, payload)
          .then(result => {
            Swal.fire({
              icon: 'success',
              title: 'Succeed',
              text: 'Your username has been updated',
              showConfirmButton: false,
              timer: 1500
            })
            const username = payload.username
            context.commit('username', username)
            resolve(result)
          })
      })
    },
    getDataMessages (context) {
      return new Promise((resolve, reject) => {
        context.dispatch('interceptorRequest')
        axios.get(`${process.env.VUE_APP_URL_API}/messages/`)
          .then(res => {
            const result = res.data.result
            context.commit('allMessage', result)
            resolve(res.data.result)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    insertDataMessage (context, payload) {
      return new Promise((resolve, reject) => {
        context.dispatch('interceptorRequest')
        axios.post(`${process.env.VUE_APP_URL_API}/messages/`, payload)
          .then(res => {
            const result = res.data.result
            context.commit('saveMessage', result)
            resolve(res)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    getDataFriends (context) {
      return new Promise((resolve, reject) => {
        context.dispatch('interceptorRequest')
        axios.get(`${process.env.VUE_APP_URL_API}/friends/`)
          .then(res => {
            const result = res.data.result
            context.commit('allFriend', result)
            resolve(res.data.result)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    insertDataFriend (context, payload) {
      return new Promise((resolve, reject) => {
        context.dispatch('interceptorRequest')
        axios.post(`${process.env.VUE_APP_URL_API}/friends/`, payload)
          .then(res => {
            const result = res.data.result
            console.log(result)
            Swal.fire({
              icon: 'success',
              title: 'Add friend success',
              showConfirmButton: false,
              timer: 1500
            })
            context.commit('saveFriend', result)
            resolve(res)
          })
          .catch((err) => {
            Swal.fire({
              icon: 'error',
              title: 'Friend already exist',
              showConfirmButton: false,
              timer: 1500
            })
            reject(err)
          })
      })
    },
    interceptorRequest (context) {
      axios.interceptors.request.use(function (config) {
        config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`
        return config
      }, function (error) {
        return Promise.reject(error)
      })
    },
    interceptorResponse (context) {
      axios.interceptors.response.use(function (response) {
        return response
      }, function (error) {
        return Promise.reject(error)
      })
    }
  },
  getters: {
    getUserLogin (state) {
      return state.user
    },
    isLogin (state) {
      return state.accessToken !== null
    },
    getSaveFriends (state) {
      return state.saveFriends
    },
    getPhotoProfile (state) {
      return state.photoProfile
    },
    getPhoneNumber (state) {
      return state.phoneNumber
    },
    getUsername (state) {
      return state.username
    },
    getUsers (state) {
      return state.users
    },
    getUserById (state) {
      return state.userById
    },
    getMessages (state) {
      return state.messages
    },
    getFriends (state) {
      return state.friends
    }
  },
  modules: {

  }
})
