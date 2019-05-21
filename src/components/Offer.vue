<template>
    <div class="everything">
        <div v-if="errors" class="validationErrors vertical-center">
        <p>{{errors}}</p>
    </div>
        <div class="card tarjeta">
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
            <div class="container-fluid">
                <div class="container">
                    <div class="right-div right-text" style="width: 100px; text-align: left; vertical-align: top;">
                        <div class="priceCard"><h1>{{price}}€</h1><br>
                        </div>
                        <div  style="padding-top: 20px;">
                        <div class="cardTextDate"><i class="material-icons iconOffer">event_note</i><p><span style="margin-left: 5px;margin-bottom: 1px;">{{date}}</span></p>
                        </div>
                        <br>
                        <div class="cardTextLocation"><i class="material-icons iconOffer">location_on</i><p style="margin-left: 5px;">  {{place}}</p>
                        </div>
                        <br>
                        <div class="cardTextId"><i class="material-icons iconOffer ">error_outline</i><p style="margin-left: 5px; word-break: break-all">ID:{{offerID}}</p>
                        </div>
                        <br>
                        <button v-if="offerStatus == 'CONTRACT_MADE' || offerStatus == 'PAYMENT_MADE'" @click="openChat()" class="btn btn-primary continueButton"><span class="continueText">{{gtrans.translate('chat')}}</span></button>
                                                   
                        </div>
                    </div>
                    <div class="right-div right-text">
                        <router-link v-bind:to="{name: imageURI, params: {userName, customerSurnames, place, artistId: artistId }}">
                            <img v-if="userIcon == null || userIcon == '' || userIcon == 'null'" src="@/assets/defaultPhoto.png" class="card-img-top foto" alt="Image">
                            <img v-else v-bind:src="userIcon" :key="userIcon" class="card-img-top foto" alt="Image">
                        </router-link>
                        <h3 class="fotoText">{{userName}}</h3>
                    </div>
                    <hr class="mb-2"/>
                    <div v-if="offerStatus !== 'PENDING' && offerStatus !== 'CONTRACT_MADE'" class="cardTextId">
                        <i class="material-icons iconOffer">bookmark</i><p>{{statusMessage()}}</p>
                    </div>
                    <div v-if="offerStatus == 'PAYMENT_MADE' && gsecurity.hasRole('CUSTOMER') && ratingD !== null" class="cardTextId">
                        <div class="rating">
                            <span class="ratingOK" v-if="ratingD >= 1">★</span>
                            <span v-else>☆</span>
                            
                            <span class="ratingOK" v-if="ratingD >= 2">★</span>
                            <span v-else>☆</span>
                            
                            <span class="ratingOK" v-if="ratingD >= 3">★</span>
                            <span v-else>☆</span>
                            
                            <span class="ratingOK" v-if="ratingD >= 4">★</span>
                            <span v-else>☆</span>
                            
                            <span class="ratingOK" v-if="ratingD >= 5">★</span>
                            <span v-else>☆</span>
                        </div>
                    </div>
                    <div v-if="offerStatus == 'PAYMENT_MADE' && gsecurity.hasRole('CUSTOMER') && ratingD == null && artistId != null" class="cardTextId">
                        <p style="word-break: break-all">{{gtrans.translate('offer_rateNow')}}:&nbsp;</p>
                            <div class="rating">

                                <span class="ratingOK" v-if="ratingD !== null && ratingD>= 1">★</span>
                                <span v-else class="toRate" @click="rateDone(1)">☆</span>
                                
                                <span class="ratingOK" v-if="ratingD !== null && ratingD >= 2">★</span>
                                <span v-else class="toRate" @click="rateDone(2)">☆</span>
                                
                                <span class="ratingOK" v-if="ratingD !== null && ratingD >= 3">★</span>
                                <span v-else class="toRate" @click="rateDone(3)">☆</span>
                                
                                <span class="ratingOK" v-if="ratingD !== null && ratingD >= 4">★</span>
                                <span v-else class="toRate" @click="rateDone(4)">☆</span>
                                
                                <span class="ratingOK" v-if="ratingD !== null && ratingD >= 5">★</span>
                                <span v-else class="toRate" @click="rateDone(5)">☆</span>
                            </div>        
                    </div>
                    <div v-if="reason !== '' && reason != null && (offerStatus == 'WITHDRAWN' || offerStatus == 'REJECTED' || offerStatus == 'CANCELLED_ARTIST' || offerStatus == 'CANCELLED_CUSTOMER')" class="cardTextId">
                       <p><span style="font-weight: bold;">&nbsp;{{gtrans.translate('offer_reason')}}: </span> {{reason}}</p>
                    </div>
                </div>
                <div class="collapse" v-bind:id="noHashtag()">
                    <div class="form-group">
                        <label for="rejectionReason">{{gtrans.translate('offer_confirmRejection')}}:</label>
                        <textarea v-model="reason" style="resize: none;" maxlength="500" class="form-control" id="rejectionReason" rows="4" v-bind:placeholder="gtrans.translate('offer_rejectPlaceholder')"></textarea>
                    </div>
                    <div class="row container">
                        <div class="right-div right-text2"><a v-bind:href="hashtag()" v-on:click="enableOfferButtons()" class="btn btn-primary cancelButton" 
                            data-toggle="collapse" role="button" aria-expanded="false" aria-controls="collapseExample"><span class="continueText">{{gtrans.translate('offer_cancel')}}</span></a></div>
                        <div v-if="offerStatus === 'PENDING' && gsecurity.hasRole('ARTIST')" class="right-div right-text2">
                            <button class="btnn2 btn-primary confirmButton" v-on:click="rejectOffer"><span class="continueText">{{gtrans.translate('offer_confirm')}}</span></button></div>
                        <div v-if="offerStatus === 'PENDING' && gsecurity.hasRole('CUSTOMER')" class="right-div right-text2">
                            <button class="btnn2 btn-primary confirmButton" v-on:click="withdrawnOffer"><span class="continueText">{{gtrans.translate('offer_confirm')}}</span></button></div>
                        <div v-if="offerStatus === 'CONTRACT_MADE'" class="right-div right-text2">
                            <button class="btnn2 btn-primary confirmButton" v-on:click="cancelOffer"><span class="continueText">{{gtrans.translate('offer_confirm')}}</span></button></div>
                    </div>
                </div>
                <div v-if="offerStatus === 'PENDING'" class="row container" v-bind:id="buttonsId()">
                    <div class="right-div right-text2"><a v-bind:href="hashtag()" v-on:click="disableOfferButtons()" class="btn btn-primary rejectButton" 
                        data-toggle="collapse" role="button" aria-expanded="false" aria-controls="collapseExample"><span class="continueText">{{gtrans.translate('offer_reject')}}</span></a></div>
                    <div v-if="offerStatus === 'PENDING' && gsecurity.hasRole('ARTIST')" class="right-div right-text2">
                        <router-link v-bind:to="confirmURI" class="btn btn-primary confirmButton"><span class="continueText">{{gtrans.translate('offer_details')}}</span></router-link></div>
                </div>
                <div v-if="offerStatus === 'CONTRACT_MADE'" class="row container" v-bind:id="buttonsId()">
                    <div class="right-div right-text2"><a v-bind:href="hashtag()" v-on:click="disableOfferButtons()" class="btn btn-primary rejectButton" 
                        data-toggle="collapse" role="button" aria-expanded="false" aria-controls="collapseExample"><span class="continueText">{{gtrans.translate('offer_decline')}}</span></a></div>
                    <div v-if="offerStatus === 'CONTRACT_MADE'" class="right-div right-text2">
                        <router-link v-bind:to="confirmURI" class="btn btn-primary confirmButton"><span class="continueText">{{gtrans.translate('offer_details')}}</span></router-link></div>
                </div>
                <div v-if="offerStatus !== 'CONTRACT_MADE' && offerStatus !== 'PENDING'" class="row container" v-bind:id="buttonsId()">
                    <div class="right-div right-text2" style="margin: 0 auto;">
                        <router-link v-bind:to="confirmURI" class="btn btn-primary confirmButton"><span class="continueText">{{gtrans.translate('offer_details')}}</span></router-link></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import GAxios from '../utils/GAxios.js'
    import GSecurity from '@/security/GSecurity.js';
    import endpoints from '@/utils/endpoints.js';
    import GTrans from "@/utils/GTrans.js"

    export default {
        
        name: 'Offer',

        data: function() {
            return {
                gsecurity: GSecurity,
                gaxios: GAxios,
                negotiationMessage: 'The offer is in a negotiation process.',
                withdrawnMessage: 'The offer was withdrawn by the customer before it was accepted.',
                rejectedMessage: 'The offer was rejected by the artist.',
                cancelledArtistMessage: 'The offer was canceled by the artist after being accepted.',
                cancelledCustomerMessage: 'The offer was canceled by the customer after being accepted.',
                paymentMessage: 'The payment has already been made.',
                ratingD: null,
                gtrans: undefined,
                chat: undefined,
                chatActive: undefined,
                errors: undefined,
            }

        },
        
        props: {
            offerID: {
                type: Number,
                default: 3
            },
            date: {
                type: String,
                default: 'March 19, 2019',
            },
            price: {
                type: String,
                default: '61.00'
            },
            place: {
                type: String,
                default: 'Pontevedra',
            },
            confirmURI: {
                type: String,
                default: '#'
            },
            userIcon: {
                type: String,
                default: '#'
            },
            userName: {
                type: String,
                default: '#'
            },
            offerStatus: {
                type: String,
                default: 'pending',
            },
            imageURI: {
                type: String,
                default: '',
            },
            customerSurnames:{
                type: String,
                default: '',
            },
            artistId: {
                type: String,
                default: '',
            },
            reason: {
                type: String,
                default: '',
            },
            rating: {
                type: Number,
                default: null,
            }
        },
        beforeMount () {
            this.ratingD = this.rating;
            this.negotiationMessage = this.gtrans.translate('negotiationMessage');
            this.withdrawnMessage = this.gtrans.translate('withdrawnMessage');
            this.rejectedMessage = this.gtrans.translate('rejectedMessage');
            this.cancelledArtistMessage = this.gtrans.translate('cancelledArtistMessage');
            this.cancelledCustomerMessage = this.gtrans.translate('cancelledCustomerMessage');
            this.paymentMessage = this.gtrans.translate('paymentMessage');
            this.chat = this.gsecurity.hasRole('CUSTOMER') ? this.gtrans.translate('contactArtist') : this.gtrans.translate('contactCustomer');
            this.chatActive = this.offerStatus === 'CONTRACT_MADE' ? true : false;
        },
        created() {
            this.gsecurity = GSecurity;
            this.gsecurity.obtainSavedCredentials();
            this.gtrans = new GTrans(this.gsecurity.getLanguage());
        
            // Podemos cambiar el lenguaje así para debug...
            //this.gtrans.setLanguage('es')
            //this.gtrans.setLanguage('en')
        },
        methods: {
            hashtag() {
                return "#offer" + this.offerID;
            },
            noHashtag() {
                return "offer" + this.offerID;
            },
            buttonsId() {
                return "offerButtons" + this.offerID;
            },
            disableOfferButtons() {
                document.getElementById(this.buttonsId()).style.display='none';
                return false;
            },
            enableOfferButtons() {
                document.getElementById(this.buttonsId()).style.display='inline-block';
                return false;
            },
            rateDone(n) {
                this.ratingD = n;

                var authorizedGAxios = GAxios;
                var GAxiosToken = this.gsecurity.getToken();
                authorizedGAxios.defaults.headers.common['Authorization'] = 'Token ' + GAxiosToken;

                if (this.ratingD != null) {
                    NProgress.start();
                    authorizedGAxios.post(endpoints.rating + this.offerID + '/', {
                        "score": this.ratingD,
                        "comment": "",
                    }).then(response => {
                        this.$emit("offerRated", this.offerID,this.ratingD);
                        console.log(response);
                    }).catch(ex => {
                        console.log(ex);
                        this.errors = ex.response.data.error;
                    }).then(() => {
                        NProgress.done()
                    });
                }
            },
            rejectOffer() {
                var authorizedGAxios = GAxios;
                var GAxiosToken = this.gsecurity.getToken();
                authorizedGAxios.defaults.headers.common['Authorization'] = 'Token ' + GAxiosToken;

                if (this.reason != '') {
                    NProgress.start();
                    authorizedGAxios.put(endpoints.offer + this.offerID + '/', {
                        "status": "REJECTED",
                        "reason": this.reason,
                    }).then(response => {
                        console.log(response);
                        window.location.reload();
                    }).catch(ex => {
                        console.log(ex);
                        this.errors = ex.response.data.error;
                    }).then(() => {
                        NProgress.done()
                    });
                } else {
                    NProgress.start();
                    authorizedGAxios.put(endpoints.offer + this.offerID + '/', {
                        "status": "REJECTED",
                    }).then(response => {
                        console.log(response);
                        window.location.reload();
                    }).catch(ex => {
                        console.log(ex);
                        this.errors = ex.response.data.error;
                    }).then(() => {
                        NProgress.done()
                    });
                }
            },
            openChat() {
                var payload = Array(); 
                payload [0]= this.offerID;
                payload [1]= this.chatActive;

                this.$emit('openChat', payload);
            },
            cancelOffer() {
                var authorizedGAxios = GAxios;
                var GAxiosToken = this.gsecurity.getToken();
                authorizedGAxios.defaults.headers.common['Authorization'] = 'Token ' + GAxiosToken;

                var status = 'CANCELLED_ARTIST';
                if (this.gsecurity.hasRole('CUSTOMER')) {
                    status = 'CANCELLED_CUSTOMER';
                }

                if (this.reason != '') {
                    NProgress.start();
                    authorizedGAxios.put(endpoints.offer + this.offerID + '/', {
                        "status": status,
                        "reason": this.reason,
                    }).then(response => {
                        console.log(response);
                        window.location.reload();
                    }).catch(ex => {
                        console.log(ex);
                        this.errors = ex.response.data.error;
                    }).then(() => {
                        NProgress.done()
                    });
                } else {
                    NProgress.start();
                    authorizedGAxios.put(endpoints.offer + this.offerID + '/', {
                        "status": status,
                    }).then(response => {
                        console.log(response);
                        window.location.reload();
                    }).catch(ex => {
                        console.log(ex);
                        this.errors = ex.response.data.error;
                    }).then(() => {
                        NProgress.done()
                    });
                }
            },
            withdrawnOffer() {
                var authorizedGAxios = GAxios;
                var GAxiosToken = this.gsecurity.getToken();
                authorizedGAxios.defaults.headers.common['Authorization'] = 'Token ' + GAxiosToken;

                if (this.reason != '') {
                    NProgress.start();
                    authorizedGAxios.put(endpoints.offer + this.offerID + '/', {
                        "status": "WITHDRAWN",
                        "reason": this.reason,
                    }).then(response => {
                        console.log(response);
                        window.location.reload();
                    }).catch(ex => {
                        console.log(ex);
                        this.errors = ex.response.data.error;
                    }).then(() => {
                        NProgress.done()
                    });
                } else {
                    NProgress.start();
                    authorizedGAxios.put(endpoints.offer + this.offerID + '/', {
                        "status": "WITHDRAWN",
                    }).then(response => {
                        console.log(response);
                        window.location.reload();
                    }).catch(ex => {
                        console.log(ex);
                        this.errors = ex.response.data.error;
                    }).then(() => {
                        NProgress.done()
                    });
                }
            },
            statusMessage() {
                if (this.offerStatus == "NEGOTIATION") {
                    return this.gtrans.translate('offer_negotiationMessage');
                } else if (this.offerStatus == "WITHDRAWN") {
                    return this.gtrans.translate('offer_withdrawnMessage');
                } else if (this.offerStatus == "REJECTED") {
                    return this.gtrans.translate('offer_rejectedMessage');
                } else if (this.offerStatus == "CANCELLED_ARTIST") {
                    return this.gtrans.translate('offer_cancelledArtistMessage');
                } else if (this.offerStatus == "CANCELLED_CUSTOMER") {
                    return this.gtrans.translate('offer_cancelledCustomerMessage');
                } else if (this.offerStatus == "PAYMENT_MADE") {
                    return this.gtrans.translate('offer_paymentMessage');
                }
            }
        },

        created: function(){
            this.gsecurity = GSecurity;
            this.gsecurity.obtainSavedCredentials();

            this.gtrans = new GTrans(this.gsecurity.getLanguage());
            
            // Podemos cambiar el lenguaje así para debug...
            //this.gtrans.setLanguage('es')
            //this.gtrans.setLanguage('en')
        }
    }   

