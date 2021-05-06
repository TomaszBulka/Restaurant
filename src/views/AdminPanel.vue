<template>
    Admin 
    
    <div v-if="getLatestOrders">
    <ul>
        <li  v-for="order in getLatestOrders" :key="order.index" >
          Pozycje:   {{ order.orderedPositions }}     
           Suma:  {{ order.sum }}
          Data:   {{ order.dateOfOrder }}
           Adres:  {{ order.address}}
           <div class="realized" v-if="order.isRealized">
               ZREALIZOWANO
           </div>
           <div v-if="!order.isRealized">    
           <button @click="markAsRealized(order)">Zrealizowane</button>
           </div>
        </li>   
    </ul>
    </div>
    <div v-else>
        Nie ma jeszcze żadnych zamówień
    </div>        


</template>
<script>
import {mapActions, mapGetters} from 'vuex'
export default {
    computed: mapGetters(['getLatestOrders']),
    methods: mapActions(['fetchUser', 'fetchAdmin', 'fetchLatestOrders', 'markAsRealized']),
    mounted(){
        this.fetchUser()
        this.fetchAdmin()
        this.fetchLatestOrders()
        setInterval(this.fetchLatestOrders, 10000) 
       
    }
}
</script>

<style lang="scss" scoped>
.realized{
    color: red;

}
</style>