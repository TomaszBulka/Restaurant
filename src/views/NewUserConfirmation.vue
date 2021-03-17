<template>
    <div class="thankyou">
    <div>
    Dziękujemy za rejestrację !
    </div>
    <div class="links">

    <router-link to= '/' id="main">Powróć do strony głównej</router-link>
    <router-link to='/Login' id="login"> Zaloguj się </router-link>
    </div>
    </div>
</template>

<style lang="scss" scoped>
.thankyou{
   display: grid;
    margin-left: auto;
    margin-right: auto;
    text-align:justify;
    line-height: 1.5;
    letter-spacing: 1.5px;
    width: 800px;
    padding: 20px;
    margin-top: 50px;

    .links{
        display: block;

        #main{
            margin-right: 50px;
        }
    }
}
</style>