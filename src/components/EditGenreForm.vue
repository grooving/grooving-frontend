<template>
    <div class="content">
        <form v-on:submit="updateGenre">
            <div class="form-row">
                <div class="form-group col-12">
                    <span style="font-weight:bold;font-size:30px;">{{gtrans.translate('genres_editGenre')}} </span>
                    <router-link v-if="oldParentId != '1'" v-bind:to="'/manageGenres/'+oldParentId" style="height: 28px; width: 28px">
                        <i class="material-icons iconOffer">clear</i>
                    </router-link>
                    <router-link v-else v-bind:to="'/manageGenres/all'" style="height: 28px; width: 28px">
                        <i class="material-icons iconOffer">clear</i>
                    </router-link>
                    <h6 v-if="parentName != ''" class="card-subtitle mb-2 text-muted">{{gtrans.translate('genres_subbelongs')}} <strong>{{parentName}}.</strong></h6>
                    <h6 v-else class="card-subtitle mb-2 text-muted">{{gtrans.translate('genres_belongs')}} <strong>{{gtrans.translate('genres_mainCategory')}}</strong></h6>
                    <div id="errorsDiv" class="validationErrors vertical-center">
                        <p style="margin: 0px;">{{errors}}</p>
                    </div>
                    <div style="width:100%;margin-top:25px;">
                        <div v-if="canChangeParent == 1">
                            <p class="card-text" style="font-weight:bold;display:inline-block;">{{gtrans.translate('genres_parent')}}</p>
                            <div class="input-group">
                                <select v-model="parentId" class="form-control">
                                    <option :value="1">---------</option>
                                    <option v-for="opt in tree" :key="opt.id" :value="opt.id">
                                        <span>{{opt.name}}</span>
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div v-else>
                            <p class="card-text" style="font-weight:bold;display:inline-block;">{{gtrans.translate('genres_cannotChange')}}</p>
                        </div>
                    </div>
                    <div style="width:100%;margin-top:25px;">
                        <p class="card-text" style="font-weight:bold;display:inline-block;">{{gtrans.translate('genres_name')}} </p><small><i>   ES</i></small>
                        <div class="input-group">
                            <input v-model="genreNameES" type="text" class="form-control">
                            <div class="input-group-append">
                                <span class="input-group-text">ES</span>
                            </div>
                        </div>
                    </div>
                    <div style="width:100%;margin-top:25px;">
                        <p class="card-text" style="font-weight:bold;display:inline-block;">{{gtrans.translate('genres_name')}}</p><small><i>   EN</i></small>
                        <div class="input-group">
                            <input v-model="genreNameEN" type="text" class="form-control">
                            <div class="input-group-append">
                                <span class="input-group-text">EN</span>
                            </div>
                        </div>
                    </div>
                    <div class="continueButtonDiv">
                        <b-button class="continueButton" variant="primary" size="sm" type="submit">{{gtrans.translate('genres_save')}}</b-button>
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
import GTrans from "@/utils/GTrans.js";

export default {
    name: "EditGenreForm",

    data: function() {
        return {
            genresList: undefined,
            errors: "",
            gsecurity: undefined,
            tree: Array(),
            genreNameES: "",
            genreNameEN: "",
            canChangeParent: undefined,
            oldParentId: undefined,
            gtrans: undefined,
        }
    },


    props: {
        genreName: {},
        parentName: {},
        genreId: {},
        parentId: {},
    },

    methods: {
        updateGenre() {
            NProgress.start();
            GAxios.put(endpoints.createGenre + this.genreId+'/', {
                "name_es": this.genreNameES,
                "name_en": this.genreNameEN,
                "id":this.genreId,
                "parentGender":this.parentId
            }).then(response => {
                console.log(response);
                if(this.parentId==1){
                    this.$router.push('manageGenres/all');
                }
                else{
                    this.$router.push('manageGenres/'+this.parentId);
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

    created() {
        this.gsecurity = GSecurity;
        this.gsecurity.obtainSavedCredentials();

        this.gtrans = new GTrans(this.gsecurity.getLanguage());

        this.oldParentId = this.parentId;
    },

    beforeMount: function() {
        if (!this.gsecurity.isAuthenticated()) {
            this.$router.push({name: "error"});
        } 
        else {
            this.gsecurity = GSecurity
            var GAxiosToken = this.gsecurity.getToken();
            var authorizedGAxios = GAxios;
            authorizedGAxios.defaults.headers.common['Authorization'] = 'Token '+GAxiosToken;
        }

        GAxios.get(endpoints.createGenre+'admin/'+this.genreId+'/').then(response =>{
            this.genreNameES = response.data.name_es;
            this.genreNameEN = response.data.name_en;
            var children = response.data.children;
            //console.log(children);
            //alert(children.length);

            if(children.length == 0){
                this.canChangeParent = 1;
            }
            else{
                this.canChangeParent = 0;
            }
        }).catch(ex => {
            console.log(ex);
        });

        GAxios.get(endpoints.genres+'?tree=true').then(response =>{
            //console.log(response);
            this.genresList = response.data;
            var genreRoot = response.data;
            var childrenRoot = response.data.children;

            this.tree = Array();

            for(var i=0; i<childrenRoot.length; i++){
                var genre = childrenRoot[i];
                //console.log(genre);
                //console.log(this.genreId);
                if(genre.id != this.genreId){
                    this.tree.push(genre);

                }
            }
            console.log(this.tree);


        }).catch(ex => {
            console.log(ex);
        })
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

</style>