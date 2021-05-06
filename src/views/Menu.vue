<template>
    <div class="positions" >
        <div class="single-position" v-for=" (position, index) in allPositions" :key="index" :class="{ ordered: position.ordered }" >
        <div class="name">
        {{ position.name }}
        </div>
        <div class="description">
        {{ position.description }}
        </div>
        <div v-if="isAdmin">
       <router-link :to="{name: 'EditPosition', params: {_id: position._id}}"><button >Edytuj</button></router-link>
        <button @click="deleteMenuPosition({position, index})">Usuń</button>
        </div>
        <div v-else>
        <button @click="orderPosition(position); addPrices(position), recalculateDiscount({getSumOfOrders, getDiscounts})"> Zamów ! </button>
        </div>
        </div>
    </div >
    <div class="create-position" v-if="isAdmin">
        <router-link to="AddPosition"><button>Dodaj pozycję</button></router-link>
    </div>
    <div v-if="getCurrentOrder">
    <router-link to="/AddressForm">
    Powróć do zamówienia
  </router-link>  
</div>   

</template>
<script>
import { mapActions, mapGetters} from 'vuex'

export default {
    name: 'Menu',
    computed: mapGetters([ 'allPositions', 'getSumOfOrders', 'getDiscounts', 'getCurrentOrder', 'isAdmin']),
    methods: mapActions(['orderPosition', 'addPrices', 'fetchPositions', 'recalculateDiscount', 'deleteMenuPosition']),
    mounted(){
       this.fetchPositions()
      
    }
}
</script>
<style lang="scss" scoped>
.positions{
    display: grid;
    flex-direction: column;
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