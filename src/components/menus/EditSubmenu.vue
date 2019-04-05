<template>
    <div>
        <nav class="navbar-light bg-light vertical-center">
            <div class="container limit-max">
                <div class="row vertical-center">
                    <div class="col">
                        <div id="backButtonWrapper" class="btn buttonWrapper" style="float: left;">
                            <button>
                                <router-link class="vertical-center buttonLinks" :to="'/showPortfolio/' +  artistId">
                                    <i class="material-icons arrowIcon">arrow_back</i>
                                </router-link>
                            </button>
                        </div>
                    </div>
                    <div class="col">
                        <div id="acceptButtonWrapper" class="btn buttonWrapper" style="float: right;">
                            <button class="acceptButton" @click="saveClicked()">
                                <div class="vertical-center buttonLinks acceptText">
                                    ACCEPT
                                </div>
                            </button>
                        </div>
                    </div>
                
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
export default {
    name: 'EditSubmenu',

    methods: {
        saveClicked: function(){
            this.$emit('saveClicked');
        }
    },

    props:{
        artistId:{
            type: Number,
            default: 0
        }
    }
}

</script>

<style scoped>

    .vertical-center{
        display: flex; 
        align-items: center;  /*Aligns vertically center */
    }

    .limit-max{
        max-width: 1000px;
    }

    nav{
        height:75px;
        border-top: black;
        border: black !important;
        padding-top: 5px;
        padding-bottom: 5px;
    }

    button{
        width: 100%; 
        padding-left:0px; 
        padding-right:0px;
        height: inherit;
    }

    .buttonWrapper{
        padding: 0; 
        min-width: 5rem;
        height: 50px; 
    }

    button {
        background: none;
        border: none;
        text-decoration: none;

    }

    .acceptButton{
        font-size: 1rem;
        font-weight:bold;
        border-radius: 30px;
        padding-left: 20px;
        padding-right: 20px;

        background-image: linear-gradient(to right, #00fb82, #187fe6);
    }

    .acceptButton:hover{
        background-image: linear-gradient(to right, #14Ca9f, #1648d0) !important;
    }

    .arrowIcon{
        margin: 0 auto;
    }

    .acceptText{
        color: white;
    }

    .buttonLinks{
        text-decoration: none;
    }

</style>


