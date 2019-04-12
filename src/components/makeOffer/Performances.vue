<template>
     <div class="content">
        <div class="accordion" id="accordionExample">
            <div v-for="p in performances" :key="p.package_id">
                <div class="tarjetaB">
                    <div class="heads" v-bind:id="'heading'+p.package_id" data-toggle="collapse" v-bind:data-target="'#collapse'+p.package_id" aria-expanded="false" v-bind:aria-controls="'collapse'+p.package_id">
                        <h5 class="mb-0" >
                            <button class="Hbutton" >
                                <h5 class="titles">{{p.performance.info}}</h5>
                            </button>
                        </h5>
                    </div>
                    <div  v-bind:id="'collapse'+p.package_id" class="collapse" v-bind:aria-labelledby="'heading'+p.package_id" data-parent="#accordionExample">
                        <div class="bodies">
                            <div class="bodyParameters"><span style="font-weight:bold">Duration:</span> {{p.performance.hours}} h | <span style="font-weight:bold">Price:</span> {{p.performance.price}} € <br>
                            </div>
                            <div class="continueButtonDiv">
                                <div @click="selectPerformance(p.package_id, p.performance.price, p.performance.hours)" class="btn btn-primary continueButton">
                                    <span class="continueText">CONTINUE</span>
                                </div>
                            </div>
                        </div>  
                    </div>
                </div>  
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Performances",
    data (){
        return {
            performanceId: undefined
        }
    },
    props: {
        performances: {
            type: Array
        },
    },
    components: {
    },
    methods: {
        selectPerformance(perfId, perfPrice, perfDuration) {
            var a = this.$route.params['artistId']
            this.$emit('hiring' ,perfId, perfPrice, perfDuration, a);
        }
    }
}
</script>

<style scoped>
 * {
        font-family: "Archivo"
    }

.bodyParameters{
    margin-left: 20px;
    margin-bottom: 20px;
}

.heads {
    background-color:white; text-align: left; border-bottom: none; 
    padding-top: 3%; padding-bottom: 0.5%; margin-left: 15px;
    
}

.Hbutton{
    color: black; text-decoration: none; color: none; border: 0; background: transparent; outline:none;
}

.bodies{
    text-align: left;  padding-top: 1%; padding-bottom: 3%;
    margin-bottom: 1%;
    
}

.tarjeta {
    display: inline-block;
    width: 100%;
    box-shadow: 2px 2px 8px 0px rgba(0, 0, 0, .2);
    margin-bottom: 3%;

}

.tarjetaB {
    display: inline-block;
    width: 100%;
    box-shadow: 2px 2px 8px 0px rgba(0, 0, 0, .2);
    margin-bottom: 3%;
    border-radius: 10px;
    padding-right: 2%;
}

#test {
    background-color: black;
    font-weight: bold;
    
}

.accordion {
    margin: 2.5%;
    margin-left: 5%;
    margin-right: 5%;
}

h2 {
    text-align: left;
    margin-left: 5%;
    margin-top: 2.5%;
}

.card-img-top {
    border-top-left-radius: 0px;
    border-top-right-radius: 0px;
}

.artistImage {
    object-fit: cover;
    max-height: 200px;
}

.cuerpoTarjeta {
    display: flex;
    align-items: center;
    
}

.artistName {
    font-size: 32px;
    margin-bottom: 0px;
    padding-bottom: 0px;
    word-wrap: break-word;
}

.artistGenres {
    color: #187FE6;
    font-size: 18px;
    word-wrap: break-word;
}

.rightContent {
    padding-left: 20px;
    margin-left: auto;
    margin-right: 0px;
}

.price {
    font-size: 35px;
    margin-bottom: 0px;
    color: #187FE6;
}

.continueButton {
    font-size: 18px;
    padding-left: 4%;
    padding-right: 4%;
    border: none;
    border-radius: 30px;
    width: fit-content;
    margin-top: 2%;
    background-image: linear-gradient(to right, #00fb82, #187fe6);
    

}

.continueButtonDiv{
    text-align: center !important;
    display: flex !important;
    justify-content: center !important;
    align-content: center !important;
}

.continueButton:hover{
    background-image: linear-gradient(to right, #14Ca9f, #1648d0) !important;
}

.titles {
    font-weight: bold ; 
    margin-left:-2px;
    text-align: left !important;
     
}



 @media (min-width:768px)  {
    .heads {
        background-color:white; text-align: left; border-bottom: none; 
        padding-top: 2%; padding-bottom: 0.5%; margin-left: 15px;
    }

    .Hbutton{
        color: black; text-decoration: none; color: none; border: 0; background: transparent; outline:none;
    }

    .bodies{
        text-align: left; padding-top: 1%; padding-bottom: 3%;
        margin-bottom: 1%;
        
    }

    .tarjeta {
        display: inline-block;
        width: 100%;
        box-shadow: 2px 2px 8px 0px rgba(0, 0, 0, .2);
        margin-bottom: 3% 
    }

    .tarjetaB {
        display: inline-block;
        width: 100%;
        box-shadow: 2px 2px 8px 0px rgba(0, 0, 0, .2);
        margin-bottom: 3%;
        border-radius: 10px;
        padding-right: 2%;
        margin-right: 10%;
    }

    #test {
        background-color: black;
        font-weight: bold;
        
    }

    .accordion {
        width: 320px;
        margin-top: 1.5%;
        margin-bottom: 2.5%;
        align-items: center;
    }

    h2 {
        text-align: left;
        margin-top: 1.5%
    }

    .card-img-top {
        border-top-left-radius: 0px;
        border-top-right-radius: 0px;
    }

    .artistImage {
        object-fit: cover;
        max-height: 200px;
    }

    .cuerpoTarjeta {
        display: flex;
        align-items: center;
    }

    .artistName {
        font-size: 32px;
        margin-bottom: 0px;
        padding-bottom: 0px;
        word-wrap: break-word;
    }

    .artistGenres {
        color: #187FE6;
        font-size: 18px;
        word-wrap: break-word;
    }

    .rightContent {
        padding-left: 20px;
        margin-left: auto;
        margin-right: 0px;
    }

    .price {
        font-size: 35px;
        margin-bottom: 0px;
        color: #187FE6;
    }

    .continueButton {
        font-size: 18px;
        padding-left: 4%;
        padding-right: 4%;
        border: none;
        border-radius: 30px;
        width: fit-content;
        margin-top: 2%;
        background-image: linear-gradient(to right, #00fb82, #187fe6);
    }

    .continueButton:hover{
        background-image: linear-gradient(to right, #14Ca9f, #1648d0) !important;
    }

    .SentOfferNotif {
        height: 305px;
    }

 }

</style>
