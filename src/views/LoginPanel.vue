<template>
<div class="panel">
    <form  @submit.prevent="login()">
    Login <input v-model="username">
    Hasło <input v-model="password">
    <button>Zaloguj się</button>
    </form>
    <div class="message">
    {{ message }}
    </div>
    Nie posiadasz u nas konta ? <router-link to="/Register">Zarejestruj się !</router-link>
</div>

</template>
<script>
import UsersService from '../api/UsersService'
export default {
    data(){
        return {
            username: '',
            password: '',
            message: ''
        }
    },
    methods: {
        async login(){
         let response = await UsersService.loginUser({
                username: this.username,
                password: this.password
            })

         if(response.data == 'Success'){
             setTimeout(() => this.$router.push({
                path: '/UserPanel'
            }), 1000)
         }else if (response.data == 'Invalid username/password'){
             this.message = "Niepoprawny login lub hasło - Spróbuj ponownie !"
         }  
        }
    }
}
</script>

<style lang="scss" scoped>
.panel{
   display: grid;
    margin-left: auto;
    margin-right: auto;
    text-align:justify;
    line-height: 1.5;
    letter-spacing: 1.5px;
    width: 800px;
    padding: 20px;
    margin-top: 50px;

    .message{
        margin-top: 10px;
        margin-bottom: 10px;
        color: red;
    }
}

</style>