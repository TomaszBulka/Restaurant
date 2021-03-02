<template>
<router-link to="/"><div class="topbar">
Restaurant
<div class="user">
<div class="welcome" v-if="loggedUser">
  Witaj {{ loggedUser }} !
</div>
<div class="options">
<router-link to="UserPanel">  
<div class=" panellink" v-if="loggedUser">
  Twój Panel ||  
</div>
</router-link> 
<div class="login">
  <div v-if="!loggedUser"><router-link to="/Login">Zaloguj się</router-link></div><div v-else @click="logout()"> <router-link to="/"> Wyloguj się</router-link></div>
</div>
 
</div>
</div>
</div></router-link>
<div class="content">

<ViewsList></ViewsList>
<router-view/>
<Basket></Basket>

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
  computed: mapGetters(['loggedUser']),
  methods: mapActions(['fetchUser', 'logout']),
  mounted(){
    this.fetchUser()
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
