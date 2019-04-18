<template>
    <div>
    <div class="container-fluid horizontal-center">
        <div id="topContainer" class="row">
            <div class="col-sm-12 col-md-8 horizontal-center">
                <div id="titleAndAdd" class="row">
                    <div id="titleContainer" class="col-8 vertical-center">
                        <h3 class="title"><strong>Available Dates</strong></h3>
                    </div>
                    <div id="buttonContainer" class="col-4 vertical-center buttonContainer">
                        <button type="button" class="vertical-center addButton" @click="toggleImageURLInput">
                            <i v-if="!toggleAddURL" class="material-icons arrowIcon deleteURLButton">arrow_drop_down_circle</i>
                            <i v-else class="material-icons arrowIcon deleteURLButton">cancel</i>
                        </button>
                        <button type="button" class="vertical-center addButton" @click="toggleDeleteURLInput" style="float:right">
                            <i v-if="!toggleDeleteURL" class="material-icons arrowIcon addURLButton">arrow_drop_down_circle</i>
                            <i v-else class="material-icons arrowIcon addURLButton">add_circle</i>
                        </button>
                    </div>
                </div>
                <div id="urlForm" class="row py-2" v-if="toggleAddURL == false">
                    <div class="col-12 vertical-center">
                        <input id="deleteDate" @keypress.enter="addRejectedDate()" type="date" v-model="deleteDate" class="col-xs-9 form-control" placeholder="New rejected date: YYYY-MM-DD" />
                        <button type="button" class="deleteElementButton col-xs-3" @click="addRejectedDate()">
                            DELETE
                        </button>
                    </div>
                </div>
                <div id="urlForm" class="row py-2" v-if="toggleDeleteURL == false">
                    <div class="col-12 vertical-center">
                        <input id="addDate" @keypress.enter="addNewDate()" type="date" v-model="addDate" class="form-control col-xs-9" placeholder="New available date: YYYY-MM-DD" />
                        <button type="button" class="addElementButton col-xs-3" @click="addNewDate()">
                            ADD
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>        
    <div class="container" style="display:flex; justify-content:center;">
        <div class="owl-wrapper horizontal-center">
            <div class="row contentCalendar">
                <div class="col-sm-12 col-md-8 horizontal-center">
                    <div><vuejs-datepicker :key="actualizador" :value="model.date" v-model="model.date" :disabledDates="disabledDates"  :full-month-name="true" :inline="true"></vuejs-datepicker></div>
                
                </div>
            </div>
        </div>
  
    </div>
    </div>
</template>

<script>
import { error } from 'util';

var today = new Date();
var yesterday = new Date();
yesterday.setFullYear(today.getFullYear(), today.getMonth(), today.getDate() - 1)
yesterday.setHours(23)
yesterday.setMinutes(59)
yesterday.setSeconds(59)
yesterday.setMilliseconds(999)

export default {
    name: "EditAvailableDates",
    data () {
        return {
            toggleAddURL:true,
            toggleDeleteURL:true,
            stringToDates: Array,
            model: {
                date: "",
            },
            disabledDates: {},
            actualizador: 0,
            addDate: "",
            deleteDate: "",
        }
    },

    props: {
        availableDates: {
            type: Array,
            default: () => { return Array()},
        },
    },

    components: {
        vuejsDatepicker,
    },
    
    methods:{
        toggleImageURLInput: function(){
            this.toggleAddURL = !this.toggleAddURL;
            if(this.toggleAddURL==false){
                this.toggleDeleteURL = true;
            }
        },
        toggleDeleteURLInput: function(){
            this.toggleDeleteURL = !this.toggleDeleteURL;
            if(this.toggleDeleteURL==false){
                this.toggleAddURL = true;
            }
        },

        addRejectedDate: function (event) {
            if(this.deleteDate){
                var regex=new RegExp("([0-9]{4}[-](0[1-9]|1[0-2])[-]([0-2]{1}[0-9]{1}|3[0-1]{1}))");
                var dateOk = regex.test(this.deleteDate);
                var dateCreationOk = new Date(this.deleteDate);
                
                if(!dateOk || dateCreationOk == 'Invalid Date'){
                    alert("Invalid date!")
                }
                else{
                    
                    var res = Array();

                    res.push(new Date(this.deleteDate));

                    var stringDates = Array();
                    stringDates.push(this.deleteDate);

                    for (var i = 0; i < this.$props.availableDates.length; i++) {
                        res.push(new Date(this.$props.availableDates[i]));
                        stringDates.push(this.$props.availableDates[i]);
                    }

                    this.stringToDates = res;

                    this.disabledDates = {
                        to: yesterday,
                        dates: this.stringToDates,
                    };

                    this.$parent.d_portfolioDays = stringDates;
                }

                this.actualizador = this.actualizador+1;
                this.addImageURL = '';
                this.toggleImageURLInput();
            }
        },

        addNewDate: function(){
            if(this.addDate){
                var regex=new RegExp("([0-9]{4}[-](0[1-9]|1[0-2])[-]([0-2]{1}[0-9]{1}|3[0-1]{1}))");
                var dateOk = regex.test(this.addDate);
                var dateCreationOk = new Date(this.addDate);
                if(!dateOk || dateCreationOk == 'Invalid Date'){
                    alert("Invalid date!")
                }
                else{
                    //alert(this.addDate);
                    //alert(this.$props.availableDates);
                    var idx = this.$props.availableDates.indexOf(this.addDate);
                    //alert(idx);
                    
                    if(idx!=-1){
                        //alert("AAAAA");
                        this.$props.availableDates.splice(idx, 1);
                        //alert(this.$props.availableDates);

                        var stringDates = Array();
                        var res = Array();

                        for (var i = 0; i < this.$props.availableDates.length; i++) {
                            res.push(new Date(this.$props.availableDates[i]));
                            stringDates.push(this.$props.availableDates[i]);
                        }

                        //alert("EEEEE");

                        this.stringToDates = res;

                        this.disabledDates = {
                            to: yesterday,
                            dates: this.stringToDates,
                        }

                        //alert("IIIIII");

                        //alert(this.$props.availableDates);
                        this.$parent.d_portfolioDays = stringDates;

                        //alert("wog!");
                    }
                    
                }
                this.actualizador = this.actualizador+1;

                this.addImageURL = '';
                this.toggleDeleteURLInput();

                

                
            }

            
        },
        getFechas: function() {
            return this.disabledDates;
        }
    },

    created: function() {
        var res = Array();

        for (var i = 0; i < this.$props.availableDates.length; i++) { 
            res.push(new Date(this.$props.availableDates[i]));
        }

        this.stringToDates = res;

        this.disabledDates = {
            to: yesterday,
            dates: this.stringToDates,
        }
    },        
}
</script>