</script>

<style>

    .form-group {
        text-align: left;
    }

</style>


<style scoped>
    * {
        font-family: "Archivo"
    }

    .continueButton {
        font-size: 18px;
        padding-left: 5%;
        padding-right: 5%;
        border: none;
        border-radius: 30px;
        width: fit-content;
        margin-top: 2%;
        font-weight: bold;
        background-image: linear-gradient(#ffc107, #ff9800);
        
    }

    .btnn {
        text-align: center;
        vertical-align: middle;
        user-select: none;
        padding: .750rem .605rem;
        line-height: 1.5;
        transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
    }

    .btnn2 {
        text-align: center;
        vertical-align: middle;
        user-select: none;
        padding: .450rem .420rem;
        line-height: 1.5;
        transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
    }

    .validationErrors{
        background-color:#f50057;
        box-shadow: 0px 2px 8px 2px rgba(255, 0, 0, .3);
        color:white;
        font-weight: bold;
        height: 100%;
        padding-top: 12px;
    }

    .chat {
        cursor: pointer;
        margin-top: 3px; 
    }

    .material-icons:hover {
        background: -webkit-linear-gradient(left, #000000, #000000);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    .iconOffer{
        color:black !important;
    }

    .priceCard{
        background-image: linear-gradient(#ffc107, #ff9800);
        text-align: center;
        border-radius: 10px;
        color: white;
        font-weight: bolder;
        font-family: "Archivo";
        display: table;
        width: 100%;
        padding: 5px;
        vertical-align: middle !important;
        box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, .3);
    }

    .titleCard{
        text-align: left;
        color: black;
        font-weight: semibold;
        font-family: "Archivo";
        display: table;
        width: 100%;
        padding: 5px;
        vertical-align: middle !important;
    }

    .titleCard h3{
        margin-bottom: 0px;
        height: 100%;
        vertical-align: middle;
        display: table-cell;
        vertical-align: middle;
        font-weight: bold;

        font-size: 1vh;
        
    }

    .priceCard h1{
        margin-bottom: 0px;
        height: 100%;
        vertical-align: middle;
        display: table-cell;
        vertical-align: middle;
        font-weight: bold;
        font-size: 20px;
    }

    .rating span{
        font-size: 30px;
    }
    
    .rating{
        margin-bottom: 10px;
        margin-top: -15px;
        
    }

    .ratingOK{
        background: -webkit-linear-gradient(#00fb82, #187fe6);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    .rigth-text {
        margin-left: 5px;
    }

    .toRate:hover {
        background-color: -webkit-linear-gradient(#00fb82, #187fe6);
        background: -webkit-linear-gradient(#00fb82, #187fe6);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    .cardTextDate{
        display: inline-flex;
        vertical-align: middle;
    }

    .cardTextLocation{
        display: inline-flex;
        vertical-align: middle;
    }

    .cardTextId{
        display: inline-flex;
        vertical-align: middle;
        word-break: break-word;
    }

    .continueText {
        word-break: keep-all;
        padding: 0 !important;
    }

    .row .container{
        margin: 0px !important;
    }

    .container{
        width: 100% !important;
        padding: 0px !important;
    }

    .foto{
        object-fit: cover;
        border-radius: 100px;
        box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, .3);
        height: 8rem;
        width: 8rem;
    }

    .fotoText{
        margin-top: 10%;
        font-weight: semibold;
    }

    .offerInfo {
        width: 100px !important;
        text-align: left !important;
        vertical-align: top !important;
    }

    .right-div{
        display: inline-block;
        text-align: center;
        width: 50% !important;
        padding: 20px !important;
    }

    .right-div .right-text{
        width: 200px;
    }

    label {
        font-weight: bold;
    }

    .card-title{
        font-size: 1.25rem;
        
    }

    .card-title h2{
        font-weight: bold !important;
    }

    .tarjeta {
        width: 100%;
        box-shadow: 2px 2px 8px 0px rgba(0, 0, 0, .2);
    }
    .confirmButton, .rejectButton, .cancelButton {
        font-size: 21px;
        font-weight:bold;
        width: 100%;
        border: none;
        border-radius: 30px;
    }

    .confirmButton {
        background-image: linear-gradient(to right, #00fb82, #187fe6);
    }

    .rejectButton {        
        background-image: linear-gradient(to right, #FB8600, #FF0000);
    }

    .cancelButton {
        background-image: linear-gradient(to right, #a2a2a2, #474747);
    }

    .confirmButton:hover {
        background-image: linear-gradient(to right, #14Ca9f, #1648d0) !important;
        box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, .7) !important;
    }

    .rejectButton:hover {
        background-image: linear-gradient(to right, #ED7F00, #A20101) !important;
        box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, .7) !important;

    }

    @media (min-width:600px)  {
        .cancelButton:hover {
            background-image: linear-gradient(to right, #515151, #232323) !important;
        }

        .everything {
            margin: 0 auto;
        }

    }

    @media (min-width:768px)  {

        .tarjeta {
            min-width: 335px;
            box-shadow: 2px 2px 8px 0px rgba(0, 0, 0, .2);
        }

        .continueButton{
            
            margin-right: 25%;
            margin-left: 25%;
        }

        .priceCard h1{
        margin-bottom: 0px;
        height: 100%;
        vertical-align: middle;
        display: table-cell;
        vertical-align: middle;
        font-weight: bold;
    }
    .titleCard h3{
        margin-bottom: 0px;
        height: 100%;
        vertical-align: middle;
        display: table-cell;
        vertical-align: middle;
        font-weight: semibold;
        
        
        
    }

    

   
      
    }

</style>
