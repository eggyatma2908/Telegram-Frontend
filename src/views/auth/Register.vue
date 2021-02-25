<template>
    <div class="container-fluid">
        <div class="boxregister">
            <div class="box">
                <a href="#" @click.prevent="goPageLogin"><img class="back" src="../../assets/back.png" alt="image"></a>
                <p class="title">Register</p>
            </div>
            <p class="text">Let’s create your account!</p>
            <label class="title1" for="name">Name</label>
            <div class="boxname">
                <input id="name" class="name" type="text" placeholder="Enter your name" v-model.trim="$v.name.$model" :class="{ 'is-invalid': validationStatus($v.name) }">
                <div class="invalid-feedback" v-if="!$v.name.required">Field is required.</div>
            </div>
            <label class="title2" for="email">Email</label>
            <div class="boxemail">
                <input id="email" class="email" type="email" placeholder="Enter your email"  v-model.trim="$v.email.$model" :class="{ 'is-invalid': validationStatus($v.email) }">
                <div class="invalid-feedback" v-if="!$v.email.required">Field is required.</div>
                <div class="invalid-feedback" v-if="!$v.email.email">Invalid email</div>
              </div>
            <label class="title3" for="password">Password</label>
            <div class="boxpassword">
                <input id="password" class="password" type="password" placeholder="Enter your password" v-model.trim="$v.password.$model" :class="{ 'is-invalid': validationStatus($v.password) }">
                <input type="checkbox" class="toggle-password" @click="togglePassword">
                <div class="invalid-feedback" v-if="!$v.password.required">Field is required.</div>
                <div class="invalid-feedback" v-if="!$v.password.minLength">Field must have at least {{ $v.password.$params.minLength.min }} characters.</div>
            </div>
            <button class="register" type="submit" @click.prevent="signUp">Register</button>
            <div class="box1">
                <div class="lineleft"></div>
                <p class="text1">Register with</p>
                <div class="linerigth"></div>
            </div>
            <button class="registergoogle" type="submit"><img class="logogoogle" src="../../assets/logogoogle.png" alt="image1"><p>Google</p></button>
        </div>
    </div>
</template>

<script>
import { required, minLength, email } from 'vuelidate/lib/validators'
import { mapMutations, mapActions } from 'vuex'
import Swal from 'sweetalert2'

export default {
  name: 'Register',
  data () {
    return {
      name: '',
      email: '',
      password: ''
    }
  },
  validations: {
    name: { required, minLength: minLength(0) },
    email: { required, email },
    password: { required, minLength: minLength(8) }
  },
  methods: {
    validationStatus (validation) {
      return typeof validation !== 'undefined' ? validation.$error : false
    },
    ...mapActions(['register']),
    signUp () {
      this.$v.$touch()
      if (this.$v.$pending || this.$v.$error) return
      const payload = {
        name: this.name,
        email: this.email,
        password: this.password
      }
      this.register(payload)
        .then(() => {
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Register successfully',
            showConfirmButton: false,
            timer: 1500
          })
        })
        .catch(() => {
          Swal.fire({
            icon: 'error',
            title: 'Failed',
            text: 'Email already exist!',
            showConfirmButton: false,
            timer: 1500
          })
        })
    },
    goPageLogin () {
      this.$router.push('/auth/login')
    },
    ...mapMutations(['togglePassword'])
  }
}
</script>

<style scoped>
.container-fluid {
    width: 100%;
    margin: 0px;
    padding: 13px;
    background: #E5E5E5;
}

.boxregister {
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

.box {
    display: flex;
    position: relative;
}

.back {
    position: absolute;
    left: -100px;
    top: 5px;
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
    margin-left: -130px;
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

.name {
    width: 300px;
    padding-bottom: 10px;
    border: none;
    border-bottom: 1px solid #232323;
    outline: none;
}

.title2 {
    margin-top: 20px;
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

.title3 {
    margin-top: 20px;
    margin-left: -240px;
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

.register {
    width: 300px;
    height: 60px;

    margin-top: 30px;

    font-family: Rubik;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;

    color: #7E98DF;

    background: #FFFFFF;
    border: 1px solid #7E98DF;
    border-radius: 70px;
}

.register:hover {
    color: #FFFFFF;
    background: #7E98DF;
}

.register:focus {
    outline: none;
    color: #FFFFFF;
    background: #7E98DF;
}

.box1 {
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

.registergoogle {
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

.registergoogle p {
    margin-bottom: 0;
    margin-left: 10px;
}

.registergoogle:focus {
    outline: none;
}

@media (max-width: 375px) {
  .boxregister {
    width: auto;
  }
}

@media (max-width: 320px) {
  .boxregister {
    width: auto;
  }
  .back {
    left: -70px;
  }
  .text {
    margin-left: -60px;
  }
  .title1, .title2 {
    margin-left: -195px;
  }
  .title3 {
    margin-left: -165px;
  }
  .name, .email, .password {
    width: 235px;
  }
  .register {
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
  .registergoogle {
    width: 245px;
  }
}
</style>
