<template>
<div class="text">
Skontaktuj się z nami.
Telefon: 59509050
email: mail@mail.com
Adres: Adres
Czat
</div>
<div v-if="getCurrentOrder">
    <router-link to="/AddressForm">
    Powróć do zamówienia
  </router-link>  
</div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
    computed: mapGetters(['getCurrentOrder'])
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
