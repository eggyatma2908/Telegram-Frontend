<template>
    <div class="container-fluid">
        <div class="boxforgotpassword">
            <div class="box">
                <a href="#" @click.prevent="goPageLogin"><img class="back" src="../../assets/back.png" alt="image"></a>
                <p class="title">Forgot Password</p>
            </div>
            <p class="text">You’ll get messages soon on your e-mail </p>
            <p class="title1">Email</p>
            <input class="email" type="email" placeholder="Enter your email">
            <button class="send">Send</button>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Forgotpassword',
  methods: {
    goPageLogin () {
      this.$router.push('/auth/login')
    }
  }
}
</script>

<style scoped>
.container-fluid {
    margin: 0;
    padding: 13px;
    background: #E5E5E5;
}

.boxforgotpassword {
    display: flex;
    flex-direction: column;
    align-items: center;

    width: 400px;
    height: 650px;
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
    left: -60px;
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
    margin-left: -40px;
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
    margin-bottom: 30px;
    padding-bottom: 10px;
    border: none;
    border-bottom: 1px solid #232323;
    outline: none;
}

.send {
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

.send:hover {
    color: #FFFFFF;
    background: #7E98DF;
}

.send:focus {
    outline: none;
    color: #FFFFFF;
    background: #7E98DF;
}

@media (max-width: 425px) {
  .container-fluid {
    width: 110%;
  }
}

@media (max-width: 375px) {
  .container-fluid {
    width: 120%;
  }
}

@media (max-width: 320px) {
  .container-fluid {
    width: 135%;
    padding: 55px 0;
  }
}
</style>
