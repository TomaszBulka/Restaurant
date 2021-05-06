<template>
    <form @submit.prevent="addMenuPosition()">          
            <div class="form-group">
                <div>Dodaj pozycję</div>
                <div class="form-group">
                Nazwa
                <input v-model="name">
                </div>  
                <div class="form-group">
                Opis
                <input v-model="description">
                </div>  
                <div class="form-group">
                Cena
                <input v-model.number="price">
                </div>
            </div>    
            <button> Dodaj pozycję do Menu !</button>       
        </form>
        <div v-if="errorMessages">
        <div class="errorMessages"  v-for="message in errorMessages" :key="message.index">
        {{ message }}
        </div>
        </div>
        <div v-else>
             <div class="confirmationMessage">
        {{ confirmationMessage }}
        </div>
         <router-link to="/Menu">
        <div>
            Powróć do Menu
        </div>    
        </router-link>
        </div>    
</template>
<script>
import PositionsService from '../../api/PositionsService'

export default {
    data(){
        return {
            image: '',
            name: '',
            description: '',
            price: null,
            confirmationMessage: '',
            errorMessages: ''
        }
    },
    methods: {
        async addMenuPosition(){
          let response =  await PositionsService.createPosition({
                 name: this.name,
                 description: this.description,
                 price: this.price
            }
            )
            console.log(response.data)

            if(response.data == 'Pozycja dodana !'){
                this.errorMessages = ''
                this.confirmationMessage = response.data
            }else{
                this.errorMessages = response.data
            }
        }
    }
}
</script>