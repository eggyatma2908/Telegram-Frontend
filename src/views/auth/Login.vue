<template>
    <div class="container-fluid">
        <div class="boxlogin">
            <p class="title">Login</p>
            <p class="text">Hi, Welcome back!</p>
            <label class="title1" for="email">Email</label>
            <div class="boxemail">
                <input id="email" class="email" type="email" placeholder="Enter your email" v-model.trim="$v.email.$model" :class="{ 'is-invalid': validationStatus($v.email) }">
                <div class="invalid-feedback" v-if="!$v.email.required">Field is required.</div>
                <div class="invalid-feedback" v-if="!$v.email.email">Invalid email</div>
            </div>
            <label class="title2" for="password">Password</label>
            <div class="boxpassword">
                <input id="password" class="password" type="password" placeholder="Enter your password" v-model.trim="$v.password.$model" :class="{ 'is-invalid': validationStatus($v.password) }">
                <input type="checkbox" class="toggle-password" @click="togglePassword">
                <div class="invalid-feedback" v-if="!$v.password.required">Field is required.</div>
                <div class="invalid-feedback" v-if="!$v.password.minLength">Field must have at least {{ $v.password.$params.minLength.min }} characters.</div>
            </div>
            <a href="" class="forgotpassword" @click.prevent="goForgotPassword">Forgot password?</a>
            <button class="login" type="submit" @click.prevent="goLogin">Login</button>
            <div class="box">
                <div class="lineleft"></div>
                <p class="text1">Login with</p>
                <div class="linerigth"></div>
            </div>
            <button class="logingoogle"><img class="logogoogle" src="../../assets/logogoogle.png" alt="image"><p>Google</p></button>
            <p class="text2">Don't have an account? <a href="#" @click.prevent="goPageRegister">Sign Up</a></p>
        </div>
    </div>
</template>

<script>
import { required, minLength, email } from 'vuelidate/lib/validators'
import { mapMutations, mapActions } from 'vuex'
import Swal from 'sweetalert2'

export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  validations: {
    email: { required, email },
    password: { required, minLength: minLength(8) }
  },
  methods: {
    ...mapActions(['login']),
    validationStatus (validation) {
      return typeof validation !== 'undefined' ? validation.$error : false
    },
    goForgotPassword () {
      this.$router.push('/auth/forgotpassword')
    },
    goLogin () {
      this.$v.$touch()
      if (this.$v.$pending || this.$v.$error) return
      const payload = {
        email: this.email,
        password: this.password
      }
      this.login(payload)
        .then(res => {
          Swal.fire({
            icon: 'success',
            title: 'Login Success',
            showConfirmButton: false,
            timer: 1500
          })
          this.$router.push('/main/chatlist/')
        })
        .catch((err) => {
          console.log(err.response.data.err.error)
          if (err.response.data.err.error === 'Email has not been verified') {
            Swal.fire({
              icon: 'error',
              title: 'Email has not been verified',
              showConfirmButton: false,
              timer: 1500
            })
          } else if (err.response.data.err.error === 'Email has not been registered') {
            Swal.fire({
              icon: 'error',
              title: 'Email has not been registered',
              showConfirmButton: false,
              timer: 1500
            })
          } else if (err.response.data.err.error === 'Password wrong') {
            Swal.fire({
              icon: 'error',
              title: 'Password wrong',
              showConfirmButton: false,
              timer: 1500
            })
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Login Failed',
              showConfirmButton: false,
              timer: 1500
            })
          }
        })
    },
    goPageRegister () {
      this.$router.push('/auth/register')
    },
    ...mapMutations(['togglePassword'])
  }
}
</script>

<style scoped>
.container-fluid {
    margin: 0px;
    padding: 13px;
    background: #E5E5E5;
}

.boxlogin {
    display: flex;
    flex-direction: column;
    align-items: center;

    width: 400px;
    margin: auto;
    padding: 40px;
    box-shadow: 0px 20px 20px rgba(126, 152, 223, 0.05);
    border-radius: 30px;
    background: white;
}

.title {
    margin: 0;
    font-family: Rubik;
    font-style: normal;
    font-weight: 500;
    font-size: 22px;

    color: #7E98DF;
}

.text {
    margin-top: 30px;
    margin-bottom: 30px;
    margin-left: -180px;
    font-family: Rubik;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;

    color: #232323;
}

.title1 {
    margin-left: -260px;
    font-family: Rubik;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;

    color: #848484;

    opacity: 0.75;
}

.email {
    width: 300px;
    padding-bottom: 10px;
    border: none;
    border-bottom: 1px solid #232323;
    outline: none;
}

.title2 {
    margin-left: -240px;
    margin-top: 30px;
    font-family: Rubik;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;

    color: #848484;

    opacity: 0.75;
}

.boxpassword {
    position: relative;
}

.password {
    width: 300px;
    padding-bottom: 10px;
    background-image: url('../../assets/eye.png');
    background-repeat: no-repeat;
    background-position: right;
    background-position-y: 5px;
    border: none;
    border-bottom: 1px solid #232323;
    outline: none;
}

.toggle-password {
    position: absolute;
    width: 20px;
    height: 20px;
    right: 0px;
    opacity: 0;
}

.invalid-feedback {
    width: 93%;
}

.forgotpassword {
    margin-top: 30px;
    margin-bottom: 40px;
    margin-right: -160px;
    font-family: Rubik;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;

    color: #7E98DF;
}

.login {
    width: 300px;
    height: 60px;

    font-family: Rubik;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;

    color: #7E98DF;

    background: #FFFFFF;
    border: 1px solid #7E98DF;
    border-radius: 70px;
}

.login:hover {
    color: #FFFFFF;
    background: #7E98DF;
}

.login:focus {
    outline: none;
    color: #FFFFFF;
    background: #7E98DF;
}

.box {
    position: relative;
    margin-top: 20px;
    margin-bottom: 20px;
}

.lineleft {
    position: absolute;
    top: 10px;
    left: -100px;
    width: 80px;
    height: 0px;

    border: 1px solid #848484;
}

.text1 {
    margin: 0;
    font-family: Rubik;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;

    color: #848484;
}

.linerigth {
    position: absolute;
    top: 10px;
    right: -100px;
    width: 80px;
    height: 0px;

    border: 1px solid #848484;
}

.logingoogle {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 300px;
    height: 60px;

    background: #FFFFFF;
    border: 1px solid #7E98DF;
    box-sizing: border-box;
    border-radius: 70px;

    font-family: Rubik;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;

    color: #7E98DF;
}

.logingoogle p {
    margin-bottom: 0;
    margin-left: 10px;
}

.logingoogle:focus {
    outline: none;
}

.text2 {
    margin-top: 20px;
    font-family: Rubik;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;

    color: #313131;
}

@media (max-width: 375px) {
  .boxlogin {
    width: auto;
  }
}

@media (max-width: 320px) {
  .boxlogin {
    width: auto;
  }
  .back {
    left: -70px;
  }
  .text {
    margin-left: -110px;
  }
  .title1 {
    margin-left: -195px;
  }
  .title2 {
    margin-left: -165px;
  }
  .email, .password {
    width: 235px;
  }
  .forgotpassword {
    margin-right: -100px;
  }
  .login {
    width: 245px;
  }
  .lineleft {
    width: 50px;
    left: -70px;
  }
  .linerigth {
    width: 50px;
    right: -70px;
  }
  .logingoogle {
    width: 245px;
  }
}
</style>
