<template>

<router-link to="/"><div class="topbar">
Restaurant
<div class="user">
<div class="welcome" v-if="loggedUser">
  Witaj {{ loggedUser }} !
</div>
<div class="options">
 
<div class=" panellink" v-if="loggedUser">
  <div v-if="isAdmin">
  <router-link to="AdminPanel"> 
  Twój Panel ||
  </router-link>
  </div>
  <div v-else>
  <router-link to="UserPanel"> 
  Twój Panel ||
  </router-link>
  </div>   
</div>

<div class="login">
  <div v-if="!loggedUser"><router-link to="/Login">Zaloguj się</router-link></div><div v-else @click="logout()"> <router-link to="/"> Wyloguj się</router-link></div>
</div>
 
</div>
</div>
</div></router-link>
<div class="content">


<ViewsList></ViewsList>

<router-view/>

<div v-if="!getCurrentOrder && !isAdmin">
<Basket></Basket>
</div>


  
</div>
 

<div class="footer">
Footer 
</div>
  
</template>

<script>
import ViewsList from './components/ViewsList'
import Basket from './components/Basket'
import { mapActions, mapGetters} from 'vuex'


export default {
  name: 'App',
  components: { ViewsList,  Basket},
  computed: mapGetters(['loggedUser', 'getCurrentOrder', 'isAdmin']),
  methods: mapActions(['fetchUser', 'logout', 'fetchAdmin', 'fetchAddress']),
  mounted(){
    this.fetchUser()
    this.fetchAdmin()
    this.fetchAddress() 
  }  
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  
 
  .topbar {
    height: 80px;
    width: 100%;
    border-bottom: solid 1px;
    border-top: solid 1px;
    text-align: left;
    display: block;

    .user{
      float: right;
      display: grid;
    
    .welcome{
      float: right;
      margin-right: 5px;
    }
    .options{
      display: inline-flex;

      .login{
      float: right;
      margin-right: 5px;
    }
    .panellink{
      float: left;
      margin-right: 5px;
    }

    }

   
    

    }

  }
  .content {
    display: flex;
  }
  .footer {
    position: fixed;
    bottom: 0;
    height: 40px;
    width: 100%;
    border-top: solid 1px;
    text-align: center;
  }
  

}
</style>
