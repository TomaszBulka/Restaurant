<template>
 <form @submit.prevent="editContact()">          
            <div class="form-group">
                <div>Kontakt</div>
                <div class="form-group">
                Email
                <input v-model="email">
                </div>  
                <div class="form-group">
                Nr telefonu
                <input v-model.number="phone" type="number">
                </div>  
                <div class="form-group">
                Adres
                <input v-model="address">
                </div>
            </div>    
            <button> Potwierdź dane kontaktowe !</button>       
        </form>
    
</template>
<script>
import InfoService from '../../api/InfoService'
export default {
    data(){
        return {
            email: '',
            phone: null,
            address: ''
        }
    },
    methods: {
        async editContact(){
            await InfoService.updateInfo({email: this.email, phone: this.phone, address: this.address})
        },
         async getContact(){
          let response =  await InfoService.getInfo()
          this.email = response.data.email
          this.phone = response.data.phone
          this.address = response.data.address
        }
    },
    mounted(){
        this.getContact()
    }
    
}
</script>
