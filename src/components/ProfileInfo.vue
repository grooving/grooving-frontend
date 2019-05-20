<template>
    <div class="content">
        <form>
            <div class="form-row">
                <div class="form-group col-12">
                    <span class="card-title" style="font-weight:bold;font-size:30px;margin-bottom:12px">{{gtrans.translate('profile_title')}} </span>
                    <router-link v-bind:to="{name: 'editPersonalInfo', params: {}}" style="height: 28px; width: 28px; margin-bottom:12px;">
                        <i class="material-icons iconOffer">create</i>
                    </router-link>
                    <h6 class="card-subtitle mb-2 text-muted">{{gtrans.translate('profile_subtitle')}}</h6>
                    <div style="width:100%;margin-top:25px;overflow:auto;justify-content:center">
                        <p class="card-text" style="font-weight:bold;display:inline-block;margin-bottom:0px;margin-top:10px">{{gtrans.translate('user_photo')}}</p>
                        <img v-if="photo == null || photo == '' || photo == 'null'" src="@/assets/defaultPhoto.png" class="profileImage" v-bind:alt="this.gtrans.translate('image_alt')" style="float:right">
                        <img v-else v-bind:src="photo" :key="photo" class="profileImage" v-bind:alt="this.gtrans.translate('image_alt')" style="float:right">
                    </div>
                    <hr style="margin-top:5px;margin-bottom:0px;"/>
                    <div style="width:100%;margin-top:25px;overflow:auto;">
                        <p class="card-text" style="font-weight:bold;display:inline-block;">{{gtrans.translate('user_firstName')}}</p>
                        <p class="card-text" style="float:right;">{{name}}</p>
                    </div>
                    <hr style="margin-top:0px;margin-bottom:0px;"/>
                    <div style="width:100%;margin-top:25px;overflow:auto;">
                        <p class="card-text" style="font-weight:bold;display:inline-block;">{{gtrans.translate('user_lastName')}}</p>
                        <p class="card-text" style="float:right;">{{surnames}}</p>
                    </div>
                    <hr v-if="this.gsecurity.hasRole('ARTIST')" style="margin-top:0px;margin-bottom:0px;"/>
                    <div v-if="this.gsecurity.hasRole('ARTIST')" style="width:100%;margin-top:16px;overflow:auto;">
                        <p class="card-text" style="font-weight:bold;display:inline-block;">{{gtrans.translate('user_artisticName')}}</p>
                        <p class="card-text" style="float:right;">{{artisticName}}</p>
                    </div>
                    <hr styl
                    <hr style="margin-top:0px;margin-bottom:0px;"/>
                    <div style="width:100%;margin-top:16px;overflow:auto;">
                        <p class="card-text" style="font-weight:bold;display:inline-block;">{{gtrans.translate('user_username')}}</p>
                        <p class="card-text" style="float:right;">{{username}}</p>
                    </div>
                    <hr style="margin-top:0px;margin-bottom:0px;"/>
                    <div style="width:100%;margin-top:16px;overflow:auto;">
                        <p class="card-text" style="font-weight:bold;display:inline-block;">{{gtrans.translate('user_password')}}</p>
                        <p class="card-text" style="float:right;">&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;</p>
                    </div>
                    <hr style="margin-top:0px;margin-bottom:0px;"/>
                    <div style="width:100%;margin-top:16px;overflow:auto;">
                        <p class="card-text" style="font-weight:bold;display:inline-block;">{{gtrans.translate('user_email')}}</p>
                        <p class="card-text" style="float:right;">{{email}}</p>
                    </div>
                    <hr v-if="this.gsecurity.hasRole('ARTIST')" style="margin-top:0px;margin-bottom:0px;"/>
                    <div v-if="this.gsecurity.hasRole('ARTIST')" style="width:100%;margin-top:16px;overflow:auto;">
                        <p class="card-text" style="font-weight:bold;display:inline-block;">{{gtrans.translate('paypal')}}</p>
                        <p class="card-text" style="float:right;">{{paypal}}</p>
                    </div>
                    <hr style="margin-top:0px;margin-bottom:0px;"/>
                    <div style="width:100%;margin-top:16px;overflow:auto;">
                        <p class="card-text" style="font-weight:bold;display:inline-block;">{{gtrans.translate('user_phone')}}</p>
                        <p class="card-text" style="float:right;">{{phoneNumber}}</p>
                    </div>
                </div>  
            </div>
        </form>
    </div>
</template>

<script>
import GSecurity from "@/security/GSecurity.js";
import GTrans from "@/utils/GTrans.js"

export default {
    name: "profileInfo",
    data: function(){
        return{
        gsecurity: GSecurity,
        gtrans: undefined,
        }
    },
    props: {
        name: {
            type: String,
            //default: 'John'
        },
        surnames: {
            type: String,
            //default: 'Pug Retriever'
        },
        email: {
            type: String,
            //default: 'johnpug@pugsftw.com'
        },
        phoneNumber: {
            type: String,
            //default: '633017787'
        },
        username: {
            type: String,
            default: 'josembell'
        },
        paypal: {
            type: String,
        },
        artisticName: {
            type: String,
            //default: 'Charli XCX'
        },
        photo: {
            type: String,
        },
    },

    created() {
        this.gsecurity = GSecurity;
        this.gsecurity.obtainSavedCredentials();

        this.gtrans = new GTrans(this.gsecurity.getLanguage());
        
        // Podemos cambiar el lenguaje así para debug...
        //this.gtrans.setLanguage('es')
        //this.gtrans.setLanguage('en')
    },
}
</script>

<style scoped>

    a.router-link-active {
        color: #187fe6 !important;
    }

    .content {
        padding: 10px;
    }

    .form-group.col-12 {
        margin-bottom: 0px;
    }

    .iconOffer  {
         font-size: 28px;
         float: right;
    }

    .profileImage {
        width: 45px;
        height: 45px;
        object-fit: cover;
        border-radius: 25px;
    }

    @media (max-width:767px)  {
        .content{
            padding-top: 5%;
            margin-right: 3%;
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
            border-radius: 10px;
            display: flex;
            align-items: center;
            box-shadow: 0px 2px 8px 2px rgba(0, 0, 0, .3);
        }
    }

</style>