<template>

Witaj {{ loggedUser}} !

<div v-if="!getPastOrders">
Nie złożyłes jeszcze żadnych zamówień
</div>    
<div v-else>
Twoje ostatnie zamówienia
<ul>
<li v-for="(order, index) in getPastOrders" :key="index" >
    <div v-if="index <=4">
   <ul v-for="(orderedPosition, index) in order" :key="index">
       {{ orderedPosition.name }} :  {{ orderedPosition.price }} zł <button @click="orderPosition(orderedPosition); addPrices(orderedPosition);
        recalculateDiscount({getSumOfOrders, getDiscounts})">Zamów ponownie! </button>
   </ul>
    </div>
</li>
</ul>
</div>
<div v-if="!getSumOfOrders || getSumOfOrders <= 500">
    Nie masz jeszcze żadnych zniżek :(
</div>
<div v-else-if="getSumOfOrders > 500 && getSumOfOrders <= 1000" @click="addDiscount(getDiscounts[0])">
Twoja zniżka - 5 %
</div>
<div v-else-if="getSumOfOrders > 1000" @click="addDiscount(getDiscounts[1])">
Twoja zniżka -  10 %  
</div>

 
</template>
<script>
import {mapGetters, mapActions} from 'vuex'

export default {
    name: 'UserPanel',
    computed: mapGetters(['loggedUser', 'getPastOrders', 'getSumOfOrders', 'getDiscounts']),
    methods: mapActions(['fetchUser', 'fetchPastOrders', 'orderPosition', 'addPrices', 'fetchSumOfOrders', 'addDiscount', 'recalculateDiscount', 'fetchAddress']),
    mounted(){
        this.fetchUser(),
        this.fetchPastOrders(),
        this.fetchSumOfOrders(),
        this.fetchAddress()
    }    
}
</script>

<style scoped>

</style>