<template>
    <div class="hell">
        <div class="title">
            <p>Choose the price</p>
        </div>
        <div class="everything">
            <div class="tarjeta">
                <router-link v-bind:to="artistURI"><img v-bind:src="artistImage" class="card-img-top artistImage" alt="Artist's Image"></router-link>
                <div class="card-body cuerpoTarjeta">
                    <div class="leftContent">
                        <h5 class="card-title artistName">{{ artistName }}</h5>
                        <span class="card-text artistGenres">{{ genresToString() }}</span>
                    </div>
                    <div class="rightContent">
                        <p class="price">{{ price }}€</p>
                    </div>
                </div>
            </div>
            <div>
                <div><CustomPrice @priceSelected="priceValue"/></div>
            </div>
        </div>
    </div>
</template>

<script>
    import CustomPrice from '@/components/CustomPrice.vue'

    export default {
        name: 'PriceSelector',
        
        components: {
            CustomPrice
        },

        data: function() {
            return {
                price: '',
            };
        },

        methods: {
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

            priceValue (value) {
                this.price = value;
            }
        },

        props: {
            artistURI: {
                type: String,
                default: '#'
            },
            artistImage: {
                type: String,
                default: 'http://www.tiumag.com/wp-content/uploads/rosalia-2018-2-705x564.jpg',
            },
            artistName: {
                type: String,
                default: 'ROSALÍA'
            },
            artistGenres: {
                type: Array,
                default: ['Pop', 'Flamenco']
            },
        },
    }
</script>

<style scoped>
    * {
        font-family: "Archivo"
    }

    .artistGenres {
        color: #187FE6;
        font-size: 18px;
        word-wrap: break-word;
    }

    .artistImage {
        max-height: 200px;
        object-fit: cover;
    }

    .artistName {
        font-size: 32px;
        margin-bottom: 0px;
        padding-bottom: 0px;
        word-wrap: break-word;
    }

    .card-img-top {
      border-radius: 0px;
    }

    .cuerpoTarjeta {
        align-items: center;
        display: flex;
    }

    .leftContent {
        overflow: auto;
        text-align: left;
    }

    .price {
        color: #187FE6;
        font-size: 35px;
        margin-bottom: 0px;
    }

    .rightContent {
        margin-left: auto;
        margin-right: 0px;
        padding-left: 20px;
    }

    .tarjeta {
        box-shadow: 0px 2px 8px 2px rgba(0, 0, 0, .3);
        width: 100%;
    }

    .title {
        display: none;
    }

    @media (min-width:768px)  {
        .artistImage{
            border-radius: 10px 10px 0px 0px;
        }
      
        .everything {
            align-items: center;
            display: flex;
            justify-content: center;
            margin-left: 10%;
            margin-right: 10%;
            margin-top: 5%;
            padding: 15px;
            text-align: center;
        }

        .tarjeta {
            border-radius: 10px;
            box-shadow: 0px 2px 8px 2px rgba(0, 0, 0, .3);
            margin-right: 10px;
            min-width: 335px;
            width: 25%;
        }

        .title {
            display: inline-block;
            font-size: 50px;
            font-weight: bold;
            margin-bottom: 0%;
            margin-left: 10%;
            margin-right: 12%;
            margin-top: 5%;
            text-align: left;
        } 
    }
</style>
