<template>
    <div class="views-list">
        <ul id="list">
            <router-link to="/"><li>O nas</li></router-link>
            <router-link to="/Menu"><li> Menu</li></router-link>
            <router-link to="/Contact"><li>Kontakt</li></router-link>
            <router-link to="/Opinions"><li>Opinie</li></router-link>    

        </ul>    
    </div>
</template>

<script>
export default {
    name: 'ViewsList'
    
}
</script>

<style lang="scss" scoped>
.views-list {
    display: grid;
    border: 1px solid;
    border-top: 0px;;
    width: 150px;
    height: 180px;

    ul{
        list-style: none;

        li{
            padding: 7px;
        }

        li:hover{
            color: grey;
            cursor: pointer;
        }
    }
}

</style>