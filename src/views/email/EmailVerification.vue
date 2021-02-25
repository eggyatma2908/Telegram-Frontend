<template>
  <div id="text" class="container">
    <div class="box">
        <div class="box1">
            <div class="box2">
                <img class="emaillogo" src="../../assets/email.jpg" alt="">
                <h1>Email Verification</h1>
                <div class="box3">
                    <p class="text">Hello User, you're almost ready to start enjoying our service. Simply click on the blue button below to verify your email address</p>
                </div>
                <button class="verify" type="submit" @click.prevent="emailVerification">Verify email address</button>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'
export default {
  name: 'EmailVerification',
  methods: {
    emailVerification () {
      return axios.patch(`${process.env.VUE_APP_URL_API}/emailVerification/emailverification`, {
        email: `${this.$route.params.email}`
      })
        .then(res => {
          Swal.fire({
            icon: 'success',
            title: 'Email has been verified',
            showConfirmButton: false,
            timer: 1500
          })
          this.$router.push('/auth/login')
        })
        .catch(() => {
          alert('Forbidden: Your account has been verified')
          this.$router.push('/auth/login')
        })
    },
    checkEmailVerified () {
      return axios.get(`${process.env.VUE_APP_URL_API}/emailVerification/checkEmailVerified`, {
        headers: {
          email: `${this.$route.params.email}`
        }
      })
        .then(() => {
        })
        .catch(() => {
          alert('Forbidden: Your email has not been registered ')
          this.$router.push('/auth/login')
        })
    }
  },
  created () {
    this.checkEmailVerified()
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Bangers&display=swap');

#text {
    font-family: 'Bangers', cursive;
    font-size: 20px;
}

.container {
    padding: 10px;
}

.box {
    border: 40px solid #7E98DF;
    border-radius: 20px;
}

.box1 {
    border: 40px solid #E5E5E5;
    border-radius: 20px;
}

.box2 {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding: 30px;
}

.box2 h1 {
    margin-top: 20px;
}

.box3 {
    width: 300px;
    text-align: center;
}

.emaillogo {
    width: 150px;
}

.verify {
    width: 250px;
    height: 50px;
    margin-top: 20px;
    font: 20px 'Rubik', sans-serif;
    font-weight: 900;
    border: none;
    border-radius: 10px;
    background: #E5E5E5;
    outline: none;
}

.verify:hover {
    background:  #7E98DF;
}

.verify:focus {
    background:  #7E98DF;
}
</style>