<style scoped>

    .addElementButton{
        width: 200px !important;
        color: white !important;
        font-weight: bold;
        border-radius: 0px 25px 25px 0px;
        text-align: center;
        align-content: center;

        font-size: 22px;
                
        border: none;


        background-image: linear-gradient(to right, #00fb82, #187fe6);
    }

    .addElementButton:hover{
        background-image: linear-gradient(to right, #14Ca9f, #1648d0) !important;
        box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, .7) !important;
    }

    .deleteElementButton{
        width: 200px !important;
        color: white !important;
        font-weight: bold;
        border-radius: 0px 25px 25px 0px;
        text-align: center;
        align-content: center;

        font-size: 22px;
                
        border: none;


        background-image: linear-gradient(to right, #ffa726, #f44336);
    }

    .deleteElementButton:hover{
        background-image: linear-gradient(to right, #e65100, #c62828) !important;
        box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, .7) !important;
    }

    .buttonContainer {
        display: flex;
        justify-content: center;
        width: 100%;
    }

    .addButton{
        height:65px;
        background:none; 
        border:none;
    }

    div#topContainer.row {
        margin-right: 0px;
        margin-top: 45px;
    }

    .addURLButton{
        background: -webkit-linear-gradient(left, #00fb82, #187fe6);
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
        border: none;
        margin: 0 auto; 
        font-size: 55px
    }

    .deleteURLButton:hover{
        background-image: linear-gradient(to right, #e65100, #c62828 ) !important;
    }

    .deleteURLButton{
        background: -webkit-linear-gradient(left,  #ffa726, #f44336);
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
        border: none;
        margin: 0 auto; 
        font-size: 55px
    }

    .addURLButton:hover{
        background-image: linear-gradient(to right, #14Ca9f, #1648d0) !important;
    }

    #topContainer{
    padding-bottom: 15px;
  }

  #titleContainer {
    width: 100%;
  }

.inputFecha{
    width: 100%;
}

.container{
    padding-bottom: 50px;
}
.acceptButton{
    background: -webkit-linear-gradient(left, #00fb82, #187fe6);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: tran
    rent;
    border: none;
}
.acceptButton:hover{
    background: -webkit-linear-gradient(left, #14Ca9f, #1648d0);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    border: none;
}
  .vertical-center{
    display: flex; 
    align-items: center;  /*Aligns vertically center */
  }

  @media (max-width: 576px) {
    .artistImage {
      object-fit: cover;
      height: 12rem;
      width: 100%;
      border-radius: 10px 10px 10px 10px;
    }
  }
  @media (min-width: 576px) {
    .artistImage {
      object-fit: cover;
      height: 15rem;
      width: 100%;
      border-radius: 10px 10px 10px 10px;
    }
  }
    .horizontal-center{
        margin: 0 auto;
    }
    .contentForm{
        padding-top: 10px !important;
        padding-bottom: 10px;
        display:flex;
        align-content: center;
    }
    .form-inline .formulario{
        margin: 0 auto !important;
    }
    .vdp-datepicker__calendar {
        width: 100%;
        border: 0px;
        margin-top: 10px;
    }
    .container-fluid{
        width: 100% !important;
        margin: 0 auto !important;
        padding-left: 10px;
        padding-right: 10px;
        padding-top: 10px;
        padding-bottom: 10px;
    }
    input:hover{
        border-color: #187fe6;
        box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, .3) !important;
    }
    input:focus{
        border-color: #00fb82 !important;
        font-weight: semibold;
        color:black;
        box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, .7) !important;
        
    }
    .continueButton {
        font-size: 18px;
        border: none;
        border-radius: 30px;
        color: white !important;
        font-weight: bold;
        margin-left: 2%;
        background-image: linear-gradient(to right, #00fb82, #187fe6);
    }
    .continueButton:hover{
        box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, .7) !important;
        background-image: linear-gradient(to right, #14Ca9f, #1648d0) !important;
    }

    .title{
        text-align: left; 
        color: black; 
        margin: 0;
    }

    @media (min-width: 768px){
        .vdp-datepicker__calendar {
            width: 100% !important;
            border: 0px;
            margin-top: 10px;
            margin: 0 auto !important;
        }
        .availableDates{
            text-align: center;
            margin-bottom: 20px;
            font-weight: semibold;
        }
        .contentCalendar{
            padding-top: 20px !important;
            width: 65% !important;
            
            margin: 0 auto !important;
            padding-left: 10px;
            padding-right: 10px;
            padding-top: 10px;
            padding-bottom: 10px;
            border-radius: 10px;
            box-shadow: 0px 2px 8px 2px rgba(0, 0, 0, .5);
        }
    }

    
    
   
</style>

<style scoped>
    * {
        color: #000000;
    }
</style>