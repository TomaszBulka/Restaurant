<template>
        <div class="opinions">
        <form class="create-opinion" @submit.prevent ="createNewOpinion">
        <label for="newOpinion">Smakowało ? Twoja opinia jest dla nas ważna !</label>
        <textarea id="newOpinion" v-model="newOpinionContent" />
        <button>Zostaw opinię !</button>
        </form>
        
        <div class="opinions-list" v-for="opinion in opinions" :key="opinion.id">
            {{ opinion.content }}
        </div>    
    </div>
</template>
<script>
import OpinionsService from '../api/OpinionsService'

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
    methods: {
        async getOpinions(){
            const response = await OpinionsService.fetchOpinions()
            this.opinions = response.data

        },
        async createNewOpinion(){
            await OpinionsService.addOpinion({
                content : this.newOpinionContent
            }).then(this.getOpinions())
           
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
