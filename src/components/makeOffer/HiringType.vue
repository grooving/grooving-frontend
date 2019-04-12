<template>
  <div class="SentOfferNotif">
      <h2 class="titleType">Type of Hiring</h2>

     <div class="accordion" id="accordionExample">
  <div v-if="farePrice != null && farePrice != ''" class="tarjetaB">
    <div class="heads" id="headingOne" data-toggle="collapse" 
            data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
      <h5 class="mb-0">
        <button class="Hbutton">
          <h5 class="titles">Fare</h5>
        </button>
      </h5>
    </div>

    <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
    <b-dropdown-divider/>
      <div class="bodies">{{fareDescription}} <p class="price2"><strong>Price: </strong> {{farePrice}}€/h</p>
           <div class="continueButtonDiv"><div @click="selectType('FARE')"
            class="btn btn-primary continueButton"><span class="continueText">CONTINUE</span></div></div>
      </div>  
    </div>
  </div>
  <div class="tarjetaB">
    <div class="heads" id="headingTwo" data-toggle="collapse" 
            data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
      <h5 class="mb-0">
        <button class="Hbutton">
          <h5 class="titles">Performance</h5>
        </button>
      </h5>
    </div>
    <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
    <b-dropdown-divider/>
      <div class="bodies">{{performanceDescription}} 
           <div class="continueButtonDiv">
               <div @click="selectType('PERFORMANCE')" class="btn btn-primary continueButton">
                   <span class="continueText">CONTINUE</span>
                </div>
            </div>
      </div>
    </div>
  </div>
  <div v-if="customMinPrice != null && customMinPrice != ''" class="tarjetaB">
    <div class="heads" id="headingThree"  data-toggle="collapse" 
            data-target="#collapseThree" aria-expanded="true" aria-controls="collapseOne">
      <h5 class="mb-0">
        <button class="Hbutton" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
          <h5 class="titles">Custom</h5>
        </button>
      </h5>
    </div>
    <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
    <b-dropdown-divider/>
      <div class="bodies">{{customDescription}} <p class="price2"><strong>Minimum Price: </strong> {{customMinPrice}}€/h</p>
           <div class="continueButtonDiv">
               <div @click="selectType('CUSTOM')" class="btn btn-primary continueButton">
                   <span class="continueText">CONTINUE</span>
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
  name: 'HiringType',
  data(){
      return {
          artistURI: undefined,
      }
  },
  props: {
        performanceDescription: {
            type: String,
            default: "In this type con contract to can choose between different shows defined by the artist."
        },
        fareDescription: {
            type: String,
            default: "In this type of contract you set the duration of the event.",
        },
        farePrice: {
            type: String,
            default: "",
        },
        customDescription: {
            type: String,
            default: "In this type of contract you decide the amount of money to pay."
        },
        customMinPrice: {
            type: String,
            default: "",
        },
        artistImage: {
            type: String,
            default: 'https://img.europapress.es/fotoweb/fotonoticia_20181107115306_1920.jpg',
        },
        artistName: {
            type: String,
            default: 'ROSALÍA'
        },
        artistGenres: {
            type: Array,
            default: () => ['Pop', 'Flamenco']
        },
        continueURI: {
            type: String,
            default: '/dateSelection/'
        },
        price: {
          type: String,
          default: '$63.00/h'
        },
    }, methods: {
        genresToString() {
            var res = "";
            var i = 0;
            for (i = 0; i < this.artistGenres.length; i++) { 
                if (i != this.artistGenres.length - 1) {
                    res += this.artistGenres[i] + ", ";
                } else {
                    res += this.artistGenres[i];
                }
            }
            return res;
        },
        selectType(type) {
            var a = this.$route.params['artistId']
            this.$emit('hiring' ,type, a);
        }
    },
    mounted(){
        this.artistURI = '/dateSelection/' + this.$route.params['artistId']
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
        font-family: "Archivo"
    }
.heads {
    background-color:white; text-align: left; border-bottom: none; 
    padding-top: 3%; padding-bottom: 0.5%;
    
}
.Hbutton{
    color: black; text-decoration: none; color: none; border: 0; background: transparent; outline:none;
}
.bodies{
    text-align: left;  padding-top: 1%; padding-bottom: 3%;
    margin-bottom: 1%; margin-left: 20px;
    
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
    padding-right: 5%;
    padding-left: 5%;
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

.price2 {
   margin-bottom:2px;
   margin-top:2px;
   font-size: 18px;
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
    font-weight: bold;
}
.continueButton:hover{
    box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.7) !important;
    background-image: linear-gradient(to right, #14Ca9f, #1648d0) !important;
}
.titles {
    font-weight: bold ; 
    margin-left:-2px;
     
}
 @media (min-width:768px)  {
    .heads {
        background-color:white; text-align: left; border-bottom: none; 
        padding-top: 2%; padding-bottom: 0.5%;
    }
    .Hbutton{
        color: black; text-decoration: none; color: none; border: 0; background: transparent; outline:none;
    }
    .bodies{
        padding-top: 1%; padding-bottom: 3%;
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
        padding-left: 5%;
        padding-right: 5%;
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