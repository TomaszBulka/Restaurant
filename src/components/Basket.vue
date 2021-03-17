<template>
<div class="basket">
    <div class="orderedPositions" v-for=" (position, index) in orderedPositions" :key="index">
    {{ position.name }} <button id="delete" @click="deleteOrder(index); substractPrices(position), recalculateDiscount({getSumOfOrders, getDiscounts}) ">x</button>
    </div>
    <div class="price">
       Cena :  {{ getSumOfPrices }} zł
    </div>
    <div class="discountedPrice" v-if="getDiscountedPrice">
        Twoja cena: {{ getDiscountedPrice }} zł
    </div>
    
    <div v-if="getDiscountedPrice">
    <button @click="createOrder({getDiscountedPrice, orderedPositions})">Zamów</button>
    </div>
    <div v-else>
    <button @click="createOrder({getSumOfPrices, orderedPositions})">Zamów</button>
    </div>
    
</div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
computed: mapGetters(['orderedPositions', 'getSumOfPrices', 'getDiscountedPrice', 'getSumOfOrders', 'getDiscounts']),
methods: mapActions(['deleteOrder', 'substractPrices', 'createOrder', 'recalculateDiscount']),
    
}
</script>
<style lang="scss" scoped>
.basket{
    display: flex;
    flex-direction: column;
    float: right;
    margin-right: 0px;
    width: 200px;
    height: 200px;
    border: solid 1px;
    border-top: 0px;

    #delete{
        height: 10px;
        width: 10px;
        font-size: 7px;
        text-align: center;
        justify-content: center;
        
    }
    
}

</style>