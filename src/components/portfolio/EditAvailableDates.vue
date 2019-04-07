<template>
    <div class="container">
      <div class="owl-wrapper horizontal-center">
          <div class="col-sm-12 col-md-8 horizontal-center">
              <div class="row">
                <div class="col-8 vertical-c enter">
                  <h3 style="text-align: left; color: black; margin:0"><strong>Available dates</strong></h3>
                </div>
                <div class="col-2 vertical-center" style="padding-left: 10px" >
                    <button type="button" class="vertical-center addButton" @click="toggleImageURLInput">
                        <i v-if="!toggleAddURL" class="material-icons arrowIcon deleteURLButton">arrow_drop_down_circle</i>
                        <i v-else class="material-icons arrowIcon deleteURLButton">cancel</i>
                    </button>
                </div>
                <div class="col-2 vertical-center" style="padding-left: 10px" >
                    <button type="button" class="vertical-center addButton" @click="toggleDeleteURLInput">
                        <i v-if="!toggleDeleteURL" class="material-icons arrowIcon addURLButton">arrow_drop_down_circle</i>
                        <i v-else class="material-icons arrowIcon addURLButton">add_circle</i>
                    </button>
                </div>
              </div>
                <div class="row vertical-center">
                    <div v-if="toggleAddURL==false" class="form-group" style="width: 100%"> 
                        <input id="deleteDate" @keypress.enter="addRejectedDate()" type="text" v-model="deleteDate" class="form-control" placeholder="Insert a new rejected date: YYYY-MM-DD" />
                    </div>
                    <div v-if="toggleDeleteURL==false" class="form-group" style="width: 100%"> 
                        <input id="addDate" @keypress.enter="addNewDate()" type="text" v-model="addDate" class="form-control" placeholder="Insert a new available date: YYYY-MM-DD" />
                    </div>
                </div>
          </div>
          <div class="row contentCalendar">
              <div class="col-sm-12 col-md-8 horizontal-center">
                    <div><vuejs-datepicker :key="actualizador" :value="model.date" v-model="model.date" :disabledDates="disabledDates"  :full-month-name="true" :inline="true"></vuejs-datepicker></div>
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
        availableDates: Array,
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

                    for (var i = 0; i < this.availableDates.length; i++) {
                        res.push(new Date(this.availableDates[i]));
                        stringDates.push(this.availableDates[i]);
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
                    //alert(this.availableDates);
                    var idx = this.availableDates.indexOf(this.addDate);
                    //alert(idx);
                    
                    if(idx!=-1){
                        //alert("AAAAA");
                        this.availableDates.splice(idx, 1);
                        //alert(this.availableDates);

                        var stringDates = Array();
                        var res = Array();

                        for (var i = 0; i < this.availableDates.length; i++) {
                            res.push(new Date(this.availableDates[i]));
                            stringDates.push(this.availableDates[i]);
                        }

                        //alert("EEEEE");

                        this.stringToDates = res;

                        this.disabledDates = {
                            to: yesterday,
                            dates: this.stringToDates,
                        }

                        //alert("IIIIII");

                        //alert(this.availableDates);
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
        console.log(this.availableDates);
        var res = Array();

        for (var i = 0; i < this.availableDates.length; i++) { 
            res.push(new Date(this.availableDates[i]));
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
    .addButton{
        height:65px; 
        width:inherit; 
        background:none; 
        border:none;
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

.inputFecha{
    width: 100%;
}

.container{
    padding-top: 50px;
    padding-bottom: 50px;
}
.acceptButton{
    background: -webkit-linear-gradient(left, #00fb82, #187fe6);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    border: none;
}
.acceptButton:hover{
    background: -webkit-linear-gradient(left, #14Ca9f, #1648d0);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    border: none;
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