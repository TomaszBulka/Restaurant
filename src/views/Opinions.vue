<template>
        <div class="opinions">
        <form class="create-opinion" @submit="createNewOpinion">
        <label for="newOpinion">Smakowało ? Twoja opinia jest dla nas ważna !</label>
        <textarea id="newOpinion" v-model="newOpinionContent" />
        <button>Zostaw opinię !</button>
        </form>
        
        <div class="opinions-list" v-for="opinion in opinions" :key="opinion.id">
            {{ opinion.content }}
        </div>    
    </div>
    <div v-if="getCurrentOrder">
    <router-link to="/AddressForm">
    Powróć do zamówienia
  </router-link>  
</div>

</template>
<script>
import OpinionsService from '../api/OpinionsService'
import {mapGetters} from 'vuex'

export default {
    name: 'Opinions',
    data(){
        return{
            newOpinionContent: '',
            opinions: []
        }
    },
    mounted() {
        this.getOpinions()
    },
    computed: mapGetters(['getCurrentOrder']),
    methods: {
        
        async getOpinions(){
            const response = await OpinionsService.fetchOpinions()
            this.opinions = response.data

        },
        async createNewOpinion(){
            await OpinionsService.addOpinion({
                content : this.newOpinionContent
            })
        }
    }
    
}
</script>

<style lang="scss" scoped>
.opinions{
    margin-left: auto;
    margin-right: auto;

.create-opinion{
    display: flex;
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
.opinions-list{
        display: flex;
        flex-direction: column;

    }
}  

</style>
