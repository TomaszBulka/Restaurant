<template>
 <form @submit.prevent="addOrdersAddress()">          
            <div class="form-group">
                <div>Twój Adres</div>
                <div class="form-group">
                Miasto
                <input v-model="city">
                </div>  
                <div class="form-group">
                Ulica
                <input v-model="street">
                </div>  
                <div class="form-group">
                Numer domu
                <input v-model.number="housenumber" type="number">
                </div>
                <div class="form-group">
                Numer mieszkania
                <input v-model.number="apartamentnumber" type="number">
                </div>   
            </div>    
            <button> Potwierdź adres !</button>       
        </form>

    <div v-if="getCurrentOrder">
    Dziękujemy za złożenie zamówienia !!!
</div>

</template>
<script>
import OrderService from '../api/OrderService'
import {mapGetters, mapActions} from 'vuex'

export default {
    name: 'AddressForm',
    data(){
        return {
                
                city: '',
                street: '',
                housenumber: null,
                apartamentnumber: null
            
        }
    },
    computed: mapGetters(['getCurrentOrder', 'loggedUser', 'usersAddress']),
    methods:{ ...mapActions(['fetchCurrentOrder']),
    async addOrdersAddress(){
            await OrderService.addAddress({
                city: this.city,
                street: this.street,
                housenumber: this.housenumber,
                apartamentnumber: this.apartamentnumber
            })
            setTimeout(() => this.$router.push({name: 'Payments'}), 1000)
        }
    },
    mounted(){
        this.fetchCurrentOrder()
        if(this.loggedUser){
            this.city = this.usersAddress.city
            this.street = this.usersAddress.street
            this.housenumber = this.usersAddress.housenumber
            if(this.usersAddress.apartamentnumber){this.apartamentnumber = this.usersAddress.apartamentnumber}else{this.usersAddress.apartamentnumber = ''}
            
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