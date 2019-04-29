<template>
    <div class="content">
        <form v-on:submit="createGenre">
            <div class="form-row">
                <div class="form-group col-12">
                    <span style="font-weight:bold;font-size:30px;">New Genre</span>
                    <router-link v-if="parentGenreId != '1'" v-bind:to="'/manageGenres/'+parentGenreId" style="height: 28px; width: 28px">
                        <i class="material-icons iconOffer">clear</i>
                    </router-link>
                    <router-link v-else v-bind:to="'/manageGenres/all'" style="height: 28px; width: 28px">
                        <i class="material-icons iconOffer">clear</i>
                    </router-link>
                    <h6 v-if="parentGenreName != ''" class="card-subtitle mb-2 text-muted">This sub-genre will belong to <strong>{{parentGenreName}}.</strong></h6>
                    <h6 v-else class="card-subtitle mb-2 text-muted">This genre will be a <strong>principal genre.</strong></h6>
                    <div id="errorsDiv" class="validationErrors vertical-center">
                        <p style="margin: 0px;">{{errors}}</p>
                    </div>
                     <div style="width:100%;margin-top:25px;">
                        <p class="card-text" style="font-weight:bold;display:inline-block;">NAME </p><small><i>   ES</i></small>
                        <div class="input-group">
                            <input v-model="genreNameES" type="text" class="form-control">
                            <div class="input-group-append">
                                <span class="input-group-text">ES</span>
                            </div>
                        </div>
                    </div>
                    <div style="width:100%;margin-top:25px;">
                        <p class="card-text" style="font-weight:bold;display:inline-block;">NAME</p><small><i>   EN</i></small>
                        <div class="input-group">
                            <input v-model="genreNameEN" type="text" class="form-control">
                            <div class="input-group-append">
                                <span class="input-group-text">EN</span>
                            </div>
                        </div>
                    </div>
                    <div class="continueButtonDiv">
                        <b-button class="continueButton" variant="primary" size="sm" type="submit">SAVE</b-button>
                    </div>
                </div>  
            </div>
        </form>
    </div>
</template>

<script>
import GAxios from '@/utils/GAxios.js';
import endpoints from '@/utils/endpoints.js';
import GSecurity from '@/security/GSecurity.js';

export default {
    name: "CreateGenreForm",

    data: function() {
        return {
            parentGenreName: undefined,
            genreNameEN: "",
            genreNameES: "",
            errors: "",
            gsecurity: undefined,
        }
    },

    props: {
        parentGenreId: {
            type: String
        },
        parentGenreName: {
            type: String
        }
    },

    methods: {
        createGenre() {

            NProgress.start();
            GAxios.post(endpoints.createGenre, {
                "name_es": this.genreNameES,
                "name_en": this.genreNameEN,
                "parentGender": this.parentGenreId
            }).then(response => {
                console.log(response);
                if(this.parentGenreId == 1){
                    this.$router.push('/manageGenres/all');
                }
                else{
                    this.$router.push('/manageGenres/'+this.parentGenreId);
                }
                
            }).catch(ex => {
                console.log(ex);
                console.log(ex.response.data.error);
                this.errors = ex.response.data.error;
                document.getElementById("errorsDiv").style.display = "block";
            }).then( () => {
                NProgress.done();
            })
        },
    },

    beforeMount() {
        if (!this.gsecurity.isAuthenticated()) {
            this.$router.push({name: "error"});
        } else {
            this.gsecurity = GSecurity
            var GAxiosToken = this.gsecurity.getToken();
            var authorizedGAxios = GAxios;
            authorizedGAxios.defaults.headers.common['Authorization'] = 'Token '+GAxiosToken;
        }
    },

    created() {
        this.gsecurity = GSecurity;
        this.gsecurity.obtainSavedCredentials();
    },
}
</script>

<style scoped>

    .content {
        padding: 10px;
    }

    .continueButton {
        font-size: 22px;
        font-weight: bold;
        border: none;
        border-radius: 30px;
        width: 45%;
        background-image: linear-gradient(to right, #00fb82, #187fe6);
    }

    .continueButton:hover{
        background-image: linear-gradient(to right, #14Ca9f, #1648d0) !important;
    }

    .continueButtonDiv {
        margin-top: 30px;
        margin-bottom: 5%;
        display: flex;
        justify-content: center;
    }

    .iconOffer  {
         font-size: 28px;
         float: right;
    }

    input:focus{
        border-color: #00fb82;
        font-weight: semibold;
        color:black;
        box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, .7) !important;   
    }

    input:hover{
        border-color: #187fe6;
        box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, .3) !important;
    }

    select:focus{
        border-color: #00fb82;
        font-weight: semibold;
        color:black;
        box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, .7) !important;   
    }

    select:hover{
        border-color: #187fe6;
        box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, .5) !important;
    }

    .validationErrors{
        background-color:#f50057;
        border-radius: 5px;
        box-shadow: 0px 2px 8px 2px rgba(255, 0, 0, .3);      
        color:white;
        display: none;
        font-weight: bold;
        margin-bottom: 14px;
        padding: 10px;
        padding-top: 12px;
    }

    @media (max-width:767px)  {
        .content{
            padding-top: 5%;
            margin-right: 3%;
            margin-left: 3%;
        }

        .iconOffer  {
            font-size: 50px;
            float: right;
        }
    }

    @media (min-width:768px)  {
        form{
            margin-top:5px;
            width: 320px;
            margin-right: 4%;
            margin-left: 4%;
            margin-bottom: 0;
        }

        .content{
            margin-top: 10% !important;
            margin-left: 3%;
            border-radius: 10px;
            display: flex;
            align-items: center;
            box-shadow: 0px 2px 8px 2px rgba(0, 0, 0, .3);
        }
    }

</style>