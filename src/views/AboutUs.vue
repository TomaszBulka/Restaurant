<template>
<div class="text">
    {{ description }}
</div>

<div v-if="isAdmin">
    <router-link to="EditAboutUs"><button >Edytuj</button></router-link>
</div>

 <div v-if="getCurrentOrder">
    <router-link to="/AddressForm">
    Powróć do zamówienia
  </router-link>  
</div>
</template>
<script>
import {mapGetters} from 'vuex'
import InfoService from '../api/InfoService'
export default {
    name: 'AboutUs',
    data(){
        return{
            description: ''
        }
    },
    mounted(){
        this.getDescription()
    },
    computed: mapGetters(['getCurrentOrder', 'isAdmin']),
    methods: {
        async getDescription(){
            const response = await InfoService.getInfo()
            this.description = response.data.description
        }
    }
}
</script>
<style lang="scss" scoped>
.text{
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