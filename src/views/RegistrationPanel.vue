<template>
    <div class="panel">
        <form @submit.prevent="createNewUser()"> 
            <div class="form-group">
                Nazwa użytkownika
                <input v-model="username"  />
            </div>
            <div class="form-group">
                Imię
                <input v-model="firstName"  />
            </div>
            <div class="form-group">
                Nazwisko
                <input v-model="lastName"  />
            </div>
            <div class="form-group">
                Hasło
                <input v-model="password"/>
            </div>
            <div class="form-group">
                Email
                <input v-model="email"/>
            </div>
            <div class="form-group">
                <div>Twój Adres</div>
                <div class="form-group">
                Miasto
                <input v-model="address.city">
                </div>  
                <div class="form-group">
                Ulica
                <input v-model="address.street">
                </div>  
                <div class="form-group">
                Numer domu
                <input v-model.number="address.housenumber" type="number">
                </div>
                <div class="form-group">
                Numer mieszkania
                <input v-model.number="address.apartamentnumber" type="number">
                </div>   
            </div>    
            <button> Zarejestruj się !</button>       
        </form>
        <div class="messages" v-for="message in messages" :key="message.index">
        {{ message }}
        </div>
        
    </div>
    
</template>
<script>
import UsersService from '../api/UsersService'

export default {
    data(){
        return {
            username: '',
            firstName: '',
            lastName: '',
            password: '',
            email: '',
            address: {
                city: '',
                street: '',
                housenumber: null,
                apartamentnumber: null
                
            },
            messages: ''
        }
    },
    methods: {
        async createNewUser(){
       let response = await UsersService.createUser({
            username: this.username,
            firstName: this.firstName,
            lastName: this.lastName,
            password: this.password,
            email: this.email,
            address: this.address
        })

        if(response.data == 'There are no errors'){
            setTimeout(() => this.$router.push({ name: 'NewUserConfirmation'}), 1000)
        }else{
            this.messages = response.data
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

    .messages{
        color: red;
    }
}
</style>