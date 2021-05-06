<template>
    Edit position
    <div v-if="id">
        <form @submit.prevent="editMenuPosition()">          
            <div class="form-group">
                <div>Edytuj pozycję</div>
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
            <button> Edytuj pozycję !</button>       
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
        </div>    
    </div>
    <div v-else>
        Nie zaznaczyłeś pozycji, która cchesz zaktualizować
    </div>

     <router-link to="Menu"> Powróć do Menu</router-link>

</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import PositionsService from '../../api/PositionsService'
export default {
    data(){
        return {
            id: this.$route.params._id,
            name: '',
            description: '',
            price: '',
            confirmationMessage: '',
            errorMessages: ''
        }
    },
    computed: mapGetters(['getPositionToEdit', 'allPositions']),
    methods:{
        ...mapActions(['findPositionToEdit']),
        async fetchInfo(){
        await this.findPositionToEdit(this.id)
        if(this.getPositionToEdit){
            this.name = this.getPositionToEdit.name
            this.description = this.getPositionToEdit.description
            this.price = this.getPositionToEdit.price
        }
        },
        async editMenuPosition(){
           let response =  await PositionsService.editPosition({
                _id: this.id,
                name: this.name,
                description: this.description,
                price: this.price
            })

            if(response.data == 'Pozycja została zedytowana'){
                this.errorMessages = ''
                this.confirmationMessage = response.data
            }else{
                this.errorMessages = response.data
            }
        }

    },
    mounted(){
        this.fetchInfo()
    }
}
</script>