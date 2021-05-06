<template>
<div class="text">
<div class="contact">
Telefon: {{ phone }}
</div>
<div class="contact">
email: {{ email }}
</div>
<div class="contact">
Adres: {{ address }}
</div>
<div class="contact">
Czat
</div>
</div>
<div v-if="isAdmin">
    <router-link to="EditContact"><button >Edytuj</button></router-link>
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
    data(){
        return{
            phone: '',
            email: '',
            address: ''
        }
    },
    mounted(){
        this.getContactInfo()
    },
    computed: mapGetters(['getCurrentOrder', 'isAdmin']),
    methods: {
        async getContactInfo(){
            const response = await InfoService.getInfo()
            this.phone = response.data.phone
            this.email = response.data.email
            this.address = response.data.address
    }
}
}
</script>

<style lang="scss" scoped>
.text{
    display: flex;
    margin-left: auto;
    margin-right: auto;
    text-align:justify;
    line-height: 1.5;
    letter-spacing: 1.5px;
    width: 800px;
    padding: 20px;
    margin-top: 50px;

    .contact{
        margin-right: 20px;
    }
}

</style>
