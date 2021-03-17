<template>
    <div class="payments">
        Choose Payment Method

        <button @click="payAndDeleteCurrentOrder(), cleanBasket()">
            Zapłać
        </button>    
    </div>
</template>
<script>

import {mapActions} from 'vuex'
export default {
    methods: mapActions(['payAndDeleteCurrentOrder', 'cleanBasket'])
}
</script>
<style scoped>
.payments{
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