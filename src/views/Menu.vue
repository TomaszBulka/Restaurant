<template>
    <div class="positions" >
        <div class="single-position" v-for=" position in allPositions" :key="position.id" :class="{ ordered: position.ordered }" >
        <div class="name">
        {{ position.name }}
        </div>
        <div class="description">
        {{ position.description }}
        </div>
        <button @click="orderPosition(position); addPrices(position), recalculateDiscount({getSumOfOrders, getDiscounts})"> Zamów ! </button>
        </div>
    </div >
</template>
<script>
import { mapActions, mapGetters} from 'vuex'

export default {
    name: 'Menu',
    computed: mapGetters([ 'allPositions', 'getSumOfOrders', 'getDiscounts']),
    methods: mapActions(['orderPosition', 'addPrices', 'fetchPositions', 'recalculateDiscount']),
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