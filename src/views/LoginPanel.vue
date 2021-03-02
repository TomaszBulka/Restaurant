<template>
<div class="panel">
    <form  @submit.prevent="login()">
    Login <input v-model="username">
    Hasło <input v-model="password">
    <button>Zaloguj się</button>
    </form>
    Nie posiadasz u nas konta ? <router-link to="/Register">Zarejestruj się !</router-link>
</div>

</template>
<script>
import UsersService from '../api/UsersService'
export default {
    data(){
        return {
            username: '',
            password: ''
        }
    },
    methods: {
        async login(){
            await UsersService.loginUser({
                username: this.username,
                password: this.password
            })
           
          setTimeout(() => this.$router.push({
                path: '/UserPanel'
            }), 500) 
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
}

</style>