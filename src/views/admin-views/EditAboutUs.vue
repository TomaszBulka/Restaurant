<template>
    <div class="edit-form">
        <form class="edit-text" @submit.prevent="updateDescription">
        <textarea id="newDescription" v-model="newDescriptionContent" />
        <button>Edytuj</button>
        </form>     
    </div>
</template>
<script>
import InfoService from '../../api/InfoService'

export default {
    data(){
        return {
            newDescriptionContent: ''
        }
    },
    methods: {
        async updateDescription(){
            await InfoService.updateInfo({ description: this.newDescriptionContent})
        },
        async getDescription(){
          let response =  await InfoService.getInfo()
          this.newDescriptionContent = response.data.description
        }
    },
    mounted(){
        this.getDescription()
    }
    
}
</script>
<style lang="scss" scoped>
.edit-form{
    margin-left: auto;
    margin-right: auto;

.edit-text{
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

    #newDescription{
        height: 400px;
    }
}

}  

</style>